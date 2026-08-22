import { groq } from 'next-sanity'

export const ALL_CATEGORIES_QUERY = groq`*[_type == "category" && active == true] | order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current
}`

// List view: lean query — no fullExperienceVideo, no ingredients (saves bandwidth)
export const ALL_PRODUCTS_QUERY = groq`*[_type == "product" && isAvailable != false] | order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  "category": category->name,
  "image": image.asset->url + "?w=600&auto=format&q=75",
  isSpicy,
  isBestSeller,
  isSignature,
  signature,
  size,
  servingSize,
  "previewVideo": previewVideo.asset->url
}`

// Full detail view: fetch everything
export const PRODUCT_BY_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  "category": category->name,
  "image": image.asset->url + "?w=1200&auto=format&q=80",
  isSpicy,
  isBestSeller,
  isSignature,
  ingredients,
  "previewVideo": previewVideo.asset->url,
  "fullExperienceVideo": fullExperienceVideo.asset->url
}`

export const RELATED_PRODUCTS_QUERY = groq`*[_type == "product" && category->name == $category && slug.current != $slug && isAvailable != false][0...3] {
  _id,
  name,
  "slug": slug.current,
  price,
  "category": category->name,
  "image": image.asset->url + "?w=400&auto=format&q=70",
  isSignature,
  "previewVideo": previewVideo.asset->url
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
