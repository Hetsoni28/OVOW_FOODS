import type { Product } from "@/types";

export const products: Product[] = [
  { slug: "dum-matka-biryani-special", name: "Dum Matka Biryani Spl.", category: "Signature", size: "750g", price: 499, isSignature: true, isBestseller: true },
  { slug: "dum-biryani", name: "Dum Biryani", category: "Rice & Biryani", size: "500g", price: 399 },
  { slug: "hyderabadi-biryani", name: "Hyderabadi Biryani", category: "Rice & Biryani", size: "500g", price: 399 },
  { slug: "veg-biryani", name: "Veg Biryani", category: "Rice & Biryani", size: "500g", price: 249 },
  { slug: "steam-rice", name: "Steam Rice", category: "Rice & Biryani", size: "500g", price: 129 },
  { slug: "jeera-rice", name: "Jeera Rice", category: "Rice & Biryani", size: "500g", price: 199 },

  { slug: "paneer-makhmali", name: "Paneer Makhmali", category: "Premium Subjis", size: "500g", price: 299 },
  { slug: "paneer-pathani-masala", name: "Paneer Pathani Masala", category: "Premium Subjis", size: "500g", price: 339, isBestseller: true },
  { slug: "dum-matka-paneer", name: "Dum Matka Paneer", category: "Premium Subjis", size: "750g", price: 349, isSignature: true },
  { slug: "veg-makhmali-handi", name: "Veg Makhmali Handi", category: "Premium Subjis", size: "500g", price: 299 },
  { slug: "cheese-butter-masala", name: "Cheese Butter Masala", category: "Premium Subjis", size: "500g", price: 299 },
  { slug: "kaju-butter-masala", name: "Kaju Butter Masala", category: "Premium Subjis", size: "500g", price: 399 },
  { slug: "gotala-special", name: "Gotala Special", category: "Premium Subjis", size: "500g", price: 399 },

  { slug: "butter-tawa-roti", name: "Butter Tawa Roti", category: "Roti", size: "—", price: 20 },
  { slug: "plain-roti", name: "Plain Roti", category: "Roti", size: "—", price: 15 },
];

export const CATEGORIES = [
  "All",
  "Signature",
  "Rice & Biryani",
  "Premium Subjis",
  "Roti",
] as const;
