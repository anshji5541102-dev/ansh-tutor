# Ansh Tutor — Education Platform

A Next.js 14 (App Router) tutoring platform with Supabase backend and Firebase OTP authentication.

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Font**: Reddit Sans (self-hosted, all weights)
- **Backend**: Supabase (Auth, Database, Storage, Realtime)
- **OTP Auth**: Firebase Phone Authentication
- **Database**: PostgreSQL via Supabase

## Getting Started

### 1. Configure environment variables
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```

### 2. Set up Supabase
- Create a project at [supabase.com](https://supabase.com)
- Copy your Project URL and Anon Key into `.env.local`
- Run `supabase/schema.sql` in the Supabase SQL Editor

### 3. Set up Firebase OTP
- Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Enable **Phone Authentication** under Authentication > Sign-in methods
- Add your Firebase config to `.env.local`

### 4. Run the development server
```bash
npm run dev
```

## Folder Structure
```
app/
  (auth)/login/       # Login page
  (auth)/signup/      # Signup page
  dashboard/          # Student dashboard (protected)
  book/               # Book a session (protected)
  profile/            # User profile (protected)
components/
  ui/                 # Reusable UI components (Button, Input)
  layout/             # Navbar, Footer
lib/
  supabase/           # Supabase client, server, middleware helpers
  firebase/           # Firebase config and OTP helpers
  types/              # TypeScript interfaces
public/
  fonts/reddit-sans/  # Self-hosted Reddit Sans font files
supabase/
  schema.sql          # Database schema with RLS policies
```

## Pages (to be styled from screenshots)
- `/` — Home / Landing page
- `/login` — Login with email or phone OTP
- `/signup` — Create account
- `/dashboard` — Student dashboard
- `/book` — Book a session
- `/profile` — User profile
