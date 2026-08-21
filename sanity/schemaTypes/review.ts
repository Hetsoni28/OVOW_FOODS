import { defineField, defineType } from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isApproved',
      title: 'Approved for Public Display',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle this on to show the review on the public website.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'comment',
      isApproved: 'isApproved',
    },
    prepare(selection) {
      const { title, subtitle, isApproved } = selection
      return {
        title: `${title} ${isApproved ? '✅' : '⏳'}`,
        subtitle: subtitle,
      }
    },
  },
})
