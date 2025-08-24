import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import './index.css';

// Context for global state management
const ShopContext = createContext();

// Context Provider
const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Enhanced product data with all categories
  const sampleProducts = [
    // Women's Sale Items - Shirts & Blouses
    {
      id: 1,
      name: "RELAXED FIT SHIRT",
      category: "women",
      subcategory: "shirts",
      price: 39.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=600&fit=crop"
      ],
      description: "Relaxed fit shirt with a classic collar and long sleeves. Button-up front.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Light Blue", "Cream"],
      isNew: false,
      isBestseller: true,
      rating: 4.9,
      reviews: 189,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 50,
      stock: 45,
      sku: "1234567890"
    },
    {
      id: 2,
      name: "SATIN FINISH BLOUSE",
      category: "women",
      subcategory: "shirts",
      price: 59.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
      ],
      description: "Blouse with a satin finish. Round neckline and long sleeves. Button fastening at the back of the neck.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Ivory"],
      isNew: false,
      isBestseller: false,
      rating: 4.7,
      reviews: 87,
      material: "100% Polyester",
      care: "Dry clean only",
      discount: 50,
      stock: 23,
      sku: "1234567891"
    },
    {
      id: 3,
      name: "POPLIN SHIRT WITH CONTRAST",
      category: "women",
      subcategory: "shirts",
      price: 44.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
      ],
      description: "Poplin shirt with contrast details. Classic collar and long sleeves with buttoned cuffs.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Striped", "Blue"],
      isNew: true,
      isBestseller: false,
      rating: 4.6,
      reviews: 134,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 50,
      stock: 67,
      sku: "1234567892"
    },
    // Women's Sale Items - Jeans
    {
      id: 4,
      name: "HIGH WAIST SKINNY JEANS",
      category: "women",
      subcategory: "jeans",
      price: 49.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop"
      ],
      description: "High-waist skinny jeans. Five pockets. Zip fly and top button fastening.",
      sizes: ["25", "26", "27", "28", "29", "30", "31", "32"],
      colors: ["Dark Blue", "Black", "Light Blue"],
      isNew: false,
      isBestseller: true,
      rating: 4.8,
      reviews: 234,
      material: "99% Cotton, 1% Elastane",
      care: "Machine wash at 30°C",
      discount: 50,
      stock: 89,
      sku: "1234567893"
    },
    {
      id: 5,
      name: "WIDE-LEG JEANS",
      category: "women",
      subcategory: "jeans",
      price: 54.99,
      originalPrice: 109.99,
      image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=600&fit=crop"
      ],
      description: "Wide-leg jeans with a high waist. Five pockets. Zip fly and top button fastening.",
      sizes: ["25", "26", "27", "28", "29", "30", "31", "32"],
      colors: ["Medium Blue", "Light Wash", "Dark Wash"],
      isNew: false,
      isBestseller: false,
      rating: 4.6,
      reviews: 98,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 50,
      stock: 45,
      sku: "1234567894"
    },
    {
      id: 6,
      name: "MOM FIT JEANS",
      category: "women",
      subcategory: "jeans",
      price: 44.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"
      ],
      description: "Mom fit jeans with a high waist. Five pockets. Zip fly and top button fastening.",
      sizes: ["25", "26", "27", "28", "29", "30", "31", "32"],
      colors: ["Light Blue", "Medium Blue", "Black"],
      isNew: true,
      isBestseller: false,
      rating: 4.5,
      reviews: 145,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 44,
      stock: 52,
      sku: "1234567895"
    },
    // Women's Sale Items - Dresses
    {
      id: 7,
      name: "MINI DRESS WITH GATHERING",
      category: "women",
      subcategory: "dresses",
      price: 79.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
      ],
      description: "Short dress with a round neckline and long sleeves. Gathering detail at the waist.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Green"],
      isNew: false,
      isBestseller: true,
      rating: 4.9,
      reviews: 278,
      material: "95% Polyester, 5% Elastane",
      care: "Machine wash at 30°C",
      discount: 50,
      stock: 38,
      sku: "1234567896"
    },
    {
      id: 8,
      name: "MIDI WRAP DRESS",
      category: "women",
      subcategory: "dresses",
      price: 54.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop"
      ],
      description: "Midi wrap dress with a V-neckline and three-quarter sleeves. Tie belt detail at the waist.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Navy", "Black", "Forest Green"],
      isNew: true,
      isBestseller: false,
      rating: 4.7,
      reviews: 123,
      material: "100% Viscose",
      care: "Machine wash at 30°C",
      discount: 45,
      stock: 41,
      sku: "1234567897"
    },
    {
      id: 9,
      name: "RIBBED KNIT DRESS",
      category: "women",
      subcategory: "dresses",
      price: 34.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
      ],
      description: "Short ribbed knit dress with a round neckline and long sleeves. Fitted silhouette.",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Camel", "Grey"],
      isNew: false,
      isBestseller: true,
      rating: 4.8,
      reviews: 189,
      material: "60% Viscose, 40% Polyamide",
      care: "Machine wash at 30°C",
      discount: 50,
      stock: 73,
      sku: "1234567898"
    },
    // Men's Collection
    {
      id: 100,
      name: "SLIM FIT OXFORD SHIRT",
      category: "men",
      subcategory: "shirts",
      price: 59.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop"
      ],
      description: "Slim fit oxford shirt with button-down collar and long sleeves. Classic and versatile.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Light Blue", "Navy"],
      isNew: false,
      isBestseller: true,
      rating: 4.7,
      reviews: 156,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 33,
      stock: 45,
      sku: "M100001"
    },
    {
      id: 101,
      name: "CASUAL LINEN SHIRT",
      category: "men",
      subcategory: "shirts",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop"
      ],
      description: "Lightweight linen shirt with a relaxed fit. Perfect for casual occasions.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Beige", "Navy"],
      isNew: true,
      isBestseller: false,
      rating: 4.5,
      reviews: 89,
      material: "100% Linen",
      care: "Machine wash at 30°C",
      discount: 29,
      stock: 38,
      sku: "M100002"
    },
    {
      id: 102,
      name: "SLIM FIT DARK JEANS",
      category: "men",
      subcategory: "jeans",
      price: 79.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1542272454315-7ad9b8b5fe0d?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1542272454315-7ad9b8b5fe0d?w=400&h=600&fit=crop"
      ],
      description: "Slim fit jeans in dark wash. Five pockets with zip fly and button fastening.",
      sizes: ["30", "32", "34", "36", "38"],
      colors: ["Dark Blue", "Black"],
      isNew: false,
      isBestseller: true,
      rating: 4.8,
      reviews: 203,
      material: "99% Cotton, 1% Elastane",
      care: "Machine wash at 30°C",
      discount: 33,
      stock: 67,
      sku: "M100003"
    },
    {
      id: 103,
      name: "REGULAR FIT CHINOS",
      category: "men",
      subcategory: "pants",
      price: 54.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=600&fit=crop"
      ],
      description: "Regular fit chino trousers with side pockets. Versatile and comfortable.",
      sizes: ["30", "32", "34", "36", "38"],
      colors: ["Navy", "Khaki", "Black"],
      isNew: true,
      isBestseller: false,
      rating: 4.6,
      reviews: 134,
      material: "97% Cotton, 3% Elastane",
      care: "Machine wash at 30°C",
      discount: 31,
      stock: 52,
      sku: "M100004"
    },
    {
      id: 104,
      name: "KNIT POLO SHIRT",
      category: "men",
      subcategory: "polos",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=600&fit=crop"
      ],
      description: "Cotton knit polo shirt with short sleeves and ribbed collar.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Navy", "Grey"],
      isNew: false,
      isBestseller: true,
      rating: 4.5,
      reviews: 98,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 33,
      stock: 78,
      sku: "M100005"
    },
    // Boy's Collection
    {
      id: 200,
      name: "GRAPHIC PRINT T-SHIRT",
      category: "boy",
      subcategory: "tshirts",
      price: 19.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=600&fit=crop"
      ],
      description: "Cool graphic print t-shirt with short sleeves. Perfect for everyday wear.",
      sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
      colors: ["Navy", "White", "Red"],
      isNew: true,
      isBestseller: false,
      rating: 4.4,
      reviews: 67,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 33,
      stock: 89,
      sku: "B200001"
    },
    {
      id: 201,
      name: "DENIM SHORTS",
      category: "boy",
      subcategory: "shorts",
      price: 24.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=600&fit=crop"
      ],
      description: "Comfortable denim shorts with adjustable waistband. Perfect for active boys.",
      sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
      colors: ["Light Blue", "Dark Blue"],
      isNew: false,
      isBestseller: true,
      rating: 4.6,
      reviews: 89,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 38,
      stock: 56,
      sku: "B200002"
    },
    {
      id: 202,
      name: "STRIPED POLO SHIRT",
      category: "boy",
      subcategory: "polos",
      price: 29.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=600&fit=crop"
      ],
      description: "Classic striped polo shirt with button placket and short sleeves.",
      sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
      colors: ["Navy/White", "Red/White", "Green/White"],
      isNew: true,
      isBestseller: false,
      rating: 4.5,
      reviews: 76,
      material: "100% Cotton",
      care: "Machine wash at 30°C",
      discount: 33,
      stock: 43,
      sku: "B200003"
    },
    {
      id: 203,
      name: "BASIC SWEATSHIRT",
      category: "boy",
      subcategory: "sweatshirts",
      price: 34.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop"
      ],
      description: "Comfortable basic sweatshirt with ribbed cuffs and hem.",
      sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
      colors: ["Grey", "Navy", "Black"],
      isNew: false,
      isBestseller: true,
      rating: 4.7,
      reviews: 123,
      material: "80% Cotton, 20% Polyester",
      care: "Machine wash at 30°C",
      discount: 30,
      stock: 67,
      sku: "B200004"
    }
  ];

  // Initialize products and load saved data
  useEffect(() => {
    setProducts(sampleProducts);
    
    // Load saved user data
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    const savedWishlist = localStorage.getItem('wishlistItems');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save to localStorage when cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Authentication functions
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      showNotificationMessage('Login successful!');
      setIsLoginModalOpen(false);
      return true;
    }
    showNotificationMessage('Invalid email or password');
    return false;
  };

  const signup = (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      showNotificationMessage('User already exists with this email');
      return false;
    }
    
    const newUser = {
      id: users.length + 1,
      ...userData,
      joinDate: new Date().toISOString(),
      orders: [],
      addresses: []
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showNotificationMessage('Account created successfully!');
    setIsSignupModalOpen(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    showNotificationMessage('Logged out successfully');
    setCurrentPage('home');
  };

  // Cart functionality
  const addToCart = (productId, size = "M", color = "Black") => {
    const key = `${productId}-${size}-${color}`;
    setCartItems(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
    showNotificationMessage("Added to bag");
  };

  const removeFromCart = (productId, size = "M", color = "Black") => {
    const key = `${productId}-${size}-${color}`;
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[key] > 1) {
        newCart[key] -= 1;
      } else {
        delete newCart[key];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
    showNotificationMessage('Bag cleared');
  };

  // Wishlist functionality
  const addToWishlist = (productId) => {
    setWishlistItems(prev => ({
      ...prev,
      [productId]: true
    }));
    showNotificationMessage("Added to wishlist");
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => {
      const newWishlist = { ...prev };
      delete newWishlist[productId];
      return newWishlist;
    });
    showNotificationMessage("Removed from wishlist");
  };

  // Notification system
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Get cart total
  const getCartTotal = () => {
    let total = 0;
    for (const key in cartItems) {
      const [productId] = key.split('-');
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        total += product.price * cartItems[key];
      }
    }
    return total;
  };

  // Get cart count
  const getCartCount = () => {
    let count = 0;
    for (const key in cartItems) {
      count += cartItems[key];
    }
    return count;
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return Object.keys(wishlistItems).length;
  };

  // Filter products
  const getFilteredProducts = () => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        filtered.sort((a, b) => b.isBestseller - a.isBestseller);
    }

    return filtered;
  };

  // AI Chatbot functionality
  const handleChatMessage = (message) => {
    const newUserMessage = {
      id: chatMessages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, newUserMessage]);

    // Enhanced AI response logic
    setTimeout(() => {
      const botResponse = generateBotResponse(message.toLowerCase());
      const newBotMessage = {
        id: chatMessages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const generateBotResponse = (message) => {
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to MONOMART. I'm here to help you find the perfect pieces from our collection. What are you looking for today?";
    }
    if (message.includes('men') || message.includes('man')) {
      const menProducts = products.filter(p => p.category === 'men');
      return `Great choice! We have ${menProducts.length} men's items including shirts, jeans, chinos, and polo shirts. What style are you looking for?`;
    }
    if (message.includes('boy') || message.includes('kids')) {
      const boyProducts = products.filter(p => p.category === 'boy');
      return `Perfect! We have ${boyProducts.length} boy's items including t-shirts, shorts, polo shirts, and sweatshirts. What age range are you shopping for?`;
    }
    if (message.includes('sale') || message.includes('discount')) {
      return "Great! We currently have up to 50% off on selected items across all categories including women's, men's, and boy's collections. Would you like me to show you our best deals?";
    }
    if (message.includes('jeans')) {
      const jeans = products.filter(p => p.subcategory === 'jeans');
      return `I found ${jeans.length} jeans styles! We have high-waist skinny jeans, wide-leg jeans, and slim fit jeans. What fit are you looking for?`;
    }
    if (message.includes('shirt')) {
      const shirts = products.filter(p => p.subcategory === 'shirts');
      return `Perfect choice! We have ${shirts.length} different shirts including oxford shirts, linen shirts, and blouses. What style interests you?`;
    }
    if (message.includes('size') || message.includes('sizing')) {
      return "We offer a wide range of sizes: XS-XL for women's, S-XXL for men's, and 4-5Y to 12-13Y for boys. Each product page shows our size guide.";
    }
    if (message.includes('help')) {
      return "I can help you find products across our women's, men's, and boy's collections, check sizes, prices, and answer questions about care instructions. What would you like to know?";
    }
    
    return "I'd be happy to help you find what you're looking for! You can ask me about specific items or browse our women's, men's, or boy's collections. All with great discounts!";
  };

  const contextValue = {
    products,
    cartItems,
    wishlistItems,
    currentUser,
    isMenuOpen,
    isSearchOpen,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    priceRange,
    sortBy,
    isLoading,
    currentPage,
    selectedProduct,
    orderHistory,
    userProfile,
    newsletterEmail,
    showNotification,
    notificationMessage,
    users,
    isLoginModalOpen,
    isSignupModalOpen,
    isChatbotOpen,
    chatMessages,
    currentMessage,
    setProducts,
    setCartItems,
    setWishlistItems,
    setCurrentUser,
    setIsMenuOpen,
    setIsSearchOpen,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSubcategory,
    setPriceRange,
    setSortBy,
    setIsLoading,
    setCurrentPage,
    setSelectedProduct,
    setOrderHistory,
    setUserProfile,
    setNewsletterEmail,
    setUsers,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    setIsChatbotOpen,
    setChatMessages,
    setCurrentMessage,
    addToCart,
    removeFromCart,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    showNotificationMessage,
    getCartTotal,
    getCartCount,
    getWishlistCount,
    getFilteredProducts,
    login,
    signup,
    logout,
    handleChatMessage
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook to use shop context
const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopContextProvider');
  }
  return context;
};

// Login Modal Component
const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsSignupModalOpen, login } = useShop();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }, 1000);
  };

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>LOG IN</h2>
          <button className="close-btn" onClick={() => setIsLoginModalOpen(false)}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-mail"
              className="auth-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="auth-input"
            />
          </div>
          
          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>
        
        <div className="auth-switch">
          <p>Don't have an account? 
            <button onClick={switchToSignup} className="switch-btn">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Signup Modal Component
