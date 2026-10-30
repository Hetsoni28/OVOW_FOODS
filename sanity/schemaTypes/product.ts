import { defineField, defineType } from 'sanity'

// SEO-friendly URL slug: lowercase ASCII words joined by single hyphens
// e.g. "Dum Matka Paneer Biryani (Spl.)" -> "dum-matka-paneer-biryani-spl"
const slugify = (input: string) =>
  input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', slugify, maxLength: 80 },
      description: 'Used in the page URL: ovowfoods.com/menu/<slug>. Click "Generate" — keep it short, lowercase, words separated by hyphens.',
      validation: (rule) =>
        rule.required().custom((value) =>
          !value?.current || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value.current)
            ? true
            : 'Use only lowercase letters, numbers and single hyphens (e.g. dum-matka-biryani)'
        ),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text',
      description: 'List the ingredients used (e.g. Toor dal, onion, tomato)',
    }),
    defineField({
      name: 'allergens',
      title: 'Allergens',
      type: 'string',
      description: 'List any allergens (e.g. May contain dairy)',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
    }),
    defineField({
      name: 'servingSize',
      title: 'Serving Size',
      type: 'string',
      description: 'e.g. 750g, 500g, 2 pcs',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Product Video',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Upload an MP4 or WebM video for this product.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Product Thumbnail (for PDF Catalog)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a JPG/PNG photo of this dish. Used on the website, in Google/social previews and in the PDF catalog. Recommended: 1200x800px (3:2 ratio).',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text (SEO & accessibility)',
          type: 'string',
          description: 'Describe the photo naturally, e.g. "Dum Matka Paneer Biryani served in a clay pot with raita". Leave empty to auto-generate from the dish name.',
          validation: (rule) => rule.max(125).warning('Keep alt text under 125 characters'),
        }),
      ],
    }),
    defineField({
      name: 'isSpicy',
      title: 'Is Spicy?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isKidsSpecial',
      title: '🧒 Kids Special?',
      type: 'boolean',
      description: 'Mark this dish as kid-friendly / suitable for children.',
      initialValue: false,
    }),
    defineField({
      name: 'vegetarian',
      title: 'Is Vegetarian?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'signature',
      title: 'Is Signature?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBestSeller',
      title: 'Is Best Seller?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'includedRaita',
      title: '🥣 Includes Free Raita?',
      type: 'boolean',
      description: 'Turn ON to offer a free Raita add-on with this item (e.g. Biryani). Customer can opt-in when ordering.',
      initialValue: false,
    }),
    defineField({
      name: 'availabilityStatus',
      title: '📦 Availability Status',
      type: 'string',
      description: 'Controls the live badge shown to customers on your menu.',
      options: {
        list: [
          { title: '🟢 Available Today', value: 'available' },
          { title: '🟠 Limited Availability', value: 'limited' },
          { title: '🟣 Pre-Order Only', value: 'preorder' },
          { title: '🔴 Sold Out', value: 'soldout' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'available',
      title: 'Is Available? (Legacy — use Availability Status above)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'seo',
      title: 'SEO (Google & social sharing)',
      type: 'seo',
    }),
  ],
})
