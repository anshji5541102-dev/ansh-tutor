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

export const purchasesList: PurchaseItem[] = [];