const SignupModal = () => {
  const { isSignupModalOpen, setIsSignupModalOpen, setIsLoginModalOpen, signup } = useShop();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      signup(formData);
      setIsLoading(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }, 1000);
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  if (!isSignupModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsSignupModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>SIGN UP</h2>
          <button className="close-btn" onClick={() => setIsSignupModalOpen(false)}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First name"
              className="auth-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last name"
              className="auth-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="E-mail"
              className="auth-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              minLength="6"
              className="auth-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              className="auth-input"
            />
          </div>
          
          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>
        
        <div className="auth-switch">
          <p>Already have an account? 
            <button onClick={switchToLogin} className="switch-btn">Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

// AI Chatbot Component
const Chatbot = () => {
  const { 
    isChatbotOpen, 
    setIsChatbotOpen, 
    chatMessages, 
    currentMessage, 
    setCurrentMessage, 
    handleChatMessage 
  } = useShop();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      handleChatMessage(currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button 
        className="chatbot-toggle"
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        aria-label="Open AI Assistant"
      >
        <span className="chatbot-icon">💬</span>
      </button>

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <h3>MONOMART ASSISTANT</h3>
            </div>
            <button 
              className="chatbot-close"
              onClick={() => setIsChatbotOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="chatbot-messages">
            {chatMessages.length === 0 && (
              <div className="welcome-message">
                <p>Hello! Welcome to MONOMART. I'm here to help you find the perfect pieces from our women's, men's, and boy's collections. What are you looking for today?</p>
              </div>
            )}
            
            {chatMessages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{message.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask about our collections..."
              maxLength={200}
            />
            <button type="submit" disabled={!currentMessage.trim()}>
              SEND
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// Enhanced Header Component
const Header = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getWishlistCount,
    currentUser,
    setCurrentPage,
    setIsLoginModalOpen,
    logout,
    setSelectedCategory,
    setSelectedSubcategory
  } = useShop();

  const handleCategoryClick = (category, subcategory = 'all') => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setCurrentPage('products');
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <h1>MONOMART</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <div className="nav-item dropdown">
            <button onClick={() => handleCategoryClick('women')}>WOMAN</button>
            <div className="dropdown-content">
              <div className="dropdown-section">
                <h4>CLOTHING</h4>
                <button onClick={() => handleCategoryClick('women', 'shirts')}>SHIRTS | BLOUSES</button>
                <button onClick={() => handleCategoryClick('women', 'jeans')}>JEANS</button>
                <button onClick={() => handleCategoryClick('women', 'dresses')}>DRESSES</button>
                <button onClick={() => handleCategoryClick('women', 'blazers')}>BLAZERS</button>
                <button onClick={() => handleCategoryClick('women', 'knitwear')}>KNITWEAR</button>
              </div>
            </div>
          </div>
          
          <div className="nav-item dropdown">
            <button onClick={() => handleCategoryClick('men')}>MAN</button>
            <div className="dropdown-content">
              <div className="dropdown-section">
                <h4>CLOTHING</h4>
                <button onClick={() => handleCategoryClick('men', 'shirts')}>SHIRTS</button>
                <button onClick={() => handleCategoryClick('men', 'jeans')}>JEANS</button>
                <button onClick={() => handleCategoryClick('men', 'pants')}>PANTS</button>
                <button onClick={() => handleCategoryClick('men', 'polos')}>POLO SHIRTS</button>
              </div>
            </div>
          </div>

          <div className="nav-item dropdown">
            <button onClick={() => handleCategoryClick('boy')}>BOY</button>
            <div className="dropdown-content">
              <div className="dropdown-section">
                <h4>CLOTHING</h4>
                <button onClick={() => handleCategoryClick('boy', 'tshirts')}>T-SHIRTS</button>
                <button onClick={() => handleCategoryClick('boy', 'shorts')}>SHORTS</button>
                <button onClick={() => handleCategoryClick('boy', 'polos')}>POLO SHIRTS</button>
                <button onClick={() => handleCategoryClick('boy', 'sweatshirts')}>SWEATSHIRTS</button>
              </div>
            </div>
          </div>
          
          <div className="nav-item">
            <button onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
              setCurrentPage('sale');
            }}>SALE</button>
          </div>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button
            className="search-toggle"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {currentUser ? (
            <div className="user-menu dropdown">
              <button className="account-btn" aria-label="Account">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-content user-dropdown">
                <button onClick={() => setCurrentPage('profile')}>MY ACCOUNT</button>
                <button onClick={() => setCurrentPage('orders')}>MY ORDERS</button>
                <button onClick={logout}>LOG OUT</button>
              </div>
            </div>
          ) : (
            <button
              className="account-btn"
              onClick={() => setIsLoginModalOpen(true)}
              aria-label="Login"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          <button
            className="wishlist-btn"
            onClick={() => setCurrentPage('wishlist')}
            aria-label="Wishlist"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {getWishlistCount() > 0 && (
              <span className="wishlist-count">{getWishlistCount()}</span>
            )}
          </button>
          
          <button
            className="cart-btn"
            onClick={() => setCurrentPage('cart')}
            aria-label="Shopping bag"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <div className="mobile-nav-section">
              <h4>WOMAN</h4>
              <button onClick={() => handleCategoryClick('women', 'shirts')}>SHIRTS | BLOUSES</button>
              <button onClick={() => handleCategoryClick('women', 'jeans')}>JEANS</button>
              <button onClick={() => handleCategoryClick('women', 'dresses')}>DRESSES</button>
              <button onClick={() => handleCategoryClick('women', 'blazers')}>BLAZERS</button>
              <button onClick={() => handleCategoryClick('women', 'knitwear')}>KNITWEAR</button>
            </div>
            
            <div className="mobile-nav-section">
              <h4>MAN</h4>
              <button onClick={() => handleCategoryClick('men', 'shirts')}>SHIRTS</button>
              <button onClick={() => handleCategoryClick('men', 'jeans')}>JEANS</button>
              <button onClick={() => handleCategoryClick('men', 'pants')}>PANTS</button>
              <button onClick={() => handleCategoryClick('men', 'polos')}>POLO SHIRTS</button>
            </div>

            <div className="mobile-nav-section">
              <h4>BOY</h4>
              <button onClick={() => handleCategoryClick('boy', 'tshirts')}>T-SHIRTS</button>
              <button onClick={() => handleCategoryClick('boy', 'shorts')}>SHORTS</button>
              <button onClick={() => handleCategoryClick('boy', 'polos')}>POLO SHIRTS</button>
              <button onClick={() => handleCategoryClick('boy', 'sweatshirts')}>SWEATSHIRTS</button>
            </div>
            
            <button onClick={() => { 
              setSelectedCategory('all');
              setCurrentPage('sale'); 
              setIsMenuOpen(false); 
            }}>SALE</button>
          </nav>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Product, colour, collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setCurrentPage('products');
                setIsSearchOpen(false);
              }
            }}
            autoFocus
          />
          <button
            className="search-close"
            onClick={() => setIsSearchOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
};

// Enhanced Hero Section Component with new slides
const HeroSection = () => {
  const { setCurrentPage, setSelectedCategory, setSelectedSubcategory } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
      title: "NEW COLLECTION",
      subtitle: "Discover our latest minimalist designs",
      cta: "Shop Woman",
      action: () => {
        setSelectedCategory('women');
        setSelectedSubcategory('all');
        setCurrentPage('products');
      }
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
      title: "MAN COLLECTION",
      subtitle: "Discover the latest trends for men",
      cta: "Shop Man",
      action: () => {
        setSelectedCategory('men');
        setSelectedSubcategory('all');
        setCurrentPage('products');
      }
    },
    {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=800&fit=crop",
      title: "BOY COLLECTION",
      subtitle: "Cool looks for boys",
      cta: "Shop Boy",
      action: () => {
        setSelectedCategory('boy');
        setSelectedSubcategory('all');
        setCurrentPage('products');
      }
    },
    {
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=800&fit=crop",
      title: "SALE",
      subtitle: "Up to 50% off selected items",
      cta: "Shop Sale",
      action: () => {
        setSelectedCategory('all');
        setSelectedSubcategory('all');
        setCurrentPage('sale');
      }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="hero-content">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="hero-image">
              <img src={slide.image} alt={slide.title} />
              <div className="hero-overlay">
                <div className="hero-text">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <button className="hero-btn" onClick={slide.action}>
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      {/* Hero Features */}
      <div className="hero-features">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h3>FREE SHIPPING</h3>
          <p>On orders over ₹1,999</p>
        </div>
        <div className="feature">
          <span className="feature-icon">↩️</span>
          <h3>EASY RETURNS</h3>
          <p>30-day return policy</p>
        </div>
        <div className="feature">
          <span className="feature-icon">⭐</span>
          <h3>PREMIUM QUALITY</h3>
          <p>Finest materials</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💬</span>
          <h3>24/7 SUPPORT</h3>
          <p>Customer service</p>
        </div>
      </div>
    </section>
  );
};

// Sale Banner Component
const SaleBanner = () => {
  return (
    <div className="sale-banner">
      <div className="sale-banner-content">
        <h2>SALE</h2>
        <p>UP TO 50% OFF</p>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
    setCurrentPage,
    setSelectedProduct
  } = useShop();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Black");
  const [imageIndex, setImageIndex] = useState(0);

  const isInWishlist = wishlistItems[product.id];

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id, selectedSize, selectedColor);
  };

  const handleProductClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image-container">
        <img
          src={product.images?.[imageIndex] || product.image}
          alt={product.name}
          className="product-image"
          onMouseEnter={() => {
            if (product.images && product.images.length > 1) {
              setImageIndex(1);
            }
          }}
          onMouseLeave={() => setImageIndex(0)}
        />
        
        {/* Wishlist Button */}
        <button
          className={`wishlist-toggle ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist ? "currentColor" : "none"}>
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Quick Add Button */}
        <div className="product-quick-actions">
          <button
            className="quick-add-btn"
            onClick={handleAddToCart}
            aria-label="Add to bag"
          >
            ADD
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          <span className="current-price">₹ {(product.price * 80).toFixed(0)}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹ {(product.originalPrice * 80).toFixed(0)}</span>
          )}
        </div>
        
        {/* Color Options */}
        {product.colors && product.colors.length > 1 && (
          <div className="product-colors">
            <span className="colors-text">{product.colors.length} colours</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Products Grid Component
const ProductsGrid = ({ title, products, showFilters = false }) => {
  const {
    selectedSubcategory,
    setSelectedSubcategory,
    sortBy,
    setSortBy,
    selectedCategory
  } = useShop();

  const getSubcategories = () => {
    switch (selectedCategory) {
      case 'women':
        return [
          { id: 'all', name: 'VIEW ALL' },
          { id: 'shirts', name: 'SHIRTS | BLOUSES' },
          { id: 'jeans', name: 'JEANS' },
          { id: 'dresses', name: 'DRESSES' },
          { id: 'blazers', name: 'BLAZERS' },
          { id: 'knitwear', name: 'KNITWEAR' }
        ];
      case 'men':
        return [
          { id: 'all', name: 'VIEW ALL' },
          { id: 'shirts', name: 'SHIRTS' },
          { id: 'jeans', name: 'JEANS' },
          { id: 'pants', name: 'PANTS' },
          { id: 'polos', name: 'POLO SHIRTS' }
        ];
      case 'boy':
        return [
          { id: 'all', name: 'VIEW ALL' },
          { id: 'tshirts', name: 'T-SHIRTS' },
          { id: 'shorts', name: 'SHORTS' },
          { id: 'polos', name: 'POLO SHIRTS' },
          { id: 'sweatshirts', name: 'SWEATSHIRTS' }
        ];
      default:
        return [
          { id: 'all', name: 'VIEW ALL' },
          { id: 'shirts', name: 'SHIRTS' },
          { id: 'jeans', name: 'JEANS' },
          { id: 'dresses', name: 'DRESSES' },
          { id: 'tshirts', name: 'T-SHIRTS' }
        ];
    }
  };

  const subcategories = getSubcategories();

  const sortOptions = [
    { id: 'featured', name: 'RELEVANCE' },
    { id: 'newest', name: 'NEW PRODUCTS' },
    { id: 'price-low', name: 'LOWEST PRICE' },
    { id: 'price-high', name: 'HIGHEST PRICE' }
  ];

  return (
    <section className="products-section">
      {title && (
        <div className="section-header">
          <h1 className="section-title">{title}</h1>
          <p className="product-count">{products.length} Products</p>
        </div>
      )}
      
      {showFilters && (
        <div className="products-filters">
          {/* Category Tabs */}
          <div className="filter-tabs">
            {subcategories.map(subcategory => (
              <button
                key={subcategory.id}
                className={`filter-tab ${selectedSubcategory === subcategory.id ? 'active' : ''}`}
                onClick={() => setSelectedSubcategory(subcategory.id)}
              >
                {subcategory.name}
              </button>
            ))}
          </div>

          {/* Sort Filter */}
          <div className="filter-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <h3>NO PRODUCTS FOUND</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </section>
  );
};

// Home Page Component
const HomePage = () => {
  const { products, setCurrentPage, setSelectedCategory, setSelectedSubcategory, newsletterEmail, setNewsletterEmail, showNotificationMessage } = useShop();
  
  const featuredProducts = products.filter(p => p.isBestseller).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const saleProducts = products.filter(p => p.originalPrice > p.price).slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showNotificationMessage('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    }
  };

  const handleCategoryExplore = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
    setCurrentPage('products');
  };

  return (
    <div className="home-page">
      <HeroSection />
      
      {/* Featured Categories */}
      <section className="categories-section">
        <h2 className="section-title">EXPLORE COLLECTIONS</h2>
        <div className="categories-grid">
          <div className="category-card" onClick={() => handleCategoryExplore('women')}>
            <div className="category-image">
              <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop" alt="Woman Collection" />
              <div className="category-overlay">
                <h3>WOMAN</h3>
                <button className="category-btn">SHOP NOW</button>
              </div>
            </div>
          </div>
          
          <div className="category-card" onClick={() => handleCategoryExplore('men')}>
            <div className="category-image">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop" alt="Man Collection" />
              <div className="category-overlay">
                <h3>MAN</h3>
                <button className="category-btn">SHOP NOW</button>
              </div>
            </div>
          </div>
          
          <div className="category-card" onClick={() => handleCategoryExplore('boy')}>
            <div className="category-image">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop" alt="Boy Collection" />
              <div className="category-overlay">
                <h3>BOY</h3>
                <button className="category-btn">SHOP NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <ProductsGrid
          title="BESTSELLERS"
          products={featuredProducts}
          showFilters={false}
        />
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="new-arrivals">
          <h2 className="section-title">NEW IN</h2>
          <div className="products-grid">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section className="sale-section">
          <div className="sale-header">
            <h2 className="section-title">SALE</h2>
            <button 
              className="view-all-btn"
              onClick={() => setCurrentPage('sale')}
            >
              VIEW ALL
            </button>
          </div>
          <div className="products-grid">
                       {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>NEWSLETTER</h2>
          <p>Be the first to know about new collections and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </section>
    </div>
  );
};

// Products Page Component
const ProductsPage = () => {
  const { getFilteredProducts, selectedCategory } = useShop();
  
  const products = getFilteredProducts();
  
  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'women':
        return 'WOMAN';
      case 'men':
        return 'MAN';
      case 'boy':
        return 'BOY';
      default:
        return 'ALL PRODUCTS';
    }
  };

  return (
    <div className="products-page">
      <ProductsGrid
        title={getCategoryTitle()}
        products={products}
        showFilters={true}
      />
    </div>
  );
};

// Sale Page Component
const SalePage = () => {
  const { products, getFilteredProducts } = useShop();
  
  const saleProducts = getFilteredProducts().filter(product => 
    product.originalPrice > product.price
  );

  return (
    <div className="sale-page">
      <SaleBanner />
      <ProductsGrid
        title="SALE"
        products={saleProducts}
        showFilters={true}
      />
    </div>
  );
};

// Product Detail Component
const ProductDetail = () => {
  const { selectedProduct, addToCart, addToWishlist, wishlistItems } = useShop();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
        setSelectedSize(selectedProduct.sizes[0]);
      }
      if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        setSelectedColor(selectedProduct.colors);
      }
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="page-content">
        <h2>PRODUCT NOT FOUND</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(selectedProduct.id, selectedSize, selectedColor);
    }
  };

  const isInWishlist = wishlistItems[selectedProduct.id];

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="product-images">
          <div className="main-image">
            <img
              src={selectedProduct.images?.[selectedImageIndex] || selectedProduct.image}
              alt={selectedProduct.name}
            />
          </div>
          {selectedProduct.images && selectedProduct.images.length > 1 && (
            <div className="thumbnail-images">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProduct.name} ${index + 1}`}
                  className={selectedImageIndex === index ? 'active' : ''}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1>{selectedProduct.name}</h1>
          
          <div className="product-price">
            <span className="current-price">₹ {(selectedProduct.price * 80).toFixed(0)}</span>
            {selectedProduct.originalPrice > selectedProduct.price && (
              <>
                <span className="original-price">₹ {(selectedProduct.originalPrice * 80).toFixed(0)}</span>
                <span className="discount-badge">({selectedProduct.discount}% OFF)</span>
              </>
            )}
          </div>

          <p className="product-description">{selectedProduct.description}</p>

          <div className="product-details">
            <div className="detail-item">
              <span className="detail-label">COMPOSITION</span>
              <span className="detail-value">{selectedProduct.material}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">CARE</span>
              <span className="detail-value">{selectedProduct.care}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">SKU</span>
              <span className="detail-value">{selectedProduct.sku}</span>
            </div>
          </div>

          {/* Size Selection */}
          {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
            <div className="size-selection">
              <h4>SIZE</h4>
              <div className="size-options">
                {selectedProduct.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="size-guide-btn">SIZE GUIDE</button>
            </div>
          )}

          {/* Color Selection */}
          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div className="color-selection">
              <h4>COLOUR</h4>
              <div className="color-options">
                {selectedProduct.colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-actions">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              ADD TO BAG
            </button>
            <button
              className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
              onClick={() => addToWishlist(selectedProduct.id)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist ? "currentColor" : "none"}>
                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Page Component
const WishlistPage = () => {
  const { 
    wishlistItems, 
    products, 
    removeFromWishlist, 
    addToCart, 
    setCurrentPage,
    setSelectedProduct,
    currentUser,
    setIsLoginModalOpen
  } = useShop();

  if (!currentUser) {
    return (
      <div className="page-content">
        <div className="auth-required">
          <h2>LOG IN TO ACCESS YOUR WISHLIST</h2>
          <p>Log in to save your favourite items and access them from any device.</p>
          <button 
            className="auth-btn"
            onClick={() => setIsLoginModalOpen(true)}
          >
            LOG IN
          </button>
        </div>
      </div>
    );
  }

  const wishlistProducts = products.filter(product => wishlistItems[product.id]);

  if (wishlistProducts.length === 0) {
    return (
      <div className="page-content">
        <div className="empty-wishlist">
          <h2>YOUR WISHLIST IS EMPTY</h2>
          <p>Save your favourite items so you don't lose sight of them.</p>
          <button 
            className="shop-btn"
            onClick={() => setCurrentPage('home')}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1>WISHLIST</h1>
        <p>{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="wishlist-grid">
        {wishlistProducts.map(product => (
          <div key={product.id} className="wishlist-item">
            <div className="wishlist-item-image" onClick={() => {
              setSelectedProduct(product);
              setCurrentPage('product-detail');
            }}>
              <img src={product.image} alt={product.name} />
              <button 
                className="remove-wishlist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="wishlist-item-info">
              <h3>{product.name}</h3>
              <div className="wishlist-item-price">
                <span className="current-price">₹ {(product.price * 80).toFixed(0)}</span>
                {product.originalPrice > product.price && (
                  <span className="original-price">₹ {(product.originalPrice * 80).toFixed(0)}</span>
                )}
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product.id)}
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Cart Component
const Cart = () => {
  const {
    cartItems,
    products,
    removeFromCart,
    addToCart,
    clearCart,
    getCartTotal,
    setCurrentPage
  } = useShop();

  const cartProducts = [];
  for (const key in cartItems) {
    const [productId, size, color] = key.split('-');
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      cartProducts.push({
        ...product,
        size,
        color,
        quantity: cartItems[key],
        key
      });
    }
  }

  if (cartProducts.length === 0) {
    return (
      <div className="cart-empty">
        <h2>YOUR BAG IS EMPTY</h2>
        <p>Items in your bag are not reserved. Complete your purchase now to make them yours.</p>
        <button onClick={() => setCurrentPage('home')}>CONTINUE SHOPPING</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>BAG</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartProducts.map(item => (
            <div key={item.key} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>₹ {(item.price * 80).toFixed(0)}</p>
                <p>{item.color} | {item.size}</p>
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(item.id, item.size, item.color)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item.id, item.size, item.color)}>+</button>
                </div>
              </div>
              <div className="cart-item-price">
                <span>₹ {(item.price * item.quantity * 80).toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-line">
            <span>SUBTOTAL</span>
            <span>₹ {(getCartTotal() * 80).toFixed(0)}</span>
          </div>
          <div className="summary-line">
            <span>SHIPPING</span>
            <span>FREE</span>
          </div>
          <div className="summary-line total">
            <span>TOTAL</span>
            <span>₹ {(getCartTotal() * 80).toFixed(0)}</span>
          </div>
          <button className="checkout-btn">
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  const { setCurrentPage, setSelectedCategory, setSelectedSubcategory, newsletterEmail, setNewsletterEmail, showNotificationMessage } = useShop();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showNotificationMessage('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    }
  };

  const handleCategoryClick = (category, subcategory = 'all') => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setCurrentPage('products');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>WOMAN</h3>
          <ul>
            <li><button onClick={() => handleCategoryClick('women', 'shirts')}>Shirts | Blouses</button></li>
            <li><button onClick={() => handleCategoryClick('women', 'jeans')}>Jeans</button></li>
            <li><button onClick={() => handleCategoryClick('women', 'dresses')}>Dresses</button></li>
            <li><button onClick={() => handleCategoryClick('women', 'blazers')}>Blazers</button></li>
            <li><button onClick={() => handleCategoryClick('women', 'knitwear')}>Knitwear</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>MAN</h3>
          <ul>
            <li><button onClick={() => handleCategoryClick('men', 'shirts')}>Shirts</button></li>
            <li><button onClick={() => handleCategoryClick('men', 'jeans')}>Jeans</button></li>
            <li><button onClick={() => handleCategoryClick('men', 'pants')}>Pants</button></li>
            <li><button onClick={() => handleCategoryClick('men', 'polos')}>Polo Shirts</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>BOY</h3>
          <ul>
            <li><button onClick={() => handleCategoryClick('boy', 'tshirts')}>T-Shirts</button></li>
            <li><button onClick={() => handleCategoryClick('boy', 'shorts')}>Shorts</button></li>
            <li><button onClick={() => handleCategoryClick('boy', 'polos')}>Polo Shirts</button></li>
            <li><button onClick={() => handleCategoryClick('boy', 'sweatshirts')}>Sweatshirts</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>HELP</h3>
          <ul>
            <li><button>Size Guide</button></li>
            <li><button>Care Instructions</button></li>
            <li><button>Shipping Info</button></li>
            <li><button>Returns</button></li>
            <li><button>Contact Us</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>COMPANY</h3>
          <ul>
            <li><button>About Us</button></li>
            <li><button>Careers</button></li>
            <li><button>Press</button></li>
            <li><button>Privacy Policy</button></li>
            <li><button>Terms & Conditions</button></li>
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h3>NEWSLETTER</h3>
          <p>Be the first to know about new collections and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
          
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">📺</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <h2>MONOMART</h2>
        </div>
        <div className="footer-bottom-links">
          <span>© 2025 MONOMART. All rights reserved.</span>
          <div className="payment-methods">
            <span>💳 💰 📱 🏧</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Notification Component
const Notification = () => {
  const { showNotification, notificationMessage } = useShop();

  if (!showNotification) return null;

  return (
    <div className="notification">
      <p>{notificationMessage}</p>
    </div>
  );
};

// Main App Component
const App = () => {
  const { currentPage } = useShop();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'sale':
        return <SalePage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <Cart />;
      case 'product-detail':
        return <ProductDetail />;
      default:
        return (
          <div className="page-content">
            <h1>PAGE UNDER CONSTRUCTION</h1>
            <p>This page is being built. Please check back soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      <LoginModal />
      <SignupModal />
      <Chatbot />
      <Notification />
    </div>
  );
};

// Root App with Context Provider
const RootApp = () => {
  return (
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  );
};

export default RootApp;
