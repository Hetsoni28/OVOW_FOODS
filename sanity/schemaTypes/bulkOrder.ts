import { defineField, defineType } from 'sanity'

export const bulkOrderType = defineType({
  name: 'bulkOrder',
  title: 'Bulk Order Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'guestCount',
      title: 'Guest Count',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Area',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'preferredItems',
      title: 'Preferred Items',
      type: 'text',
    }),
    defineField({
      name: 'notes',
      title: 'Special Requirements',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'eventDate',
    },
  },
})
