import { defineField, defineType } from 'sanity'

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
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isSpicy',
      title: 'Is Spicy?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'vegetarian',
      title: 'Is Vegetarian?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isSwaminarayan',
      title: 'Is Swaminarayan Friendly?',
      type: 'boolean',
      description: 'Turn on if this dish is made without onion and garlic.',
      initialValue: false,
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
      name: 'available',
      title: 'Is Available?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
