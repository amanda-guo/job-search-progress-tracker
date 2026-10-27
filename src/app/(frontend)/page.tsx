import config from '@payload-config'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import { Tracker } from './tracker'

export default async function HomePage() {
  await connection()
  const payload = await getPayload({ config })
  const [reviews, settings] = await Promise.all([
    payload.find({
      collection: 'weekly-reviews',
      limit: 100,
      sort: '-weekOf',
      overrideAccess: false,
    }),
    payload.findGlobal({ slug: 'search-settings', overrideAccess: false }),
  ])

  const today = new Date()
  today.setUTCDate(today.getUTCDate() - ((today.getUTCDay() + 6) % 7))

  return <Tracker reviews={reviews.docs.map((review) => ({ ...review, id: String(review.id) }))} notionUrl={settings.notionUrl ?? ''} defaultWeek={today.toISOString().slice(0, 10)} />
}
