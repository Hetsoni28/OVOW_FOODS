'use server'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { revalidatePath } from 'next/cache'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function submitReviewAction(data: {
  name: string
  rating: number
  comment: string
}) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('Missing SANITY_API_TOKEN. Cannot save to database.')
    }

    if (!data.name || !data.rating || !data.comment) {
      throw new Error('Missing required fields.')
    }

    const doc = {
      _type: 'review',
      name: data.name,
      rating: data.rating,
      comment: data.comment,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      isApproved: true, // Auto-approved based on user request
    }

    await writeClient.create(doc)

    // Clear Next.js cache so the review shows up instantly
    revalidatePath('/reviews')

    return { success: true }
  } catch (error: any) {
    console.error('Error submitting review:', error)
    return { success: false, error: error.message }
  }
}
