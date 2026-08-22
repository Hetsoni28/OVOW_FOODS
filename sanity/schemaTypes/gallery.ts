import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload your .mp4 video file here. The first frame will automatically be used as the thumbnail in the gallery.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption / Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Food', value: 'Food' },
          { title: 'Events', value: 'Events' },
          { title: 'Packaging', value: 'Packaging' },
          { title: 'Behind the Scenes', value: 'Behind the Scenes' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'spanSize',
      title: 'Grid Span Size',
      type: 'string',
      description: 'Determines how many columns/rows this image spans in the masonry grid.',
      options: {
        list: [
          { title: 'Normal (1x1)', value: 'normal' },
          { title: 'Large (2x2)', value: 'large' },
          { title: 'Wide (2x1)', value: 'wide' },
          { title: 'Tall (1x2)', value: 'tall' },
        ],
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'relatedProduct',
      title: 'Related Product (optional)',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Link this gallery item to a product. A "Craving this? View Dish" button will appear in the lightbox.',
    }),
  ],
})
