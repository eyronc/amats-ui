// Global purchase tracking system
interface Purchase {
  id: number;
  userEmail: string;
  userName: string;
  userType: string;
  userCountry: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
  paymentMethod: string;
  transactionId: string;
  purchaseDate: string;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: string;
}

class PurchaseTracker {
  private static instance: PurchaseTracker;
  private purchases: Purchase[] = [];
  private listeners: ((purchases: Purchase[]) => void)[] = [];

  static getInstance(): PurchaseTracker {
    if (!PurchaseTracker.instance) {
      PurchaseTracker.instance = new PurchaseTracker();
    }
    return PurchaseTracker.instance;
  }

  addPurchase(purchase: Purchase) {
    this.purchases.unshift(purchase); // Add to beginning of array
    this.notifyListeners();
    
    // Add notification for the user
    this.addNotificationForUser(purchase);
  }

  getPurchases(): Purchase[] {
    return this.purchases;
  }

  subscribe(listener: (purchases: Purchase[]) => void) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (purchases: Purchase[]) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.purchases));
  }

  private addNotificationForUser(purchase: Purchase) {
    // Create notification event
    const notificationEvent = new CustomEvent('newPurchaseNotification', {
      detail: {
        userEmail: purchase.userEmail,
        message: `Your order for ${purchase.productName} has been confirmed!`,
        type: 'success',
        time: 'just now',
        transactionId: purchase.transactionId
      }
    });
    
    document.dispatchEvent(notificationEvent);
  }
}

export const purchaseTracker = PurchaseTracker.getInstance();
export type { Purchase };