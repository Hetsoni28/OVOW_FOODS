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

    // Server actions are public endpoints — validate everything here, not just in the form
    const name = typeof data?.name === 'string' ? data.name.trim() : ''
    const comment = typeof data?.comment === 'string' ? data.comment.trim() : ''
    const rating = Number(data?.rating)

    if (!name || !comment || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return { success: false, error: 'Please enter your name, a comment and a 1–5 star rating.' }
    }
    if (name.length > 60 || comment.length > 1000) {
      return { success: false, error: 'Name must be under 60 characters and comment under 1000.' }
    }

    const doc = {
      _type: 'review',
      name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      isApproved: true, // Auto-approved based on user request
    }

    await writeClient.create(doc)

    // Clear Next.js cache so the review shows up instantly
    revalidatePath('/reviews')

    return { success: true }
  } catch (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: 'Failed to submit review. Please try again.' }
  }
}
