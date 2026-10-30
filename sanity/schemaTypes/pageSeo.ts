import { defineField, defineType } from 'sanity'

// SEO overrides for the fixed website pages (one document per page).
export const SEO_PAGES = [
  { title: 'Home', value: 'home' },
  { title: 'Menu', value: 'menu' },
  { title: 'About', value: 'about' },
  { title: 'Contact', value: 'contact' },
  { title: 'Gallery', value: 'gallery' },
  { title: 'Reviews', value: 'reviews' },
  { title: 'Party & Bulk Orders', value: 'party-bulk-orders' },
  { title: 'Privacy Policy', value: 'privacy-policy' },
  { title: 'Terms & Conditions', value: 'terms-and-conditions' },
]

export const pageSeoType = defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: { list: SEO_PAGES, layout: 'dropdown' },
      description: 'Create only one Page SEO document per page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: { collapsed: false },
    }),
  ],
  preview: {
    select: { page: 'page', title: 'seo.title' },
    prepare: ({ page, title }) => ({
      title: SEO_PAGES.find((p) => p.value === page)?.title ?? 'Choose a page',
      subtitle: title || 'Using default SEO',
    }),
  },
})
