import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Star, 
  Eye,
  Shield,
  Camera,
  Headphones,
  Activity,
  Zap,
  Truck,
  Users,
  Plus,
  Minus,
  Check,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown
} from 'lucide-react';
import { ShoppingCart as Cart } from './ShoppingCart';
import { ProductDetailModal } from './ProductDetailModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ShopViewProps {
  userType: 'driver' | 'fleet_manager' | 'admin';
  user?: {
    country?: string;
  };
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  compatibility: string[];
  variants?: {
    sizes?: string[];
    colors?: string[];
    designs?: string[];
  };
}

interface CartItem {
  product: Product;
  quantity: number;
  variant?: any;
}

export function ShopView({ userType, user }: ShopViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Currency conversion based on user's country
  const getCurrencyInfo = () => {
    const country = user?.country || 'Philippines';
    
    switch (country) {
      case 'United States':
        return { symbol: '$', rate: 1, code: 'USD' };
      case 'Philippines':
        return { symbol: '₱', rate: 56, code: 'PHP' };
      case 'United Kingdom':
        return { symbol: '£', rate: 0.79, code: 'GBP' };
      case 'Canada':
        return { symbol: 'C$', rate: 1.35, code: 'CAD' };
      case 'Australia':
        return { symbol: 'A$', rate: 1.52, code: 'AUD' };
      case 'Germany':
      case 'France':
      case 'Spain':
      case 'Italy':
        return { symbol: '€', rate: 0.93, code: 'EUR' };
      case 'Japan':
        return { symbol: '¥', rate: 148, code: 'JPY' };
      case 'South Korea':
        return { symbol: '₩', rate: 1320, code: 'KRW' };
      case 'China':
        return { symbol: '¥', rate: 7.24, code: 'CNY' };
      case 'India':
        return { symbol: '₹', rate: 83, code: 'INR' };
      case 'Brazil':
        return { symbol: 'R$', rate: 5.1, code: 'BRL' };
      case 'Mexico':
        return { symbol: '$', rate: 17.5, code: 'MXN' };
      default:
        return { symbol: '₱', rate: 56, code: 'PHP' };
    }
  };

  const currency = getCurrencyInfo();

  const formatPrice = (usdPrice: number) => {
    const convertedPrice = usdPrice * currency.rate;
    if (currency.code === 'JPY' || currency.code === 'KRW') {
      return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const products: Product[] = [
    // Affordable Products (Under $50)
    {
      id: 1,
      name: "Basic Alertness Monitor",
      price: 19.99,
      originalPrice: 29.99,
      description: "Simple wearable device that vibrates when it detects signs of drowsiness through movement patterns.",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZSUyMGZpdG5lc3MlMjB0cmFja2VyJTIwc2ltcGxlfGVufDF8fHx8MTc1NzkxNzAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "wearables",
      rating: 4.2,
      reviews: 89,
      inStock: true,
      features: ["Motion detection", "Vibration alerts", "7-day battery", "Water resistant"],
      compatibility: ["Universal", "No app required"],
      variants: {
        colors: ["Black", "Blue", "Red"]
      }
    },
    {
      id: 2,
      name: "Smartphone Dashboard Mount",
      price: 24.99,
      description: "Secure mount that positions your phone optimally for using drowsiness detection apps.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBwaG9uZSUyMG1vdW50JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NzkxNzAyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "accessories",
      rating: 4.5,
      reviews: 156,
      inStock: true,
      features: ["360° rotation", "Secure grip", "Easy installation", "Cable management"],
      compatibility: ["All smartphones", "Universal fit"]
    },
    {
      id: 3,
      name: "Caffeine Alert Pills",
      price: 12.99,
      originalPrice: 18.99,
      description: "Natural caffeine supplements designed specifically for drivers to maintain alertness during long drives.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZmZWluZSUyMHBpbGxzJTIwc3VwcGxlbWVudHxlbnwxfHx8fDE3NTc5MTcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "supplements",
      rating: 4.3,
      reviews: 234,
      inStock: true,
      features: ["Natural caffeine", "60 tablets", "Quick absorption", "No crash"],
      compatibility: ["Adult drivers", "FDA approved"]
    },
    {
      id: 4,
      name: "Anti-Fatigue Car Seat Cushion",
      price: 39.99,
      originalPrice: 59.99,
      description: "Ergonomic seat cushion that reduces fatigue and promotes better posture during long drives.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzZWF0JTIwY3VzaGlvbiUyMGVyZ29ub21pY3xlbnwxfHx8fDE3NTc5MTcwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "accessories",
      rating: 4.6,
      reviews: 78,
      inStock: true,
      features: ["Memory foam", "Breathable cover", "Non-slip base", "Washable"],
      compatibility: ["Most car seats", "Universal design"],
      variants: {
        colors: ["Black", "Gray", "Navy Blue"]
      }
    },
    {
      id: 5,
      name: "LED Driver Alert Stickers",
      price: 8.99,
      description: "Reflective stickers with safety messages to remind drivers to stay alert. Pack of 10.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZsZWN0aXZlJTIwc3RpY2tlcnMlMjBzYWZldHl8ZW58MXx8fHwxNzU3OTE3MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "accessories",
      rating: 4.1,
      reviews: 45,
      inStock: true,
      features: ["Reflective material", "Pack of 10", "Weather resistant", "Easy application"],
      compatibility: ["Any vehicle", "Interior use"]
    },

    // Mid-range Products ($50-$200)
    {
      id: 6,
      name: "Wearable Safety Monitor",
      price: 89.99,
      originalPrice: 119.99,
      description: "Lightweight wearable device that monitors heart rate, fatigue levels, and driving patterns.",
      image: "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZSUyMGZpdG5lc3MlMjB0cmFja2VyJTIwc21hcnR3YXRjaHxlbnwxfHx8fDE3NTc5MTA0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "wearables",
      rating: 4.5,
      reviews: 156,
      inStock: true,
      features: ["Heart rate monitoring", "Fatigue detection", "7-day battery", "Water resistant"],
      compatibility: ["Android", "iOS", "Bluetooth 5.0"],
      variants: {
        sizes: ["Small", "Medium", "Large"],
        colors: ["Black", "Blue", "Silver"]
      }
    },
    {
      id: 7,
      name: "Smart Steering Wheel Sensor",
      price: 149.99,
      description: "Easy-install sensor that monitors grip patterns and detects microsleep episodes.",
      image: "https://images.unsplash.com/photo-1669428816362-6861f9bde8b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlcmluZyUyMHdoZWVsJTIwc2Vuc29yJTIwYXV0b21vdGl2ZXxlbnwxfHx8fDE3NTc5MTA0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "sensors",
      rating: 4.6,
      reviews: 78,
      inStock: false,
      features: ["Grip monitoring", "Microsleep detection", "Easy installation", "Universal fit"],
      compatibility: ["Most vehicle types", "Wireless connectivity"]
    },
    {
      id: 8,
      name: "In-Cabin Air Quality Monitor",
      price: 179.99,
      description: "Monitors CO2 levels and air quality that can affect driver alertness and performance.",
      image: "https://images.unsplash.com/photo-1746972031349-2e5f03db92c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBxdWFsaXR5JTIwbW9uaXRvciUyMGRldmljZXxlbnwxfHx8fDE3NTc5MTA0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "sensors",
      rating: 4.4,
      reviews: 34,
      inStock: true,
      features: ["CO2 monitoring", "Temperature tracking", "Humidity sensors", "Mobile alerts"],
      compatibility: ["12V power", "Mobile app", "Cloud dashboard"]
    },
    {
      id: 9,
      name: "AI Dashboard Camera Pro",
      price: 199.99,
      description: "Professional-grade dashboard camera with AI-powered driver monitoring and night vision.",
      image: "https://images.unsplash.com/photo-1716242290936-b129003ec151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBjYW1lcmElMjBjYXIlMjBtb25pdG9yaW5nfGVufDF8fHx8MTc1NzkxMDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "cameras",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      features: ["4K recording", "Night vision", "AI detection", "Cloud storage"],
      compatibility: ["12V/24V vehicles", "A.M.A.T.S. System"],
      variants: {
        designs: ["Standard Mount", "Windshield Mount", "Mirror Mount"]
      }
    },

    // Premium Products ($200+)
    {
      id: 10,
      name: "Smart Driver Monitoring Helmet",
      price: 299.99,
      originalPrice: 399.99,
      description: "Advanced helmet with built-in drowsiness detection sensors, eye tracking, and real-time alerts.",
      image: "https://images.unsplash.com/photo-1627636784051-6f3aa82b4801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhlbG1ldCUyMHNhZmV0eSUyMG1vbml0b3Jpbmd8ZW58MXx8fHwxNzU3OTEwNDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "helmets",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      features: ["Eye tracking sensors", "Vibration alerts", "Bluetooth connectivity", "8-hour battery"],
      compatibility: ["Android", "iOS", "A.M.A.T.S. System"],
      variants: {
        sizes: ["Small", "Medium", "Large", "X-Large"],
        colors: ["Black", "White", "Safety Yellow", "Red"],
        designs: ["Standard", "Professional", "Construction", "Emergency"]
      }
    },
    {
      id: 11,
      name: "Fleet Management Hub",
      price: 1299.99,
      description: "Complete fleet monitoring solution with real-time tracking and driver safety analytics.",
      image: "https://images.unsplash.com/photo-1635340038191-96eea7fbd056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGVldCUyMG1hbmFnZW1lbnQlMjBjb250cm9sJTIwY2VudGVyfGVufDF8fHx8MTc1NzkxMDQ1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "fleet",
      rating: 4.9,
      reviews: 45,
      inStock: true,
      features: ["Multi-vehicle monitoring", "Real-time alerts", "Analytics dashboard", "API integration"],
      compatibility: ["Up to 100 vehicles", "Web & Mobile app"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Activity },
    { id: 'accessories', name: 'Accessories', icon: Shield },
    { id: 'wearables', name: 'Wearables', icon: Activity },
    { id: 'sensors', name: 'Sensors', icon: Zap },
    { id: 'cameras', name: 'Cameras', icon: Camera },
    { id: 'helmets', name: 'Smart Helmets', icon: Shield },
    { id: 'fleet', name: 'Fleet Solutions', icon: Truck },
    { id: 'supplements', name: 'Supplements', icon: Users }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices', min: 0, max: Infinity },
    { id: 'under-25', name: 'Under $25', min: 0, max: 25 },
    { id: '25-50', name: '$25 - $50', min: 25, max: 50 },
    { id: '50-100', name: '$50 - $100', min: 50, max: 100 },
    { id: '100-300', name: '$100 - $300', min: 100, max: 300 },
    { id: 'over-300', name: 'Over $300', min: 300, max: Infinity },
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const selectedPriceRange = priceRanges.find(range => range.id === priceRange);
    const matchesPrice = !selectedPriceRange || 
                        (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const addToCart = (product: Product, quantity: number = 1, variant: any = {}) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );
      
      if (existingItemIndex > -1) {
        return prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, variant }];
    });
  };

  const updateQuantity = (productId: number, quantity: number, variant: any = {}) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => 
        !(item.product.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
      ));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * currency.rate * item.quantity), 0);
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold font-manrope tracking-tight">Safety Equipment Shop</h1>
          <p className="text-lg text-muted-foreground mt-2 font-inter">
            Professional driver safety monitoring equipment and solutions
          </p>
          {user?.country && (
            <p className="text-sm text-muted-foreground mt-1 font-mono">
              Prices shown in {currency.code} for {user.country}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setShowCart(true)}
            className="flex items-center space-x-2 font-manrope"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart ({getTotalItems()})</span>
            {getTotalItems() > 0 && (
              <Badge variant="destructive" className="ml-1">
                {currency.symbol}{getTotalPrice().toFixed(2)}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base font-inter border-2 focus:border-primary"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-manrope">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="font-manrope">Price Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {priceRanges.map((range) => (
                  <DropdownMenuItem
                    key={range.id}
                    onClick={() => setPriceRange(range.id)}
                    className={priceRange === range.id ? 'bg-accent' : ''}
                  >
                    {range.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] font-manrope">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2 whitespace-nowrap font-manrope"
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={`${viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
        : 'space-y-4'}`}>
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className={`overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/50 ${
              viewMode === 'list' ? 'flex flex-row' : 'h-full flex flex-col'
            }`}
            onClick={() => handleProductClick(product)}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
              {/* Product Image */}
              <div className={`overflow-hidden ${viewMode === 'list' ? 'h-full' : 'h-48'}`}>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {product.originalPrice && (
                  <Badge variant="destructive" className="text-xs font-mono">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="secondary" className="text-xs font-mono">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : 'flex-1 flex flex-col'}`}>
              <div className={`space-y-3 ${viewMode === 'list' ? '' : 'flex-1 flex flex-col'}`}>
                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-lg font-manrope hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 font-inter">
                    {product.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Features */}
                <div className={viewMode === 'list' ? '' : 'flex-1'}>
                  <p className="text-xs font-medium text-muted-foreground mb-1 font-inter">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-mono">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 2 && (
                      <Badge variant="outline" className="text-xs font-mono">
                        +{product.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className={`flex items-center justify-between pt-2 mt-auto ${viewMode === 'list' ? 'flex-col items-start gap-2' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-green-600 font-manrope">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm line-through text-muted-foreground font-mono">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                    disabled={!product.inStock}
                    className="flex items-center space-x-2 font-manrope"
                    size={viewMode === 'list' ? 'sm' : 'default'}
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 font-manrope">No products found</h3>
          <p className="text-muted-foreground font-inter">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddToCart={addToCart}
        currency={currency}
      />

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <Cart
          items={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          currency={currency}
        />
      )}
    </div>
  );
}