import React, { useState } from 'react';
import { purchaseTracker, Purchase } from './PurchaseTracker';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Shield,
  Check,
  Gift,
  Percent,
  Wallet,
  Banknote,
  Building,
  Clock
} from 'lucide-react';

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  variant?: any;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: { symbol: string; rate: number; code: string };
  onOrderComplete: (orderData: any) => void;
}

export function CheckoutModal({ isOpen, onClose, items, currency, onOrderComplete }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Philippines'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    number: '4532 1234 5678 9010',
    expiry: '12/25',
    cvv: '123',
    name: 'John Doe'
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const formatPrice = (usdPrice: number) => {
    const convertedPrice = usdPrice * currency.rate;
    if (currency.code === 'JPY' || currency.code === 'KRW') {
      return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 0 },
    { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 15 },
    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 35 },
  ];

  const selectedShipping = shippingOptions.find(option => option.id === shippingMethod);
  const shippingCost = selectedShipping?.price || 0;

  const vouchers = [
    { code: 'WELCOME10', discount: 0.1, type: 'percentage', description: '10% off your first order' },
    { code: 'SAVE50', discount: 50, type: 'fixed', description: '$50 off orders over $300' },
    { code: 'FREESHIP', discount: 0, type: 'free_shipping', description: 'Free shipping' },
  ];

  const applyVoucher = () => {
    const voucher = vouchers.find(v => v.code.toLowerCase() === voucherCode.toLowerCase());
    if (voucher) {
      setAppliedVoucher(voucher);
      // Trigger success notification
      const event = new CustomEvent('show-notification', {
        detail: {
          type: 'success',
          title: 'Voucher Applied',
          message: `${voucher.description} has been applied to your order.`,
          duration: 3000
        }
      });
      document.dispatchEvent(event);
    } else {
      // Trigger error notification
      const event = new CustomEvent('show-notification', {
        detail: {
          type: 'error',
          title: 'Invalid Voucher',
          message: 'The voucher code you entered is not valid.',
          duration: 3000
        }
      });
      document.dispatchEvent(event);
    }
  };

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    
    if (appliedVoucher.type === 'percentage') {
      return subtotal * appliedVoucher.discount;
    } else if (appliedVoucher.type === 'fixed') {
      return Math.min(appliedVoucher.discount, subtotal);
    }
    return 0;
  };

  const calculateShippingCost = () => {
    if (appliedVoucher?.type === 'free_shipping') return 0;
    return shippingCost;
  };

  const discount = calculateDiscount();
  const finalShippingCost = calculateShippingCost();
  const tax = (subtotal - discount) * 0.1; // 10% tax
  const total = subtotal - discount + finalShippingCost + tax;

  const handlePlaceOrder = () => {
    const orderData = {
      id: `ORDER-${Date.now()}`,
      items,
      shippingInfo,
      paymentMethod,
      shippingMethod: selectedShipping,
      subtotal,
      discount,
      shippingCost: finalShippingCost,
      tax,
      total,
      appliedVoucher,
      specialInstructions,
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };

    // Add each item to the purchase tracker
    items.forEach((item, index) => {
      const purchase: Purchase = {
        id: Date.now() + index,
        userEmail: shippingInfo.email,
        userName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        userType: 'Driver', // This should come from user context
        userCountry: shippingInfo.country,
        productName: item.product.name,
        productPrice: item.product.price,
        quantity: item.quantity,
        totalAmount: item.product.price * item.quantity,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 
                      paymentMethod === 'paypal' ? 'PayPal' : 
                      paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer',
        transactionId: `TXN-${Date.now()}-${index}`,
        purchaseDate: new Date().toISOString().split('T')[0],
        status: 'Completed',
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`
      };
      
      purchaseTracker.addPurchase(purchase);
    });

    onOrderComplete(orderData);

    // Trigger success notification
    const event = new CustomEvent('show-notification', {
      detail: {
        type: 'success',
        title: 'Order Placed Successfully!',
        message: `Your order #${orderData.id} has been confirmed. You will receive an email confirmation shortly.`,
        duration: 5000
      }
    });
    document.dispatchEvent(event);

    onClose();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
            step >= stepNumber ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
          </div>
          {stepNumber < 3 && (
            <div className={`w-8 h-0.5 mx-2 ${
              step > stepNumber ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderShippingStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 font-manrope">Shipping Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="font-inter">First Name</Label>
            <Input
              id="firstName"
              value={shippingInfo.firstName}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="font-inter">Last Name</Label>
            <Input
              id="lastName"
              value={shippingInfo.lastName}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email" className="font-inter">Email</Label>
            <Input
              id="email"
              type="email"
              value={shippingInfo.email}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="phone" className="font-inter">Phone Number</Label>
            <Input
              id="phone"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="address" className="font-inter">Address</Label>
            <Input
              id="address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div>
            <Label htmlFor="city" className="font-inter">City</Label>
            <Input
              id="city"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div>
            <Label htmlFor="state" className="font-inter">State/Province</Label>
            <Input
              id="state"
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div>
            <Label htmlFor="zipCode" className="font-inter">ZIP/Postal Code</Label>
            <Input
              id="zipCode"
              value={shippingInfo.zipCode}
              onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
              className="font-inter"
            />
          </div>
          <div>
            <Label htmlFor="country" className="font-inter">Country</Label>
            <Select value={shippingInfo.country} onValueChange={(value) => setShippingInfo(prev => ({ ...prev, country: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Philippines">Philippines</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 font-manrope">Shipping Method</h3>
        <div className="space-y-3">
          {shippingOptions.map((option) => (
            <Card key={option.id} className={`cursor-pointer transition-colors ${
              shippingMethod === option.id ? 'border-primary bg-primary/5' : ''
            }`} onClick={() => setShippingMethod(option.id)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      shippingMethod === option.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`} />
                    <div>
                      <p className="font-medium font-manrope">{option.name}</p>
                      <p className="text-sm text-muted-foreground font-inter flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {option.time}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold font-mono">
                    {option.price === 0 ? 'FREE' : formatPrice(option.price)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 font-manrope">Payment Method</h3>
        <div className="space-y-3">
          <Card className={`cursor-pointer transition-colors ${
            paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''
          }`} onClick={() => setPaymentMethod('card')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'card' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`} />
                <CreditCard className="h-5 w-5" />
                <span className="font-medium font-manrope">Credit/Debit Card</span>
              </div>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-colors ${
            paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : ''
          }`} onClick={() => setPaymentMethod('paypal')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'paypal' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`} />
                <Wallet className="h-5 w-5" />
                <span className="font-medium font-manrope">PayPal</span>
              </div>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-colors ${
            paymentMethod === 'cash' ? 'border-primary bg-primary/5' : ''
          }`} onClick={() => setPaymentMethod('cash')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'cash' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`} />
                <Banknote className="h-5 w-5" />
                <span className="font-medium font-manrope">Cash on Delivery</span>
              </div>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-colors ${
            paymentMethod === 'bank' ? 'border-primary bg-primary/5' : ''
          }`} onClick={() => setPaymentMethod('bank')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'bank' ? 'border-primary bg-primary' : 'border-muted-foreground'
                }`} />
                <Building className="h-5 w-5" />
                <span className="font-medium font-manrope">Bank Transfer</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div>
          <h4 className="font-semibold mb-3 font-manrope">Card Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="cardNumber" className="font-inter">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardInfo.number}
                onChange={(e) => setCardInfo(prev => ({ ...prev, number: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="expiry" className="font-inter">Expiry Date</Label>
              <Input
                id="expiry"
                value={cardInfo.expiry}
                onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: e.target.value }))}
                placeholder="MM/YY"
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="font-inter">CVV</Label>
              <Input
                id="cvv"
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                placeholder="123"
                className="font-mono"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="cardName" className="font-inter">Cardholder Name</Label>
              <Input
                id="cardName"
                value={cardInfo.name}
                onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                className="font-inter"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <h4 className="font-semibold mb-3 font-manrope">Voucher Code</h4>
        <div className="flex gap-2">
          <Input
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            placeholder="Enter voucher code"
            className="font-mono"
          />
          <Button onClick={applyVoucher} variant="outline" className="font-manrope">
            <Gift className="h-4 w-4 mr-2" />
            Apply
          </Button>
        </div>
        {appliedVoucher && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700 font-inter">
              ✓ {appliedVoucher.description}
            </p>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="instructions" className="font-inter">Special Instructions (Optional)</Label>
        <Textarea
          id="instructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Any special delivery instructions..."
          className="font-inter"
        />
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 font-manrope">Order Summary</h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-12 h-12 bg-muted rounded-md"></div>
              <div className="flex-1">
                <p className="font-medium font-manrope">{item.product.name}</p>
                <p className="text-sm text-muted-foreground font-inter">Quantity: {item.quantity}</p>
                {item.variant && Object.keys(item.variant).length > 0 && (
                  <p className="text-xs text-muted-foreground font-mono">
                    {Object.entries(item.variant).filter(([_, value]) => value).map(([key, value]) => `${key}: ${value}`).join(', ')}
                  </p>
                )}
              </div>
              <span className="font-semibold font-mono">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between font-inter">
          <span>Subtotal</span>
          <span className="font-mono">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-inter">
            <span>Discount</span>
            <span className="font-mono">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-inter">
          <span>Shipping</span>
          <span className="font-mono">{finalShippingCost === 0 ? 'FREE' : formatPrice(finalShippingCost)}</span>
        </div>
        <div className="flex justify-between font-inter">
          <span>Tax</span>
          <span className="font-mono">{formatPrice(tax)}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-semibold font-manrope">
          <span>Total</span>
          <span className="font-mono">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto font-inter">
        <DialogHeader>
          <DialogTitle className="text-2xl font-manrope">Checkout</DialogTitle>
          <DialogDescription className="font-inter">
            Complete your order in just a few simple steps
          </DialogDescription>
        </DialogHeader>

        {renderStepIndicator()}

        <div className="space-y-6">
          {step === 1 && renderShippingStep()}
          {step === 2 && renderPaymentStep()}
          {step === 3 && renderReviewStep()}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="font-manrope"
          >
            Back
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose} className="font-manrope">
              Cancel
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)} className="font-manrope">
                Continue
              </Button>
            ) : (
              <Button onClick={handlePlaceOrder} className="font-manrope">
                <Shield className="h-4 w-4 mr-2" />
                Place Order
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}