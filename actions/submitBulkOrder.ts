'use server'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// We need a server-side client with a token to create documents
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function submitBulkOrderAction(data: any) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('Missing SANITY_API_TOKEN. Cannot save to database.')
    }

    const doc = {
      _type: 'bulkOrder',
      name: data.name,
      mobile: data.mobile,
      eventType: data.eventType,
      eventDate: data.eventDate,
      guestCount: Number(data.guestCount),
      location: data.location,
      preferredItems: data.preferredItems || '',
      notes: data.notes || '',
      status: 'new',
    }

    await writeClient.create(doc)

    return { success: true }
  } catch (error: any) {
    console.error('Error submitting bulk order:', error)
    return { success: false, error: error.message }
  }
}
