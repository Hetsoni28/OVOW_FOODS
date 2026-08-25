// ─── Gallery ────────────────────────────────────────────────────────────────
export type GalleryMedia = {
  _id: string;
  caption: string;
  category: string;
  spanSize: string;
  videoUrl: string;
  relatedProductSlug?: string;
  relatedProductName?: string;
};

// ─── Checkout ────────────────────────────────────────────────────────────────
export type CheckoutCustomerDetails = {
  name: string;
  mobile: string;
  address: string;
  instructions: string;
};

export type Details = CheckoutCustomerDetails;
export type Errors = Partial<Record<keyof Details, string>>;
export type PaymentMethod = "upi" | "cod";

