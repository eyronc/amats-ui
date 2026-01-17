import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { 
  Star, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check,
  X,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
  specifications?: { [key: string]: string };
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant: any) => void;
  currency: { symbol: string; rate: number; code: string };
}

export function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  currency 
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const formatPrice = (usdPrice: number) => {
    const convertedPrice = usdPrice * currency.rate;
    if (currency.code === 'JPY' || currency.code === 'KRW') {
      return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    const variant = {
      size: selectedSize,
      color: selectedColor,
      design: selectedDesign
    };
    
    onAddToCart(product, quantity, variant);
    
    // Trigger success notification
    const event = new CustomEvent('show-notification', {
      detail: {
        type: 'success',
        title: 'Added to Cart',
        message: `${product.name} has been added to your cart.`,
        duration: 3000
      }
    });
    document.dispatchEvent(event);
    
    onClose();
  };

  const canAddToCart = () => {
    if (!product.inStock) return false;
    
    // Check if required variants are selected
    if (product.variants?.sizes && product.variants.sizes.length > 0 && !selectedSize) return false;
    if (product.variants?.colors && product.variants.colors.length > 0 && !selectedColor) return false;
    if (product.variants?.designs && product.variants.designs.length > 0 && !selectedDesign) return false;
    
    return true;
  };

  const productImages = [
    product.image,
    // Add more product images here
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto font-inter">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <ImageWithFallback
                src={productImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold font-manrope">{product.name}</h2>
                  <Badge variant="outline" className="mt-1">{product.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
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
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold text-green-600 font-manrope">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg line-through text-muted-foreground">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.inStock ? (
                  <Badge variant="default" className="bg-green-600">
                    <Check className="h-3 w-3 mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <X className="h-3 w-3 mr-1" />
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="font-semibold mb-2 font-manrope">Description</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            {/* Product Variants */}
            {product.variants && (
              <div className="space-y-4">
                {/* Size Selection */}
                {product.variants.sizes && product.variants.sizes.length > 0 && (
                  <div>
                    <label className="text-sm font-medium font-manrope">Size *</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Color Selection */}
                {product.variants.colors && product.variants.colors.length > 0 && (
                  <div>
                    <label className="text-sm font-medium font-manrope">Color *</label>
                    <div className="mt-1 flex gap-2">
                      {product.variants.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-2 border rounded-md text-sm transition-colors ${
                            selectedColor === color
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Design Selection */}
                {product.variants.designs && product.variants.designs.length > 0 && (
                  <div>
                    <label className="text-sm font-medium font-manrope">Design *</label>
                    <Select value={selectedDesign} onValueChange={setSelectedDesign}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select design" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.designs.map((design) => (
                          <SelectItem key={design} value={design}>
                            {design}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <label className="text-sm font-medium font-manrope">Quantity</label>
              <div className="mt-1 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border rounded-md min-w-[60px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-2 font-manrope">Key Features</h3>
              <div className="space-y-1">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">2-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">30-day return policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!canAddToCart()}
              className="w-full font-manrope"
              size="lg"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {!product.inStock ? 'Out of Stock' : 
               !canAddToCart() ? 'Please select options above' : 
               `Add to Cart - ${formatPrice(product.price * quantity)}`}
            </Button>

            {!canAddToCart() && product.inStock && (
              <p className="text-sm text-red-500 text-center">
                Please select all required options before adding to cart
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}