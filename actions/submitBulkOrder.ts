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

    const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
    if (!str(data?.name, 80) || !/^\d{10}$/.test(str(data?.mobile, 10))) {
      return { success: false, error: 'Name and a 10-digit mobile number are required.' }
    }

    const doc = {
      _type: 'bulkOrder',
      name: str(data.name, 80),
      mobile: str(data.mobile, 10),
      eventType: str(data.eventType, 80),
      eventDate: str(data.eventDate, 20),
      guestCount: Math.max(1, Math.floor(Number(data.guestCount)) || 1),
      location: str(data.location, 200),
      preferredItems: str(data.preferredItems, 1000),
      notes: str(data.notes, 1000),
      status: 'new',
    }

    await writeClient.create(doc)

    return { success: true }
  } catch (error) {
    console.error('Error submitting bulk order:', error)
    return { success: false, error: 'Could not save your request.' }
  }
}
