export type UserRole = 'seller' | 'buyer';

export type ScreenType = 
  | 'splash'
  | 'onboarding'
  | 'intro'
  | 'login'
  | 'forgot_password'
  | 'seller_register'
  | 'buyer_register'
  | 'seller_dashboard'
  | 'seller_boutique'
  | 'seller_product_detail'
  | 'buyer_dashboard'
  | 'buyer_home'
  | 'buyer_product_detail';

export type SellerTab = 'home' | 'orders' | 'products' | 'messages' | 'profile';
export type BuyerTab = 'home' | 'explore' | 'orders' | 'profile';
export type OrderStatus = 'all' | 'pending' | 'accepted' | 'shipped' | 'delivered';
export type OrderFilterType = 'all' | 'abandoned';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  isLive: boolean;
  badge?: 'New' | 'Best Seller' | 'Limited Stock' | 'Sale';
  views: number;
  likes: number;
  inCart: number;
  image: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  material?: string;
  boutiqueName?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderDate: string;
  status: 'pending' | 'accepted' | 'shipped' | 'delivered';
  isAbandoned?: boolean;
  items: OrderItem[];
  totalAmount: number;
  shippingDate?: string;
  trackingNo?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller';
  text: string;
  timestamp: string;
  productId?: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  timeAgo: string;
  unread: boolean;
  unreadCount?: number;
  messages: ChatMessage[];
  productId?: string;
}

export interface BoutiqueProfile {
  name: string;
  tagline: string;
  ownerName: string;
  email: string;
  phone: string;
  logoUrl?: string;
  themeColor: string;
  categories: string[];
  memberSince: string;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    ifsc: string;
    upiId: string;
  };
  socialLinks: {
    instagram: string;
    whatsapp: string;
    facebook: string;
  };
  notifications: {
    newOrders: boolean;
    messages: boolean;
    lowStock: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Coupon {
  code: string;
  title: string;
  discountType: 'percentage' | 'flat' | 'freeship';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  description: string;
  tag?: string;
}

export interface SavedCard {
  id: string;
  cardNumber: string; // e.g. "•••• •••• •••• 8921" or full formatted number
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  brand: 'visa' | 'mastercard' | 'rupay' | 'amex';
  isDefault?: boolean;
  bankName?: string;
}

