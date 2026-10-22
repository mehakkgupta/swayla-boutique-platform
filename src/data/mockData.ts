import { Product, Order, Conversation, BoutiqueProfile, SavedCard } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Vintage Leather Jacket',
    price: 7055,
    originalPrice: 8500,
    category: 'Jackets',
    description: 'A wardrobe essential crafted from premium leather. Perfect for layering, adds instant edge to any outfit with custom burnished brass hardware.',
    inStock: true,
    stockCount: 25,
    isLive: true,
    badge: 'New',
    views: 540,
    likes: 43,
    inCart: 21,
    image: '/src/assets/images/vintage_leather_jacket_1792561588921.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Distressed Brown', hex: '#5c3a21' },
      { name: 'Onyx Black', hex: '#1c1917' }
    ],
    material: '100% Genuine Full-grain Buffalo Leather',
    boutiqueName: 'Aura Boutique',
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'prod-2',
    name: 'Silk Scarf',
    price: 1826,
    originalPrice: 2200,
    category: 'Accessories',
    description: 'Elegant and lightweight, this pure mulberry silk scarf elevates any look with its rich woven texture, gold filigree trim, and versatile styling.',
    inStock: true,
    stockCount: 5,
    isLive: true,
    badge: 'Best Seller',
    views: 320,
    likes: 88,
    inCart: 15,
    image: '/src/assets/images/silk_scarf_luxury_1792561589300.jpg',
    sizes: ['One Size (90x90 cm)'],
    colors: [
      { name: 'Olive Gold', hex: '#556b2f' },
      { name: 'Blush Rose', hex: '#f43f5e' }
    ],
    material: '100% Handwoven Mulberry Silk',
    boutiqueName: 'Aura Boutique',
    rating: 4.8,
    reviewsCount: 64
  },
  {
    id: 'prod-3',
    name: 'Handmade Beaded Necklace',
    price: 3320,
    originalPrice: 4000,
    category: 'Jewelry',
    description: 'Artisanal charm in every bead. Handcrafted to add a statement finish to both ethnic occasions and modern western wear with rubies and turquoise accents.',
    inStock: true,
    stockCount: 8,
    isLive: true,
    badge: 'Limited Stock',
    views: 610,
    likes: 114,
    inCart: 34,
    image: '/src/assets/images/beaded_necklace_gold_1792561589803.jpg',
    sizes: ['Adjustable Choker Length'],
    colors: [
      { name: 'Heritage Gold', hex: '#d4af37' }
    ],
    material: 'Brass alloy dipped in 22K Gold foil & semi-precious beads',
    boutiqueName: 'Aura Boutique',
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: 'prod-4',
    name: 'Bohemian Dress',
    price: 5000,
    originalPrice: 6200,
    category: 'Dresses',
    description: 'Flowy, free-spirited, and flattering, this boho tiered maxi dress is designed for effortless all-day comfort and romantic weekend garden strolls.',
    inStock: true,
    stockCount: 12,
    isLive: true,
    badge: 'New',
    views: 480,
    likes: 92,
    inCart: 19,
    image: '/src/assets/images/bohemian_dress_1792561618461.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Floral Bloom', hex: '#e879f9' },
      { name: 'Sunlit Ivory', hex: '#fef3c7' }
    ],
    material: 'Organic Breathable Cotton Voile with cotton lining',
    boutiqueName: 'Aura Boutique',
    rating: 4.7,
    reviewsCount: 29
  },
  {
    id: 'prod-5',
    name: 'Designer Sunglasses',
    price: 550,
    originalPrice: 1200,
    category: 'Accessories',
    description: 'Chic and minimal, these sleek cat-eye shades are your go-to for a stylish sun-block with UV400 polarized clarity and lightweight acetate frames.',
    inStock: true,
    stockCount: 25,
    isLive: true,
    badge: 'New',
    views: 290,
    likes: 45,
    inCart: 12,
    image: '/src/assets/images/designer_sunglasses_1792561617852.jpg',
    sizes: ['Universal Fit'],
    colors: [
      { name: 'Gloss Black', hex: '#0f172a' },
      { name: 'Tortoise Brown', hex: '#78350f' }
    ],
    material: 'Bio-acetate frame with polarized scratch-resistant lenses',
    boutiqueName: 'Aura Boutique',
    rating: 4.6,
    reviewsCount: 18
  },
  {
    id: 'prod-6',
    name: 'Cashmere Sweater',
    price: 5600,
    originalPrice: 6800,
    category: 'Tops',
    description: 'Soft, warm, and sophisticated. This classic crewneck cashmere piece offers cloud-like comfort with a refined touch of Italian knit luxury.',
    inStock: true,
    stockCount: 25,
    isLive: true,
    badge: 'New',
    views: 380,
    likes: 73,
    inCart: 22,
    image: '/src/assets/images/cashmere_sweater_1792561618672.jpg',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Camel Oatmeal', hex: '#c5a059' },
      { name: 'Misty Cream', hex: '#f5f5f4' }
    ],
    material: '100% Grade-A Mongolian Cashmere',
    boutiqueName: 'Aura Boutique',
    rating: 4.9,
    reviewsCount: 51
  },
  {
    id: 'prod-7',
    name: 'Boho Chic Handbag',
    price: 2200,
    originalPrice: 2800,
    category: 'Bags',
    description: 'A staple for any season, this earthy-toned woven tote blends practicality with artisanal bohemian flair. Features genuine leather trims.',
    inStock: true,
    stockCount: 25,
    isLive: true,
    badge: 'New',
    views: 510,
    likes: 98,
    inCart: 28,
    image: '/src/assets/images/boho_chic_handbag_1792561590481.jpg',
    sizes: ['Medium Tote'],
    colors: [
      { name: 'Natural Tan', hex: '#d97706' },
      { name: 'Warm Sand', hex: '#e2e8f0' }
    ],
    material: 'Natural woven raffia palm fiber and saddle leather',
    boutiqueName: 'Aura Boutique',
    rating: 4.8,
    reviewsCount: 33
  },
  {
    id: 'prod-8',
    name: 'Stylish Ankle Boots',
    price: 8400,
    originalPrice: 10200,
    category: 'Shoes',
    description: 'Sleek chelsea boots handcrafted from burnished calfskin with cushioned insoles and durable anti-skid rubber lug soles for timeless elegance.',
    inStock: true,
    stockCount: 6,
    isLive: true,
    badge: 'Limited Stock',
    views: 440,
    likes: 67,
    inCart: 16,
    image: '/src/assets/images/ankle_boots_leather_1792561618683.jpg',
    sizes: ['EU 37', 'EU 38', 'EU 39', 'EU 40'],
    colors: [
      { name: 'Cognac Tan', hex: '#b45309' },
      { name: 'Ebony Black', hex: '#18181b' }
    ],
    material: 'Handcrafted Italian Calf Leather',
    boutiqueName: 'Aura Boutique',
    rating: 4.9,
    reviewsCount: 24
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '#0278',
    customerName: 'Arushi Verma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'arushi.v@example.com',
    orderDate: '09-07-2025',
    status: 'pending',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Silk Scarf
        quantity: 1,
        price: 1826,
        selectedColor: 'Olive Gold',
        selectedSize: 'One Size'
      }
    ],
    totalAmount: 1826,
    address: {
      street: '42 Blossom Crest, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    }
  },
  {
    id: 'ord-2',
    orderNumber: '#0102',
    customerName: 'Abhilasha',
    customerPhone: '+91 98111 22334',
    customerEmail: 'abhilasha.s@example.com',
    orderDate: '08-07-2025',
    status: 'delivered',
    shippingDate: '06-07-2025',
    trackingNo: '1J322LE9876543210',
    items: [
      {
        product: INITIAL_PRODUCTS[2], // Beaded necklace
        quantity: 1,
        price: 3320,
        selectedColor: 'Heritage Gold'
      }
    ],
    totalAmount: 3320,
    address: {
      street: '15 Lotus Court, GK-II',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110048'
    }
  },
  {
    id: 'ord-3',
    orderNumber: '#0236',
    customerName: 'Sweety Bharti',
    customerPhone: '+91 97234 56789',
    customerEmail: 'sweety.b@example.com',
    orderDate: '02-07-2025',
    status: 'shipped',
    shippingDate: '05-07-2025',
    trackingNo: '1J322LE9876543210',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Silk Scarf
        quantity: 1,
        price: 1826,
        selectedColor: 'Blush Rose'
      }
    ],
    totalAmount: 1826,
    address: {
      street: '78 Park Street, Apt 4B',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700016'
    }
  },
  {
    id: 'ord-4',
    orderNumber: '#0156',
    customerName: 'Deepanshu',
    customerPhone: '+91 99887 76655',
    customerEmail: 'deepanshu.k@example.com',
    orderDate: '29-06-2025',
    status: 'accepted',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Vintage Leather Jacket
        quantity: 1,
        price: 7055,
        selectedSize: 'L',
        selectedColor: 'Distressed Brown'
      }
    ],
    totalAmount: 7055,
    address: {
      street: '88 Cyber City View',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    }
  },
  {
    id: 'ord-5',
    orderNumber: '#0249',
    customerName: 'Khushboo Kaur',
    customerPhone: '+91 98450 12345',
    customerEmail: 'khushboo@example.com',
    orderDate: '28-06-2025',
    status: 'delivered',
    shippingDate: '30-06-2025',
    trackingNo: 'DEL-992384102',
    items: [
      {
        product: INITIAL_PRODUCTS[3], // Bohemian dress
        quantity: 1,
        price: 5000,
        selectedSize: 'M',
        selectedColor: 'Floral Bloom'
      }
    ],
    totalAmount: 5000,
    address: {
      street: 'B-12 Model Town',
      city: 'Ludhiana',
      state: 'Punjab',
      pincode: '141002'
    }
  },
  {
    id: 'ord-6',
    orderNumber: '#0192',
    customerName: 'Dakshita Singla',
    customerPhone: '+91 99123 44556',
    customerEmail: 'dakshita@example.com',
    orderDate: '02-07-2025',
    status: 'accepted',
    items: [
      {
        product: INITIAL_PRODUCTS[6], // Boho chic handbag
        quantity: 1,
        price: 2200,
        selectedColor: 'Natural Tan'
      }
    ],
    totalAmount: 2200,
    address: {
      street: '56 Panchsheel Enclave',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302018'
    }
  },
  {
    id: 'ord-7',
    orderNumber: '#0184',
    customerName: 'Krishan Kumar',
    customerPhone: '+91 98220 33445',
    customerEmail: 'krishan.k@example.com',
    orderDate: '02-07-2025',
    status: 'accepted',
    items: [
      {
        product: INITIAL_PRODUCTS[7], // Ankle Boots
        quantity: 1,
        price: 8400,
        selectedSize: 'EU 40',
        selectedColor: 'Cognac Tan'
      }
    ],
    totalAmount: 8400,
    address: {
      street: '12 Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001'
    }
  },
  {
    id: 'ord-8',
    orderNumber: '#0169',
    customerName: 'Aashi Khatri',
    customerPhone: '+91 97110 55667',
    customerEmail: 'aashi.kh@example.com',
    orderDate: '02-07-2025',
    status: 'accepted',
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Sunglasses
        quantity: 1,
        price: 550,
        selectedColor: 'Gloss Black'
      }
    ],
    totalAmount: 550,
    address: {
      street: '104 Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400020'
    }
  },
  {
    id: 'ord-9',
    orderNumber: '#0098',
    customerName: 'Uma Gupta',
    customerPhone: '+91 98711 00223',
    customerEmail: 'uma.g@example.com',
    orderDate: '20-06-2025',
    status: 'delivered',
    shippingDate: '22-06-2025',
    trackingNo: 'IND-88192031',
    items: [
      {
        product: INITIAL_PRODUCTS[5], // Cashmere sweater
        quantity: 1,
        price: 5600,
        selectedSize: 'S',
        selectedColor: 'Camel Oatmeal'
      }
    ],
    totalAmount: 5600,
    address: {
      street: '44 Civil Lines',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001'
    }
  },
  {
    id: 'ord-10',
    orderNumber: '#0052',
    customerName: 'Aisha Malan',
    customerPhone: '+91 99900 11223',
    customerEmail: 'aisha.m@example.com',
    orderDate: '15-06-2025',
    status: 'delivered',
    shippingDate: '17-06-2025',
    trackingNo: 'DTDC-77123912',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Silk Scarf
        quantity: 1,
        price: 1826,
        selectedColor: 'Olive Gold'
      }
    ],
    totalAmount: 1826,
    address: {
      street: '22 Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    }
  },
  {
    id: 'ord-11',
    orderNumber: '#AB041',
    customerName: 'Rhea Sen',
    customerPhone: '+91 98300 44556',
    customerEmail: 'rhea.sen@example.com',
    orderDate: '10-07-2025',
    status: 'pending',
    isAbandoned: true,
    items: [
      {
        product: INITIAL_PRODUCTS[3], // Bohemian Dress
        quantity: 1,
        price: 5000,
        selectedSize: 'S'
      }
    ],
    totalAmount: 5000,
    address: {
      street: 'Salt Lake Sector 5',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091'
    }
  },
  {
    id: 'ord-12',
    orderNumber: '#AB042',
    customerName: 'Natasha Kapoor',
    customerPhone: '+91 99400 77889',
    customerEmail: 'natasha.k@example.com',
    orderDate: '09-07-2025',
    status: 'pending',
    isAbandoned: true,
    items: [
      {
        product: INITIAL_PRODUCTS[7], // Boots
        quantity: 1,
        price: 8400,
        selectedSize: 'EU 38'
      }
    ],
    totalAmount: 8400,
    address: {
      street: 'Alwarpet Main Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600018'
    }
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    customerName: 'Ayesha Sharma',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastMessage: "Hi, I'm interested in the vintage dress you posted. Can you tell me more about the fabric?",
    timeAgo: '26m',
    unread: true,
    unreadCount: 1,
    productId: 'prod-4',
    messages: [
      {
        id: 'm1',
        sender: 'buyer',
        text: "Hi, I'm interested in the vintage dress you posted. Can you tell me more about the fabric?",
        timestamp: '10:14 AM',
        productId: 'prod-4'
      }
    ]
  },
  {
    id: 'conv-2',
    customerName: 'Kunal Batra',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'I love the shoes! Are they available in size 9?',
    timeAgo: '2h',
    unread: false,
    productId: 'prod-8',
    messages: [
      {
        id: 'm2',
        sender: 'buyer',
        text: 'I love the shoes! Are they available in size 9?',
        timestamp: '08:42 AM',
        productId: 'prod-8'
      },
      {
        id: 'm3',
        sender: 'seller',
        text: 'Hello Kunal! Yes, EU 40 is in stock and fits UK 9 comfortably. We dispatch the same day!',
        timestamp: '09:05 AM'
      }
    ]
  },
  {
    id: 'conv-3',
    customerName: 'Tanvi Joshi',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'I received the package, but there seems to be a slight issue with the color.',
    timeAgo: '2h',
    unread: true,
    unreadCount: 2,
    messages: [
      {
        id: 'm4',
        sender: 'buyer',
        text: 'I received the package, but there seems to be a slight issue with the color.',
        timestamp: '08:15 AM'
      },
      {
        id: 'm5',
        sender: 'buyer',
        text: 'Could you help me with an exchange for the blush rose tone?',
        timestamp: '08:16 AM'
      }
    ]
  },
  {
    id: 'conv-4',
    customerName: 'Siddharth Jain',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Just wanted to say thank you for the quick delivery! The scarf is beautiful.',
    timeAgo: '3h',
    unread: false,
    productId: 'prod-2',
    messages: [
      {
        id: 'm6',
        sender: 'buyer',
        text: 'Just wanted to say thank you for the quick delivery! The scarf is beautiful.',
        timestamp: '07:30 AM',
        productId: 'prod-2'
      },
      {
        id: 'm7',
        sender: 'seller',
        text: "Thank you so much Siddharth! We're so thrilled you love it. Have a wonderful day!",
        timestamp: '07:45 AM'
      }
    ]
  },
  {
    id: 'conv-5',
    customerName: 'Arjun',
    customerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    lastMessage: "I'm interested in the jewelry set. Can you provide more photos?",
    timeAgo: '6h',
    unread: false,
    productId: 'prod-3',
    messages: [
      {
        id: 'm8',
        sender: 'buyer',
        text: "I'm interested in the jewelry set. Can you provide more photos?",
        timestamp: '04:12 AM',
        productId: 'prod-3'
      }
    ]
  },
  {
    id: 'conv-6',
    customerName: 'Kavya Mehta',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'I am a new buyer and have a question about the payment process.',
    timeAgo: '1d',
    unread: false,
    messages: [
      {
        id: 'm9',
        sender: 'buyer',
        text: 'I am a new buyer and have a question about the payment process.',
        timestamp: 'Yesterday'
      }
    ]
  }
];

