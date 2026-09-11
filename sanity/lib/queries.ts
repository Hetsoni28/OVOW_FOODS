import { groq } from 'next-sanity'

export const ALL_CATEGORIES_QUERY = groq`*[_type == "category" && active == true] | order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current
}`

// List view: lean query — shows ALL products including sold-out (displayed with SOLD OUT badge)
export const ALL_PRODUCTS_QUERY = groq`*[_type == "product"] | order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  ingredients,
  allergens,
  price,
  originalPrice,
  available,
  availabilityStatus,
  "category": category->name,
  "previewVideo": video.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  isSpicy,
  isBestSeller,
  signature,
  size,
  servingSize,
  includedRaita,
  "avgRating": math::avg(*[_type == "review" && isApproved == true && product._ref == ^._id].rating),
  "reviewCount": count(*[_type == "review" && isApproved == true && product._ref == ^._id])
}`

// Full detail view: fetch everything
export const PRODUCT_BY_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  ingredients,
  allergens,
  price,
  originalPrice,
  available,
  availabilityStatus,
  "category": category->name,
  "previewVideo": video.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  isSpicy,
  isBestSeller,
  signature,
  servingSize,
  includedRaita
}`

export const RELATED_PRODUCTS_QUERY = groq`*[_type == "product" && category->name == $category && slug.current != $slug && available != false][0...3] {
  _id,
  name,
  "slug": slug.current,
  price,
  available,
  "category": category->name,
  "previewVideo": video.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  signature,
  isBestSeller
}`

export const HOME_FEATURED_PRODUCTS_QUERY = groq`*[_type == "product" && available != false && (isBestSeller == true || signature == true)] | order(_updatedAt desc) [0...12] {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  available,
  "category": category->name,
  "previewVideo": video.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  signature,
  isBestSeller,
  servingSize
}`

export const APPROVED_REVIEWS_QUERY = groq`*[_type == "review" && isApproved == true] | order(date desc) [0...20] {
  _id,
  name,
  rating,
  comment,
  date
}`

export const GALLERY_QUERY = groq`*[_type == "gallery"] | order(_createdAt desc) {
  _id,
  caption,
  category,
  spanSize,
  "videoUrl": video.asset->url,
  "relatedProductSlug": relatedProduct->slug.current,
  "relatedProductName": relatedProduct->name
}`

export const PRODUCT_REVIEWS_QUERY = groq`*[_type == "review" && isApproved == true && product->slug.current == $slug] | order(date desc) [0...20] {
  _id,
  name,
  rating,
  comment,
  date
}`

// Recommendations: fetch available products NOT in the given category slugs (to cross-sell)
export const RECOMMENDATIONS_QUERY = groq`*[_type == "product" && availabilityStatus != "soldout" && available != false && !(_id in $excludeIds)] | order(isBestSeller desc, sortOrder asc) [0...6] {
  _id,
  name,
  "slug": slug.current,
  price,
  availabilityStatus,
  "category": category->name,
  "thumbnailUrl": thumbnail.asset->url,
  isBestSeller,
  signature
}`

// Recent order events for the live dispatch ticker on homepage
// Returns last 20 anonymised events — NO PII (no name, mobile, address)
export const RECENT_ORDER_EVENTS_QUERY = groq`*[_type == "orderEvent"] | order(placedAt desc) [0...20] {
  _id,
  orderId,
  area,
  itemCount,
  paymentMethod,
  placedAt
}`
