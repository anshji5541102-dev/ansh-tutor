'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'

export default function FeaturesBar() {
  const features = [
    {
      id: 1,
      title: 'Daily Live',
      subtitle: 'Interactive classes',
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="px-2.5 py-1 bg-[#FF334B] text-white text-[11px] font-black rounded tracking-wider flex items-center gap-1.5 shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            LIVE
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: '10 Million +',
      subtitle: 'Tests, sample papers & notes',
      icon: (
        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
            <rect x="7" y="5" width="22" height="26" rx="3" fill="#38BDF8" fillOpacity="0.25" stroke="#0284C7" strokeWidth="1.8" />
            <line x1="12" y1="12" x2="21" y2="12" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="17" x2="24" y2="17" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="22" x2="19" y2="22" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
            <circle x="24" y="24" r="4.5" fill="#F43F5E" />
            <path d="M22.5 25.5 L27 21" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: '24 x 7',
      subtitle: 'Doubt solving sessions',
      icon: (
        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
            <path
              d="M10 28 C10 25, 12 22, 15 21 C12 20, 11 17, 12 13 C13 9, 17 7, 21 8 C25 9, 27 12, 26 16 C25 19, 23 21, 20 21 C23 22, 25 25, 25 28"
              fill="#A855F7"
              fillOpacity="0.2"
              stroke="#9333EA"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="18.5" cy="14" r="5" fill="#F3E8FF" />
            <text x="16.5" y="17.5" fill="#7E22CE" fontSize="9" fontWeight="bold" fontFamily="sans-serif">?</text>
          </svg>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Lucknow',
      subtitle: 'Offline centres',
      icon: (
        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
            <circle cx="18" cy="15" r="9" fill="#F59E0B" />
            <circle cx="18" cy="15" r="6.5" fill="#FBBF24" />
            <path d="M14 21 L11 29 L16 27 L18 21" fill="#D97706" />
            <path d="M22 21 L25 29 L20 27 L18 21" fill="#D97706" />
            <path d="M15.5 15 L17.5 17 L21 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-30">
      <ScrollReveal animation="fade-up" duration={700}>
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 p-4 sm:p-6 lg:py-6 lg:px-8 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {features.map((feat, idx) => (
              <div
                key={feat.id}
                className="flex items-center gap-4 px-4 py-3 sm:py-2 hover:bg-indigo-50/40 rounded-xl transition-all duration-300 group cursor-default hover:-translate-y-1"
              >
                <div className="shrink-0">{feat.icon}</div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight group-hover:text-[#5a4bda] transition-colors">
                    {feat.title}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium truncate">
                    {feat.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
