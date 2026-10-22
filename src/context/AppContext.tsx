import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  ScreenType, 
  SellerTab, 
  BuyerTab,
  Product, 
  Order, 
  Conversation, 
  BoutiqueProfile, 
  CartItem,
  Coupon,
  SavedCard 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_BOUTIQUE_PROFILE,
  AVAILABLE_COUPONS,
  INITIAL_SAVED_CARDS 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  logout: () => void;
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  sellerTab: SellerTab;
  setSellerTab: (tab: SellerTab) => void;
  buyerTab: BuyerTab;
  setBuyerTab: (tab: BuyerTab) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedProduct: Product | undefined;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'views' | 'likes' | 'inCart'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductLive: (id: string) => void;
  applyDiscountToProduct: (id: string, discountPercent: number) => void;

  // Orders
  orders: Order[];
  buyerOrders: Order[];
  acceptOrder: (id: string) => void;
  markOrderShipped: (id: string, trackingNo?: string) => void;
  markOrderDelivered: (id: string) => void;
  cancelOrder: (id: string) => void;
  reorder: (order: Order) => void;
  sendAbandonedRecovery: (id: string, discountCode?: string) => void;
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'orderDate'>) => Order;

  // Conversations & Chat
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  activeConversation: Conversation | undefined;
  sendMessage: (conversationId: string, text: string, attachedProductId?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  // Coupons System
  availableCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  couponDiscountAmount: number;
  shippingFee: number;
  finalOrderTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Boutique Profile
  boutiqueProfile: BoutiqueProfile;
  updateBoutiqueProfile: (updates: Partial<BoutiqueProfile>) => void;

  // Buyer Info
  buyerName: string;
  setBuyerName: (name: string) => void;

  // Viewport simulator
  deviceMode: 'mobile' | 'responsive';
  setDeviceMode: (mode: 'mobile' | 'responsive') => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Fullscreen Image Lightbox
  fullscreenImage: { url: string; title: string } | null;
  setFullscreenImage: (img: { url: string; title: string } | null) => void;

  // Saved Cards & Payment
  savedCards: SavedCard[];
  addSavedCard: (card: Omit<SavedCard, 'id'>) => SavedCard;
  deleteSavedCard: (id: string) => void;
  setDefaultCard: (id: string) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
  isEditProductOpen: boolean;
  setIsEditProductOpen: (open: boolean) => void;
  isDiscountModalOpen: boolean;
  setIsDiscountModalOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCouponsModalOpen: boolean;
  setIsCouponsModalOpen: (open: boolean) => void;
  isSavedItemsModalOpen: boolean;
  setIsSavedItemsModalOpen: (open: boolean) => void;
  isSavedCardsModalOpen: boolean;
  setIsSavedCardsModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // App starts strictly at Login requesting login id for separate buyer or seller
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole>('buyer');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  
  const [sellerTab, setSellerTab] = useState<SellerTab>('home');
  const [buyerTab, setBuyerTab] = useState<BuyerTab>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('prod-1');
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [boutiqueProfile, setBoutiqueProfile] = useState<BoutiqueProfile>(INITIAL_BOUTIQUE_PROFILE);
  const [buyerName, setBuyerName] = useState<string>('Mehak Sharma');
  
  const [wishlist, setWishlist] = useState<string[]>(['prod-4', 'prod-7', 'prod-2']);

  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[1], // Silk scarf
      quantity: 1,
      selectedSize: 'One Size',
      selectedColor: 'Olive Gold'
    }
  ]);

  // Coupons State
  const [availableCoupons] = useState<Coupon[]>(AVAILABLE_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]); // Default to SWAYLA50

  const [deviceMode, setDeviceMode] = useState<'mobile' | 'responsive'>('mobile');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [fullscreenImage, setFullscreenImage] = useState<{ url: string; title: string } | null>(null);

  // Saved Cards & Payment
  const [savedCards, setSavedCards] = useState<SavedCard[]>(INITIAL_SAVED_CARDS);
  const [isSavedCardsModalOpen, setIsSavedCardsModalOpen] = useState(false);

  const addSavedCard = (newCardData: Omit<SavedCard, 'id'>): SavedCard => {
    const newCard: SavedCard = {
      ...newCardData,
      id: `card-${Date.now()}`
    };
    setSavedCards(prev => {
      if (newCard.isDefault) {
        return [newCard, ...prev.map(c => ({ ...c, isDefault: false }))];
      }
      return [newCard, ...prev];
    });
    addToast({
      title: 'Card Saved',
      message: `${newCard.brand.toUpperCase()} ending in ${newCard.cardNumber.slice(-4)} added to saved methods.`,
      type: 'success'
    });
    return newCard;
  };

  const deleteSavedCard = (id: string) => {
    setSavedCards(prev => prev.filter(c => c.id !== id));
    addToast({
      title: 'Card Removed',
      message: 'Card was removed from saved payment methods.',
      type: 'info'
    });
  };

  const setDefaultCard = (id: string) => {
    setSavedCards(prev => prev.map(c => ({
      ...c,
      isDefault: c.id === id
    })));
  };

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
  const [isSavedItemsModalOpen, setIsSavedItemsModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    addToast({ title: 'Logged out', message: 'You have been signed out successfully.', type: 'info' });
  };

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  // Cart Totals and Counts
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Accurate Dynamic Coupon Discount Calculation
  let couponDiscountAmount = 0;
  if (appliedCoupon && cartTotal > 0) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = Math.round((cartTotal * appliedCoupon.discountValue) / 100);
      couponDiscountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else if (appliedCoupon.discountType === 'flat') {
      couponDiscountAmount = Math.min(appliedCoupon.discountValue, cartTotal);
    }
  }

  // Shipping Fee calculation
  const shippingFee = (cartTotal > 999 || cartTotal === 0 || appliedCoupon?.discountType === 'freeship') ? 0 : 99;
  const finalOrderTotal = Math.max(0, cartTotal - couponDiscountAmount + shippingFee);

  const applyCoupon = (code: string): boolean => {
    const found = availableCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      addToast({
        title: 'Invalid Coupon Code',
        message: 'Please select a valid coupon from available offers.',
        type: 'error'
      });
      return false;
    }

    if (found.minOrderValue && cartTotal < found.minOrderValue) {
      addToast({
        title: 'Minimum Order Value Required',
        message: `Add ₹${(found.minOrderValue - cartTotal).toLocaleString('en-IN')} more to your bag to apply ${found.code}.`,
        type: 'warning'
      });
      return false;
    }

    setAppliedCoupon(found);
    addToast({
      title: `${found.code} Applied!`,
      message: `${found.title} activated successfully.`,
      type: 'success'
    });
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast({
      title: 'Coupon Removed',
      message: 'Discount has been removed from your bag.',
      type: 'info'
    });
  };

  // Buyer Orders list (orders placed by buyer Mehak, plus initial sample orders)
  const buyerOrders = orders.filter(o => 
    !o.isAbandoned && (
      o.customerName.toLowerCase().includes('mehak') ||
      o.customerName === 'Arushi Verma' ||
      o.customerName === 'Sweety Bharti'
    )
  );

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      const prod = products.find(p => p.id === productId);
      addToast({
        title: exists ? 'Removed from Saved Items' : 'Saved to Wishlist ❤️',
        message: prod?.name,
        type: exists ? 'info' : 'success'
      });
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Product Actions
  const addProduct = (newProdData: Omit<Product, 'id' | 'views' | 'likes' | 'inCart'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
      views: 0,
      likes: 0,
      inCart: 0
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast({ title: 'Product Added!', message: `${newProduct.name} is now listed in your boutique.`, type: 'success' });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast({ title: 'Product Updated', message: 'Changes have been saved successfully.', type: 'success' });
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProductId === id) {
      setSelectedProductId(products[0]?.id || null);
    }
    addToast({ title: 'Product Removed', message: `${prod?.name || 'Item'} deleted from store.`, type: 'info' });
  };

  const toggleProductLive = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.isLive;
        addToast({ 
          title: nextState ? 'Product is Live' : 'Product Unpublished', 
          message: nextState ? `${p.name} is now visible to all shoppers.` : `${p.name} hidden from store catalog.`,
          type: nextState ? 'success' : 'info'
        });
        return { ...p, isLive: nextState };
      }
      return p;
    }));
  };

  const applyDiscountToProduct = (id: string, discountPercent: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const origPrice = p.originalPrice || p.price;
        const discountedPrice = Math.round(origPrice * (1 - discountPercent / 100));
        addToast({
          title: `${discountPercent}% Discount Applied!`,
          message: `${p.name} price reduced from ₹${origPrice} to ₹${discountedPrice}.`,
          type: 'success'
        });
        return {
          ...p,
          originalPrice: origPrice,
          price: discountedPrice,
          badge: 'Sale'
        };
      }
      return p;
    }));
  };

  // Order Actions
  const acceptOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'accepted' } : o));
    addToast({ title: 'Order Accepted!', message: 'Customer notified to prepare packaging.', type: 'success' });
  };

  const markOrderShipped = (id: string, trackingNo?: string) => {
    const genTracking = trackingNo || `SWY-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setOrders(prev => prev.map(o => o.id === id ? { 
      ...o, 
      status: 'shipped', 
      shippingDate: new Date().toLocaleDateString('en-GB'),
      trackingNo: genTracking 
    } : o));
    addToast({ title: 'Order Dispatched', message: `Tracking Number: ${genTracking}`, type: 'success' });
  };

  const markOrderDelivered = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'delivered' } : o));
    addToast({ title: 'Order Delivered', message: 'Payment released to boutique wallet.', type: 'success' });
  };

  const cancelOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    addToast({ title: 'Order Cancelled', message: 'Order has been successfully cancelled & refunded.', type: 'info' });
  };

  const reorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity, item.selectedSize, item.selectedColor);
    });
    setIsCartOpen(true);
    addToast({ title: 'Items Re-added to Bag', message: 'Ready for checkout.', type: 'success' });
  };

  const sendAbandonedRecovery = (id: string, discountCode: string = 'COMEBACK15') => {
    addToast({ 
      title: 'Recovery WhatsApp & Email Sent!', 
      message: `Offered ${discountCode} coupon to encourage completion.`, 
      type: 'success' 
    });
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `#${Math.floor(1000 + Math.random() * 9000)}`,
      orderDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // Chat Actions
  const sendMessage = (conversationId: string, text: string, attachedProductId?: string) => {
    const newMsg: any = {
      id: `msg-${Date.now()}`,
      sender: role === 'seller' ? 'seller' : 'buyer',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      productId: attachedProductId
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          timeAgo: 'Just now',
          unread: false,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  // Cart Actions
  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    const size = selectedSize || product.sizes?.[0] || 'Default';
    const color = selectedColor || product.colors?.[0]?.name || 'Standard';

    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (existing) {
        return prev.map(item => 
          item === existing 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });

    addToast({
      title: 'Added to Bag',
      message: `${product.name} (${size}, ${color}) added.`,
      type: 'success'
    });
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
    setCart(prev => prev.map(item => {
      if (
        item.product.id === productId &&
        (!selectedSize || item.selectedSize === selectedSize) &&
        (!selectedColor || item.selectedColor === selectedColor)
      ) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    setCart(prev => prev.filter(item => !(
      item.product.id === productId &&
      (!selectedSize || item.selectedSize === selectedSize) &&
      (!selectedColor || item.selectedColor === selectedColor)
    )));
  };

  const clearCart = () => setCart([]);

  // Boutique Profile
  const updateBoutiqueProfile = (updates: Partial<BoutiqueProfile>) => {
    setBoutiqueProfile(prev => ({ ...prev, ...updates }));
    addToast({ title: 'Profile Updated', message: 'Boutique details successfully saved.', type: 'success' });
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      isAuthenticated,
      setIsAuthenticated,
      logout,
      currentScreen,
      setCurrentScreen,
      sellerTab,
      setSellerTab,
      buyerTab,
      setBuyerTab,
      selectedProductId,
      setSelectedProductId,
      selectedProduct,

      products,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductLive,
      applyDiscountToProduct,

      orders,
      buyerOrders,
      acceptOrder,
      markOrderShipped,
      markOrderDelivered,
      cancelOrder,
      reorder,
      sendAbandonedRecovery,
      createOrder,

      conversations,
      activeConversationId,
      setActiveConversationId,
      activeConversation,
      sendMessage,

      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,

      availableCoupons,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      couponDiscountAmount,
      shippingFee,
      finalOrderTotal,

      wishlist,
      toggleWishlist,
      isInWishlist,

      boutiqueProfile,
      updateBoutiqueProfile,
      buyerName,
      setBuyerName,

      deviceMode,
      setDeviceMode,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,

      fullscreenImage,
      setFullscreenImage,

      // Saved Cards
      savedCards,
      addSavedCard,
      deleteSavedCard,
      setDefaultCard,
      isSavedCardsModalOpen,
      setIsSavedCardsModalOpen,

      isCartOpen,
      setIsCartOpen,
      isAddProductOpen,
      setIsAddProductOpen,
      isEditProductOpen,
      setIsEditProductOpen,
      isDiscountModalOpen,
      setIsDiscountModalOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isCouponsModalOpen,
      setIsCouponsModalOpen,
      isSavedItemsModalOpen,
      setIsSavedItemsModalOpen,

      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