export const INITIAL_BOUTIQUE_PROFILE: BoutiqueProfile = {
  name: 'Aura Boutique',
  tagline: 'Discover unique, handpicked fashion items',
  ownerName: 'Lavanya Mehra',
  email: 'seller@swayla.com',
  phone: '+91 98765 00001',
  logoUrl: '',
  themeColor: '#FF4D8D',
  categories: ['Dresses', 'Accessories', 'Jewelry', 'Bags', 'Shoes', 'Tops'],
  memberSince: 'Jan 2022',
  bankInfo: {
    bankName: 'HDFC Bank - Indiranagar',
    accountNumber: '•••• •••• 8912',
    ifsc: 'HDFC0001244',
    upiId: 'auraboutique@okhdfcbank'
  },
  socialLinks: {
    instagram: '@aura.boutique.official',
    whatsapp: '+91 98765 00001',
    facebook: 'facebook.com/auraboutique'
  },
  notifications: {
    newOrders: true,
    messages: true,
    lowStock: true
  },
  security: {
    twoFactorEnabled: true
  }
};

export const FEATURED_BOUTIQUES = [
  {
    id: 'btq-1',
    name: 'Lavanya Styles',
    city: 'Jaipur',
    tagline: 'Hand-block prints & festive royal elegance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    itemsCount: 42,
    rating: 4.9
  },
  {
    id: 'btq-2',
    name: 'Silk Aura',
    city: 'Mumbai',
    tagline: 'Contemporary draping & luxury evening wear',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    itemsCount: 38,
    rating: 4.8
  },
  {
    id: 'btq-3',
    name: 'Velvet Stitch',
    city: 'Delhi NCR',
    tagline: 'Bespoke tailoring, coats & structured knitwear',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    itemsCount: 29,
    rating: 4.9
  }
];

