import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/home/HeroSection'
import FeaturesBar from '@/components/home/FeaturesBar'
import CounselingBannerSection from '@/components/home/CounselingBannerSection'
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
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Features Elevated Bar */}
        <FeaturesBar />

        {/* 3. Dedicated Offline Demo & Counseling Slot Reservation Banner */}
        <CounselingBannerSection />

        {/* 4. Offline Coaching Centres Section (Rajajipuram Lucknow) */}
        <OfflineCentresSection />

        {/* 5. Numbers & Stats with Jackpot Counter Animation */}
        <StatsSection />
      </main>

      {/* Rich Educational Footer */}
      <Footer />
    </div>
  )
}
