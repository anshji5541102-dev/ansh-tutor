import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/home/HeroSection'
import FeaturesBar from '@/components/home/FeaturesBar'
import OfflineCentresSection from '@/components/home/OfflineCentresSection'
import StatsSection from '@/components/home/StatsSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-[#5a4bda] selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section (Screenshot 1) */}
        <HeroSection />

        {/* 2. Features Elevated Bar (Screenshot 1 Bottom) */}
        <FeaturesBar />

        {/* 3. Offline Coaching Centres Section (Vidyapeeth Hubs) */}
        <OfflineCentresSection />

        {/* 4. Numbers & Stats with Jackpot Counter Animation (Screenshot 2) */}
        <StatsSection />
      </main>

      {/* Rich Educational Footer */}
      <Footer />
    </div>
  )
}
