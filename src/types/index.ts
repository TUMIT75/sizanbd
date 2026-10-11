export type ProductCondition = 'New' | 'Pre-owned';
export type ProductStatus = 'Official' | 'Unofficial';
export type StockStatus = 'In stock' | 'Pre-order' | 'Out of stock';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "8GB / 256GB - Natural Titanium"
  ram?: string;
  storage?: string;
  colorName: string;
  colorHex: string;
  price: number;
  regularPrice: number;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  verifiedPurchase: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
  outletVisited?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  categorySlug: string;
  categoryName: string;
  price: number; // Current selling price in BDT
  regularPrice: number; // Regular/old price in BDT
  condition: ProductCondition;
  status: ProductStatus;
  stockStatus: StockStatus;
  stockLeft?: number;
  priceUpdatedToday?: boolean;
  boughtCount?: number;
  sku: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  isNewArrival?: boolean;
  isBestDeal?: boolean;
  images: string[];
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  variants: ProductVariant[];
  connectivity?: 'Wireless' | 'Bluetooth' | 'Wired' | 'Type-C';
  warranty: {
    official: string;
    parts: string;
    service: string;
  };
  specs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    rearCamera: string;
    frontCamera: string;
    battery: string;
    charging: string;
    os: string;
    network: string;
    weight?: string;
    build?: string;
  };
  reviews: ProductReview[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  itemCount: number;
  iconName: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  origin: string;
  count: number;
}

export interface Outlet {
  id: string;
  name: string;
  branch: string;
  address: string;
  floor: string;
  phone: string;
  hotline: string;
  hours: string;
  fridayHours: string;
  image: string;
  mapEmbedUrl: string;
  mapDirectionUrl: string;
  isFlagship?: boolean;
}

export interface CartItem {
  id: string; // Composite: `${productId}-${variantId}`
  productId: string;
  slug: string;
  title: string;
  brand: string;
  image: string;
  variantId: string;
  variantName: string;
  colorName: string;
  storage?: string;
  price: number;
  regularPrice: number;
  quantity: number;
  status: ProductStatus;
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email?: string;
  division: string;
  district: string;
  thana: string;
  address: string;
  deliveryMethod: 'inside_dhaka' | 'outside_dhaka' | 'store_pickup';
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card' | 'emi';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';
  outletPickup?: string;
  orderNote?: string;
}
