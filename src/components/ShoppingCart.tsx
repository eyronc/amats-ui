import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckoutModal } from './CheckoutModal';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart as CartIcon,
  CreditCard,
  Truck,
  Shield
} from 'lucide-react';

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
}

interface CartItem {
  product: Product;
  quantity: number;
  variant?: any;
}

interface ShoppingCartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number, variant?: any) => void;
  currency?: {
    symbol: string;
    rate: number;
    code: string;
  };
}

export function ShoppingCart({ items, onClose, onUpdateQuantity, currency = { symbol: '$', rate: 1, code: 'USD' } }: ShoppingCartProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (usdPrice: number) => {
    const convertedPrice = usdPrice * currency.rate;
    if (currency.code === 'JPY' || currency.code === 'KRW') {
      return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * currency.rate * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleOrderComplete = (orderData: any) => {
    // Clear cart after successful order
    items.forEach(item => {
      onUpdateQuantity(item.product.id, 0, item.variant);
    });
    
    setShowCheckout(false);
    onClose();
  };

  const freeShippingThreshold = 200 * currency.rate;
  const shippingCost = 9.99 * currency.rate;
  const taxRate = 0.08;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-end">
        <div className="w-full max-w-md h-full bg-background shadow-xl animate-slide-in">
          <Card className="h-full flex flex-col border-0 rounded-none">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-manrope">
                  <CartIcon className="h-5 w-5" />
                  Shopping Cart ({getTotalItems()})
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-0">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <CartIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2 font-manrope">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4 font-inter">
                    Add some safety equipment to get started
                  </p>
                  <Button onClick={onClose} className="font-manrope">Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="p-4 border-b">
                      <div className="flex space-x-3">
                        {/* Product Image Placeholder */}
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          {item.product.category === 'helmets' && <Shield className="h-8 w-8 text-gray-400" />}
                          {item.product.category === 'cameras' && <CartIcon className="h-8 w-8 text-gray-400" />}
                          {item.product.category === 'fleet' && <Truck className="h-8 w-8 text-gray-400" />}
                          {item.product.category === 'wearables' && <Shield className="h-8 w-8 text-gray-400" />}
                          {item.product.category === 'sensors' && <Shield className="h-8 w-8 text-gray-400" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate font-manrope">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 font-inter">
                            {item.product.description}
                          </p>
                          
                          {/* Variant Info */}
                          {item.variant && Object.keys(item.variant).length > 0 && (
                            <div className="mt-1">
                              <p className="text-xs text-muted-foreground font-mono">
                                {Object.entries(item.variant)
                                  .filter(([_, value]) => value)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(', ')}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-green-600 font-manrope">
                                {formatPrice(item.product.price)}
                              </span>
                              {item.product.originalPrice && (
                                <span className="text-xs line-through text-muted-foreground font-mono">
                                  {formatPrice(item.product.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.variant)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center font-mono">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.variant)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="mt-1">
                            <span className="text-sm font-medium font-manrope">
                              Total: {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                {/* Shipping Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-muted-foreground font-inter">Free shipping on orders over {formatPrice(200)}</span>
                  </div>
                  {getTotalPrice() >= freeShippingThreshold && (
                    <Badge variant="default" className="bg-green-600 font-mono">Free</Badge>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-inter">
                    <span>Subtotal</span>
                    <span className="font-mono">{currency.symbol}{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-inter">
                    <span>Shipping</span>
                    <span className="font-mono">{getTotalPrice() >= freeShippingThreshold ? 'Free' : currency.symbol + shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-inter">
                    <span>Tax</span>
                    <span className="font-mono">{currency.symbol}{(getTotalPrice() * taxRate).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold font-manrope">
                      <span>Total</span>
                      <span className="text-lg text-green-600 font-mono">
                        {currency.symbol}{(getTotalPrice() + (getTotalPrice() >= freeShippingThreshold ? 0 : shippingCost) + (getTotalPrice() * taxRate)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 font-manrope"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span className="font-inter">Secure checkout with 256-bit SSL encryption</span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={items}
        currency={currency}
        onOrderComplete={handleOrderComplete}
      />
    </>
  );
}