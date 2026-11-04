/**
 * Batch Validity & Expiration Utility for Ansh Tutor
 * Ensures expired batches are automatically hidden from student-facing pages.
 */

export interface BatchItemData {
  id: string
  title: string
  grade: string
  faculty: string
  targetYear: string
  validityDate?: string
  status: 'Active' | 'Upcoming'
  bannerBg: string
  bannerTextColor: string
  bannerLabel: string
  bannerImg?: string
  price?: number
}

export const defaultAcademicBatches: BatchItemData[] = [
  {
    id: 'batch-class-8',
    title: 'Class 8th (Umang Batch)',
    grade: 'Class 8',
    faculty: 'Ritik Mishra Sir & Team',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#5A4BDA] to-[#7B61FF]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 8TH • UMANG BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
  {
    id: 'batch-class-7',
    title: 'Class 7th (Sankalp Batch)',
    grade: 'Class 7',
    faculty: 'Expert Faculty',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 7TH • SANKALP BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
  {
    id: 'batch-class-6',
    title: 'Class 6th (Prarambh Batch)',
    grade: 'Class 6',
    faculty: 'Expert Faculty',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#065F46] to-[#10B981]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 6TH • PRARAMBH BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
  {
    id: 'batch-class-5',
    title: 'Class 5th Academic Batch',
    grade: 'Class 5',
    faculty: 'Expert Faculty',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#881337] to-[#F43F5E]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 5TH ACADEMIC BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
  {
    id: 'batch-class-4',
    title: 'Class 4th Academic Batch',
    grade: 'Class 4',
    faculty: 'Expert Faculty',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#9A3412] to-[#F59E0B]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 4TH ACADEMIC BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
  {
    id: 'batch-class-3',
    title: 'Class 3rd Academic Batch',
    grade: 'Class 3',
    faculty: 'Expert Faculty',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#4C1D95] to-[#8B5CF6]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 3RD ACADEMIC BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
  {
    id: 'batch-class-2',
    title: 'Class 2nd Academic Batch',
    grade: 'Class 2',
    faculty: 'Expert Faculty',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#0E7490] to-[#06B6D4]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 2ND ACADEMIC BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
  {
    id: 'batch-class-1',
    title: 'Class 1st Academic Batch',
    grade: 'Class 1',
    faculty: 'Expert Faculty',
    targetYear: 'Session 2026-27',
    validityDate: '31 March 2027',
    status: 'Active',
    bannerBg: 'bg-gradient-to-r from-[#312E81] to-[#6366F1]',
    bannerTextColor: 'text-white',
    bannerLabel: 'CLASS 1ST ACADEMIC BATCH',
    bannerImg: '/batches/banner_umang_term2.png',
  },
]

export function isBatchValid(validityDate?: string | null): boolean {
  if (!validityDate || typeof validityDate !== 'string') {
    return true // If no validity date is explicitly provided, treat as active
  }

  const clean = validityDate.trim()
  if (!clean) return true

  // 1. Try standard ISO/Date parsing (e.g. 2027-03-31, 2027-03-31T00:00:00)
  const parsed = Date.parse(clean)
  if (!isNaN(parsed)) {
    const endOfDay = new Date(parsed)
    endOfDay.setHours(23, 59, 59, 999)
    return endOfDay.getTime() >= Date.now()
  }

  // 2. Try parsing natural dates like "31 March 2027", "31 Mar 2027", "31-03-2027", "31/03/2027"
  const match = clean.match(/^(\d{1,2})[\s\-\/\.]*([a-zA-Z]+|\d{1,2})[\s\-\/\.]*(\d{4})/)
  if (match) {
    const day = parseInt(match[1], 10)
    const monthStr = match[2].toLowerCase()
    const year = parseInt(match[3], 10)

    const monthMap: Record<string, number> = {
      jan: 0, january: 0,
      feb: 1, february: 1,
      mar: 2, march: 2,
      apr: 3, april: 3,
      may: 4,
      jun: 5, june: 5,
      jul: 6, july: 6,
      aug: 7, august: 7,
      sep: 8, sept: 8, september: 8,
      oct: 9, october: 9,
      nov: 10, november: 10,
      dec: 11, december: 11,
    }

    let monthIndex = -1
    if (monthMap[monthStr] !== undefined) {
      monthIndex = monthMap[monthStr]
    } else {
      const numMonth = parseInt(monthStr, 10)
      if (!isNaN(numMonth) && numMonth >= 1 && numMonth <= 12) {
        monthIndex = numMonth - 1
      }
    }

    if (monthIndex >= 0 && day >= 1 && day <= 31 && year >= 2000) {
      const expirationDate = new Date(year, monthIndex, day, 23, 59, 59, 999)
      return expirationDate.getTime() >= Date.now()
    }
  }

  // If format is unrecognized, do not prematurely hide
  return true
}

export function getDaysRemaining(validityDate?: string | null): number | null {
  if (!validityDate) return null

  const clean = validityDate.trim()
  let targetTime: number | null = null

  const parsed = Date.parse(clean)
  if (!isNaN(parsed)) {
    const endOfDay = new Date(parsed)
    endOfDay.setHours(23, 59, 59, 999)
    targetTime = endOfDay.getTime()
  } else {
    const match = clean.match(/^(\d{1,2})[\s\-\/\.]*([a-zA-Z]+|\d{1,2})[\s\-\/\.]*(\d{4})/)
    if (match) {
      const day = parseInt(match[1], 10)
      const monthStr = match[2].toLowerCase()
      const year = parseInt(match[3], 10)
      const monthMap: Record<string, number> = {
        jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2,
        apr: 3, april: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6,
        aug: 7, august: 7, sep: 8, september: 8, oct: 9, october: 9,
        nov: 10, november: 10, dec: 11, december: 11,
      }
      const month = monthMap[monthStr] !== undefined ? monthMap[monthStr] : parseInt(monthStr, 10) - 1
      if (month >= 0) {
        const d = new Date(year, month, day, 23, 59, 59, 999)
        targetTime = d.getTime()
      }
    }
  }

  if (targetTime === null) return null
  const diffMs = targetTime - Date.now()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}