export const TRENDING_STORIES = [
  { name: 'Sarees', icon: '👘', color: 'from-pink-500 to-rose-400' },
  { name: 'Kurtis', icon: '👗', color: 'from-amber-500 to-orange-400' },
  { name: 'Dupattas', icon: '🧣', color: 'from-emerald-500 to-teal-400' },
  { name: 'Jewelry', icon: '💍', color: 'from-purple-500 to-indigo-400' },
  { name: 'Bags', icon: '👜', color: 'from-rose-500 to-pink-400' },
  { name: 'Footwear', icon: '👠', color: 'from-blue-500 to-cyan-400' }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'SWAYLA50',
    title: '50% Off First Boutique Order',
    discountType: 'percentage' as const,
    discountValue: 50,
    minOrderValue: 999,
    maxDiscount: 2500,
    description: 'Flat 50% discount on your first transaction across all indie boutiques',
    tag: 'Best Value'
  },
  {
    code: 'FESTIVE20',
    title: 'Festive Season 20% Off',
    discountType: 'percentage' as const,
    discountValue: 20,
    minOrderValue: 1499,
    maxDiscount: 1500,
    description: 'Save 20% on all handcrafted dresses, luxury silks & jewelry',
    tag: 'Festive Special'
  },
  {
    code: 'AURA10',
    title: 'Aura Boutique 10% Off',
    discountType: 'percentage' as const,
    discountValue: 10,
    minOrderValue: 0,
    maxDiscount: 800,
    description: 'No minimum order required for all handcrafted artisan catalog items',
    tag: 'Studio Exclusive'
  },
  {
    code: 'FREESHIP',
    title: 'Free Express Shipping',
    discountType: 'freeship' as const,
    discountValue: 99,
    minOrderValue: 0,
    description: 'Enjoy complimentary express courier delivery to your doorstep',
    tag: 'Zero Shipping'
  }
];

export const INITIAL_SAVED_CARDS: SavedCard[] = [
  {
    id: 'card-1',
    cardNumber: '•••• •••• •••• 8921',
    cardholderName: 'MEHAK SHARMA',
    expiryMonth: '08',
    expiryYear: '28',
    brand: 'visa',
    isDefault: true,
    bankName: 'HDFC Bank Visa Infinite'
  },
  {
    id: 'card-2',
    cardNumber: '•••• •••• •••• 4022',
    cardholderName: 'MEHAK SHARMA',
    expiryMonth: '11',
    expiryYear: '29',
    brand: 'mastercard',
    isDefault: false,
    bankName: 'ICICI Platinum Mastercard'
  }
];
