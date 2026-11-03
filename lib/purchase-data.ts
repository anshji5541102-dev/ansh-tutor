export interface PurchaseItem {
  id: string;
  orderId: string;
  orderDate: string;
  badge: "SUCCESS";
  title: string;
  dateAndPrice: string;
  price: string;
  originalPrice: string;
  discount: string;
  deliveryCharges: string;
  couponDisc: string;
  totalAmount: string;
  validTill: string;
  bannerBg: string;
  bannerTextColor: string;
  bannerLabel: string;
  avatarSrc?: string;
  avatarAlt: string;
}

export const purchasesList: PurchaseItem[] = [
  {
    id: "jee-prep-2027",
    orderId: "6ae86d63eb2b936e29d6b9b2",
    orderDate: "Nov 02, 2026",
    badge: "SUCCESS",
    title: "JEE Prep 2027 Free YouTube Series",
    dateAndPrice: "02 Nov'26 • Free",
    price: "Free",
    originalPrice: "₹ 0",
    discount: "₹ 0",
    deliveryCharges: "₹ 0",
    couponDisc: "₹ 0",
    totalAmount: "₹ 0",
    validTill: "Jun 30, 2030",
    bannerBg: "bg-[#EAE5FC]",
    bannerTextColor: "text-[#5A4BDA]",
    bannerLabel: "JEE PREP 2027\nFREE YOUTUBE SERIES",
    avatarSrc: "/batches/user_avatar.png",
    avatarAlt: "Faculty Teacher",
  },
  {
    id: "ritik-mishra-2027",
    orderId: "5be72d51eb1a825e18c5a8a1",
    orderDate: "Nov 02, 2026",
    badge: "SUCCESS",
    title: "Ritik Mishra - Class 8th YT (2027)",
    dateAndPrice: "02 Nov'26 • Free",
    price: "Free",
    originalPrice: "₹ 0",
    discount: "₹ 0",
    deliveryCharges: "₹ 0",
    couponDisc: "₹ 0",
    totalAmount: "₹ 0",
    validTill: "Jun 30, 2030",
    bannerBg: "bg-[#D1FAE5]",
    bannerTextColor: "text-[#059669]",
    bannerLabel: "RITIK MISHRA CLASS 8TH (2027)",
    avatarSrc: "/batches/user_avatar.png",
    avatarAlt: "Ritik Mishra",
  },
  {
    id: "samridhi-sharma-2027",
    orderId: "4ad61c40ea0b714d07b49790",
    orderDate: "Nov 02, 2026",
    badge: "SUCCESS",
    title: "Samridhi Sharma - Class 8th (2027)",
    dateAndPrice: "02 Nov'26 • Free",
    price: "Free",
    originalPrice: "₹ 0",
    discount: "₹ 0",
    deliveryCharges: "₹ 0",
    couponDisc: "₹ 0",
    totalAmount: "₹ 0",
    validTill: "Jun 30, 2030",
    bannerBg: "bg-[#FFE4E6]",
    bannerTextColor: "text-[#E11D48]",
    bannerLabel: "SAMRIDHI SHARMA CLASS 8TH (2027)",
    avatarSrc: "/batches/user_avatar.png",
    avatarAlt: "Samridhi Sharma",
  },
  {
    id: "ansh-foundation-2027",
    orderId: "3fc50b39d99a603c96a3868f",
    orderDate: "Oct 05, 2026",
    badge: "SUCCESS",
    title: "Ansh Foundation Master Batch 2027 (Class 8)",
    dateAndPrice: "05 Oct'26 • ₹1,499",
    price: "₹ 1,499",
    originalPrice: "₹ 3,000",
    discount: "₹ 1,501",
    deliveryCharges: "₹ 0",
    couponDisc: "₹ 0",
    totalAmount: "₹ 1,499",
    validTill: "Mar 31, 2027",
    bannerBg: "bg-[#E0E7FF]",
    bannerTextColor: "text-[#4338CA]",
    bannerLabel: "ANSH FOUNDATION CLASS 8TH\nMASTER BATCH",
    avatarSrc: "/batches/user_avatar.png",
    avatarAlt: "Ansh Foundation Faculty",
  },
];
