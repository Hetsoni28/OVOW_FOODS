import { defineField, defineType } from 'sanity'

/**
 * Lightweight order event record.
 * Stores only anonymised dispatch metadata — no PII (no name, address, mobile).
 * Used to power the live "Recent Dispatches" ticker on the homepage.
 */
export const orderEventType = defineType({
  name: 'orderEvent',
  title: 'Order Events',
  type: 'document',
  fields: [
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      description: 'e.g. OVOW-240912-K7P4',
    }),
    defineField({
      name: 'area',
      title: 'Delivery Area / Locality',
      type: 'string',
      description: 'Only the area name, not full address. e.g. "Satellite" or "Vastrapur"',
    }),
    defineField({
      name: 'itemCount',
      title: 'Number of Items',
      type: 'number',
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: ['upi', 'cod'],
      },
    }),
    defineField({
      name: 'placedAt',
      title: 'Placed At',
      type: 'datetime',
      description: 'When the order was placed (ISO timestamp)',
    }),
  ],
  orderings: [
    {
      title: 'Most Recent First',
      name: 'placedAtDesc',
      by: [{ field: 'placedAt', direction: 'desc' }],
    },
  ],
})
