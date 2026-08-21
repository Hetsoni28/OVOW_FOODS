import { groq } from 'next-sanity'

export const ALL_CATEGORIES_QUERY = groq`*[_type == "category" && active == true] | order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current
}`

export const ALL_PRODUCTS_QUERY = groq`*[_type == "product"] | order(sortOrder asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  "category": category->name,
  "image": image.asset->url,
  isSpicy,
  isBestSeller,
  ingredients,
  "previewVideo": previewVideo.asset->url,
  "fullExperienceVideo": fullExperienceVideo.asset->url
}`

export const PRODUCT_BY_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  "category": category->name,
  "image": image.asset->url,
  isSpicy,
  isBestSeller,
  ingredients,
  "previewVideo": previewVideo.asset->url,
  "fullExperienceVideo": fullExperienceVideo.asset->url
}`

export const RELATED_PRODUCTS_QUERY = groq`*[_type == "product" && category->name == $category && slug.current != $slug][0...3] {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  "category": category->name,
  "image": image.asset->url,
  isSpicy,
  isBestSeller,
  ingredients,
  "previewVideo": previewVideo.asset->url,
  "fullExperienceVideo": fullExperienceVideo.asset->url
}
`
export const APPROVED_REVIEWS_QUERY = groq`*[_type == "review" && isApproved == true] | order(date desc) {
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
  "videoUrl": video.asset->url
}`
