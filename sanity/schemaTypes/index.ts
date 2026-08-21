import { type SchemaTypeDefinition } from 'sanity'

import { productType } from './product'
import { reviewType } from './review'
import { galleryType } from './gallery'
import { bulkOrderType } from './bulkOrder'
import { categoryType } from './category'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    categoryType,
    productType,
    reviewType,
    galleryType,
    bulkOrderType
  ],
}
