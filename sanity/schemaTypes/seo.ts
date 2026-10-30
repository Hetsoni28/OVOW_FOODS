import { defineField, defineType } from 'sanity'

// Reusable SEO block. Every field is optional — when empty, the website uses
// sensible defaults generated on the server.
export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description: 'The blue headline in Google results. Include the dish/page topic + "Ahmedabad" naturally.',
      validation: (rule) => rule.max(60).warning('Google shows about 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'The grey text under the title in Google. Summarise the page for a hungry customer.',
      validation: (rule) => rule.min(70).max(160).warning('Aim for 70–160 characters'),
    }),
    defineField({
      name: 'heading',
      title: 'Main heading (H1)',
      type: 'string',
      description: 'The big heading on the page. Leave empty to use the dish name. (Products only — site pages use their designed headings.)',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'image',
      title: 'Social sharing image',
      type: 'image',
      description: 'Shown when the link is shared on WhatsApp, Facebook, X etc. Best size: 1200×630px. Leave empty to use the dish photo / site image.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.max(125).warning('Keep alt text under 125 characters'),
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (advanced)',
      type: 'url',
      description: 'Only if this content is a copy of another page. Leave empty — the page URL is used automatically.',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Google',
      type: 'boolean',
      description: 'Turn on to keep this page out of search results and the sitemap.',
      initialValue: false,
    }),
  ],
})
