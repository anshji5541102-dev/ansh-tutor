-- ============================================================
-- ANSH TUTOR — Complete Supabase Schema
-- Roles: student | tutor | admin
-- Auth: Firebase Phone OTP (uid stored in profiles.firebase_uid)
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";  -- for fuzzy search on names/subjects

-- ============================================================
-- PROFILES (one per user, linked to auth.users OR firebase_uid)
-- ============================================================
create table if not exists public.profiles (
  id              uuid default uuid_generate_v4() primary key,
  supabase_uid    uuid references auth.users(id) on delete set null,
  firebase_uid    text unique,                          -- Firebase phone auth UID
  name            text,
  phone           text unique,
  email           text unique,
  avatar_url      text,
  role            text not null default 'student'
                    check (role in ('student', 'tutor', 'admin')),
  is_active       boolean default true,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- SUBJECTS
-- ============================================================
create table if not exists public.subjects (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null unique,
  description text,
  icon_url    text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- Seed subjects
insert into public.subjects (name) values
  ('Mathematics'),
  ('Physics'),
  ('Chemistry'),
  ('Biology'),
  ('English'),
  ('Hindi'),
  ('History'),
  ('Geography'),
  ('Computer Science'),
  ('Economics')
on conflict (name) do nothing;

-- ============================================================
-- TUTORS (extends profiles where role = 'tutor')
-- ============================================================
create table if not exists public.tutors (
  id              uuid default uuid_generate_v4() primary key,
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  bio             text,
  qualifications  text,
  experience_years integer default 0,
  subjects        text[] default '{}',          -- subject names array
  hourly_rate     numeric(10,2) default 0,
  rating          numeric(3,2) default 0 check (rating >= 0 and rating <= 5),
  total_reviews   integer default 0,
  total_sessions  integer default 0,
  is_available    boolean default true,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique (profile_id)
);

-- ============================================================
-- TUTOR AVAILABILITY (weekly schedule slots)
-- ============================================================
create table if not exists public.tutor_availability (
  id          uuid default uuid_generate_v4() primary key,
  tutor_id    uuid not null references public.tutors(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0=Sun
  start_time  time not null,
  end_time    time not null,
  is_active   boolean default true
);

-- ============================================================
-- BOOKINGS (session requests from students)
-- ============================================================
create table if not exists public.bookings (
  id              uuid default uuid_generate_v4() primary key,
  student_id      uuid not null references public.profiles(id) on delete cascade,
  tutor_id        uuid not null references public.tutors(id) on delete cascade,
  subject         text not null,
  session_date    date not null,
  session_time    time not null,
  duration_minutes integer default 60,
  notes           text,
  status          text default 'pending'
                    check (status in ('pending','confirmed','cancelled','completed')),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ============================================================
-- SESSIONS (confirmed/completed sessions)
-- ============================================================
create table if not exists public.sessions (
  id               uuid default uuid_generate_v4() primary key,
  booking_id       uuid references public.bookings(id) on delete set null,
  student_id       uuid not null references public.profiles(id) on delete cascade,
  tutor_id         uuid not null references public.tutors(id) on delete cascade,
  subject          text not null,
  scheduled_at     timestamptz not null,
  duration_minutes integer default 60,
  status           text default 'upcoming'
                     check (status in ('upcoming','live','completed','cancelled','no_show')),
  meeting_url      text,
  recording_url    text,
  tutor_notes      text,
  student_notes    text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ============================================================
-- REVIEWS (student reviews for tutors)
-- ============================================================
create table if not exists public.reviews (
  id          uuid default uuid_generate_v4() primary key,
  session_id  uuid not null references public.sessions(id) on delete cascade,
  student_id  uuid not null references public.profiles(id) on delete cascade,
  tutor_id    uuid not null references public.tutors(id) on delete cascade,
  rating      integer not null check (rating between 1 and 5),
  comment     text,
  is_public   boolean default true,
  created_at  timestamptz default now(),
  unique (session_id, student_id)   -- one review per session
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
create table if not exists public.notifications (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  type        text not null,   -- 'booking_confirmed','session_reminder','review_request' etc.
  title       text not null,
  body        text,
  data        jsonb,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

-- ============================================================
-- PAYMENTS (stub — no gateway yet)
-- ============================================================
create table if not exists public.payments (
  id              uuid default uuid_generate_v4() primary key,
  booking_id      uuid references public.bookings(id) on delete set null,
  student_id      uuid not null references public.profiles(id) on delete cascade,
  amount          numeric(10,2) not null,
  currency        text default 'INR',
  status          text default 'pending'
                    check (status in ('pending','paid','failed','refunded')),
  gateway         text,          -- 'razorpay' | 'stripe' | null
  gateway_order_id text,
  gateway_payment_id text,
  created_at      timestamptz default now()
);

-- ============================================================
-- AUTOMATIC updated_at TRIGGER
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create or replace trigger on_tutors_updated
  before update on public.tutors
  for each row execute function public.handle_updated_at();

create or replace trigger on_bookings_updated
  before update on public.bookings
  for each row execute function public.handle_updated_at();

create or replace trigger on_sessions_updated
  before update on public.sessions
  for each row execute function public.handle_updated_at();

-- ============================================================
-- AUTO-UPDATE TUTOR RATING AFTER REVIEW
-- ============================================================
create or replace function public.update_tutor_rating()
returns trigger language plpgsql as $$
begin
  update public.tutors
  set
    rating = (select round(avg(rating)::numeric, 2) from public.reviews where tutor_id = new.tutor_id),
    total_reviews = (select count(*) from public.reviews where tutor_id = new.tutor_id)
  where id = new.tutor_id;
  return new;
end;
$$;

create or replace trigger on_review_insert
  after insert on public.reviews
  for each row execute function public.update_tutor_rating();

-- ============================================================
-- AUTO-INCREMENT TUTOR SESSION COUNT
-- ============================================================
create or replace function public.increment_tutor_sessions()
returns trigger language plpgsql as $$
begin
  if new.status = 'completed' and (old.status is null or old.status <> 'completed') then
    update public.tutors set total_sessions = total_sessions + 1 where id = new.tutor_id;
  end if;
  return new;
end;
$$;

create or replace trigger on_session_completed
  after insert or update on public.sessions
  for each row execute function public.increment_tutor_sessions();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.tutors enable row level security;
alter table public.tutor_availability enable row level security;
alter table public.bookings enable row level security;
alter table public.sessions enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.payments enable row level security;

-- Helper: get profile id from supabase auth uid
create or replace function public.my_profile_id()
returns uuid language sql stable as $$
  select id from public.profiles where supabase_uid = auth.uid() limit 1;
$$;

-- Helper: get current user role
create or replace function public.my_role()
returns text language sql stable as $$
  select role from public.profiles where supabase_uid = auth.uid() limit 1;
$$;

-- PROFILES
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (supabase_uid = auth.uid() or public.my_role() = 'admin');

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (supabase_uid = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (supabase_uid = auth.uid() or public.my_role() = 'admin');

-- SUBJECTS (public read, admin write)
drop policy if exists "subjects_public_read" on public.subjects;
create policy "subjects_public_read" on public.subjects
  for select using (true);

drop policy if exists "subjects_admin_write" on public.subjects;
create policy "subjects_admin_write" on public.subjects
  for all using (public.my_role() = 'admin');

-- TUTORS (public read)
drop policy if exists "tutors_public_read" on public.tutors;
create policy "tutors_public_read" on public.tutors
  for select using (true);

drop policy if exists "tutors_self_update" on public.tutors;
create policy "tutors_self_update" on public.tutors
  for update using (profile_id = public.my_profile_id() or public.my_role() = 'admin');

drop policy if exists "tutors_admin_insert" on public.tutors;
create policy "tutors_admin_insert" on public.tutors
  for insert with check (public.my_role() in ('tutor','admin'));

-- TUTOR AVAILABILITY (public read, tutor owns)
drop policy if exists "availability_public_read" on public.tutor_availability;
create policy "availability_public_read" on public.tutor_availability
  for select using (true);

drop policy if exists "availability_tutor_manage" on public.tutor_availability;
create policy "availability_tutor_manage" on public.tutor_availability
  for all using (
    tutor_id in (select id from public.tutors where profile_id = public.my_profile_id())
    or public.my_role() = 'admin'
  );

-- BOOKINGS
drop policy if exists "bookings_student_own" on public.bookings;
create policy "bookings_student_own" on public.bookings
  for all using (
    student_id = public.my_profile_id()
    or tutor_id in (select id from public.tutors where profile_id = public.my_profile_id())
    or public.my_role() = 'admin'
  );

-- SESSIONS
drop policy if exists "sessions_participants" on public.sessions;
create policy "sessions_participants" on public.sessions
  for all using (
    student_id = public.my_profile_id()
    or tutor_id in (select id from public.tutors where profile_id = public.my_profile_id())
    or public.my_role() = 'admin'
  );

-- REVIEWS (public read, student writes own)
drop policy if exists "reviews_public_read" on public.reviews;
create policy "reviews_public_read" on public.reviews
  for select using (is_public = true or public.my_role() = 'admin');

drop policy if exists "reviews_student_insert" on public.reviews;
create policy "reviews_student_insert" on public.reviews
  for insert with check (student_id = public.my_profile_id());

-- NOTIFICATIONS (user sees own)
drop policy if exists "notifications_own" on public.notifications;
create policy "notifications_own" on public.notifications
  for all using (user_id = public.my_profile_id() or public.my_role() = 'admin');

-- PAYMENTS (student/admin only)
drop policy if exists "payments_own" on public.payments;
create policy "payments_own" on public.payments
  for select using (student_id = public.my_profile_id() or public.my_role() = 'admin');

drop policy if exists "payments_insert" on public.payments;
create policy "payments_insert" on public.payments
  for insert with check (student_id = public.my_profile_id());

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('session-recordings', 'session-recordings', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('resources', 'resources', false)
on conflict (id) do nothing;

-- Storage RLS: avatars bucket (anyone can read, owner can upload)
drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatars_owner_upload" on storage.objects;
create policy "avatars_owner_upload" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "avatars_owner_update" on storage.objects;
create policy "avatars_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]
  );
