export interface Category {
  _id: string;
  name: string;
  slug: string;
  sortOrder: number;
}

export interface Product {
  _id?: string;
  slug: string;
  name: string;
  category: any; // Reference to Category schema
  servingSize?: string;
  size?: string; // Legacy
  price: number;
  originalPrice?: number;
  description?: string;
  ingredients?: string;
  allergens?: string;
  previewVideo?: string;
  thumbnailUrl?: string;
  video?: {
    asset?: {
      url: string;
    };
  };
  isSpicy?: boolean;

  vegetarian?: boolean;
  isSwaminarayan?: boolean;
  signature?: boolean;
  isSignature?: boolean; // Legacy
  isBestseller?: boolean;
  available?: boolean;
  isAvailable?: boolean; // Legacy
  sortOrder?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus =
  | "RECEIVED"
  | "PAYMENT_PENDING"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELLED";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  servingSize?: string;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  orderId: string;
  createdAt: string; // ISO date string

  customer: {
    name: string;
    phone: string;
    email?: string;
  };

  delivery: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    instructions?: string;
    method: "OVOW_FREE_DELIVERY" | "PORTER";
  };

  items: OrderItem[];

  pricing: {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    tax: number;
    grandTotal: number;
  };

  payment: {
    method: "UPI" | "COD";
    amount: number;
    customerConfirmation: "NOT_CONFIRMED" | "CUSTOMER_MARKED_PAID";
    verification: "PENDING" | "VERIFIED" | "FAILED";
  };

  orderStatus: OrderStatus;
}
