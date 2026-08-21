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
  image?: string;
  previewVideo?: string; // URL to the file
  fullExperienceVideo?: string; // URL to the file
  gallery?: string[];
  preparationStory?: string;
  ingredients?: string[];
  spiceLevel?: string;
  isSpicy?: boolean;
  vegetarian?: boolean;
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
