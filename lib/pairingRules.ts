import { CartItem } from "@/types";

export interface Suggestion {
  id: string;
  name: string;
  price: number;
  isFree?: boolean;
  image?: string;
  category: "Side" | "Bread" | "Dessert" | "Main" | "Drink";
}

// ── Suggestion Catalog (exact items from your menu) ───────────────────────────
const CATALOG: Record<string, Suggestion> = {
  "mint-raita": {
    id: "mint-raita",
    name: "Mint Raita",
    price: 0,
    isFree: true,
    category: "Side",
    image: "https://images.unsplash.com/photo-1615486171448-4fd13db14758?w=400&q=80",
  },
  "dahi-boondi": {
    id: "dahi-boondi",
    name: "Dahi Boondi",
    price: 149,
    category: "Side",
    image: "https://images.unsplash.com/photo-1615486171448-4fd13db14758?w=400&q=80",
  },
  "butter-tawa-roti": {
    id: "butter-tawa-roti",
    name: "Butter Tawa Roti",
    price: 20,
    category: "Bread",
    image: "https://images.unsplash.com/photo-1626200419188-3ca9707e0b57?w=400&q=80",
  },
  "plain-roti": {
    id: "plain-roti",
    name: "Plain Roti",
    price: 15,
    category: "Bread",
    image: "https://images.unsplash.com/photo-1626200419188-3ca9707e0b57?w=400&q=80",
  },
  "jeera-rice": {
    id: "jeera-rice",
    name: "Jeera Rice",
    price: 199,
    category: "Main",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  "dal-makhani": {
    id: "dal-makhani",
    name: "Dal Makhani",
    price: 229,
    category: "Main",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80",
  },
  "cheese-butter-masala": {
    id: "cheese-butter-masala",
    name: "Cheese Butter Masala",
    price: 299,
    category: "Main",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
  },
  "gulab-jamun": {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    price: 79,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  },
  "rabdi": {
    id: "rabdi",
    name: "Rabdi",
    price: 110,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  },
  "rabdi-gulab-jamun": {
    id: "rabdi-gulab-jamun",
    name: "Rabdi With Gulab Jamun",
    price: 199,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  },
  "buttermilk": {
    id: "buttermilk",
    name: "Buttermilk",
    price: 59,
    category: "Drink",
    image: "https://images.unsplash.com/photo-1587014679443-9b6e72ef4155?w=400&q=80",
  },
};

// ── Helper ────────────────────────────────────────────────────────────────────
function inCart(cartNames: Set<string>, ...names: string[]) {
  return names.some((n) => cartNames.has(n.toLowerCase()));
}

// ── Main Engine ───────────────────────────────────────────────────────────────
export function getSuggestions(cartItems: CartItem[]): Suggestion[] {
  if (cartItems.length === 0) return [];

  const cartNames = new Set(cartItems.map((i) => i.name.toLowerCase()));

  const suggestions = new Map<string, Suggestion>();

  // ── Analyse cart ──────────────────────────────────────────────────
  let hasBiryaniOrKhichdi = false;
  let hasDalOrCurry = false;
  let hasRoti = false;
  let hasDessert = false;

  for (const item of cartItems) {
    const n = item.name.toLowerCase();

    if (n.includes("biryani") || n.includes("khichdi")) hasBiryaniOrKhichdi = true;

    if (
      n.includes("dal") ||
      n.includes("rajma") ||
      n.includes("masala") ||
      n.includes("paneer") ||
      n.includes("gotala") ||
      n.includes("kaju") ||
      n.includes("makhmali") ||
      n.includes("pathani")
    ) hasDalOrCurry = true;

    if (n.includes("roti")) hasRoti = true;

    if (n.includes("rabdi") || n.includes("gulab jamun")) hasDessert = true;
  }

  // ── Rule 1: Biryani / Khichdi → FREE Mint Raita ──────────────────
  if (hasBiryaniOrKhichdi && !inCart(cartNames, "mint raita")) {
    suggestions.set("mint-raita", CATALOG["mint-raita"]);
  }

  // ── Rule 2: Biryani / Khichdi → suggest Buttermilk ───────────────
  if (hasBiryaniOrKhichdi && !inCart(cartNames, "buttermilk")) {
    suggestions.set("buttermilk", CATALOG["buttermilk"]);
  }

  // ── Rule 3: Dal / Curry → suggest Roti ───────────────────────────
  if (hasDalOrCurry && !hasRoti && !inCart(cartNames, "plain roti", "butter tawa roti")) {
    suggestions.set("butter-tawa-roti", CATALOG["butter-tawa-roti"]);
  }

  // ── Rule 4: Dal / Curry → suggest Rice if no rice ────────────────
  if (hasDalOrCurry && !inCart(cartNames, "jeera rice", "steam rice", "curd rice")) {
    suggestions.set("jeera-rice", CATALOG["jeera-rice"]);
  }

  // ── Rule 5: Roti → suggest Dal or Curry ──────────────────────────
  if (hasRoti && !hasDalOrCurry) {
    if (!inCart(cartNames, "dal makhani")) {
      suggestions.set("dal-makhani", CATALOG["dal-makhani"]);
    }
    if (!inCart(cartNames, "cheese butter masala")) {
      suggestions.set("cheese-butter-masala", CATALOG["cheese-butter-masala"]);
    }
  }

  // ── Rule 6: No dessert → suggest one (cheapest first for impulse buy) ───────
  if (!hasDessert) {
    if (!inCart(cartNames, "gulab jamun")) {
      suggestions.set("gulab-jamun", CATALOG["gulab-jamun"]);
    } else if (!inCart(cartNames, "rabdi")) {
      suggestions.set("rabdi", CATALOG["rabdi"]);
    } else if (!inCart(cartNames, "rabdi with gulab jamun")) {
      suggestions.set("rabdi-gulab-jamun", CATALOG["rabdi-gulab-jamun"]);
    }
  }

  // ── Sort: FREE first, then sort by category ───────────────────────
  const result = Array.from(suggestions.values()).sort((a, b) => {
    if (a.isFree && !b.isFree) return -1;
    if (!a.isFree && b.isFree) return 1;
    return 0;
  });

  return result.slice(0, 3); // max 3 suggestions
}
