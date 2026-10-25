import config from '@payload-config'
import { getPayload } from 'payload'
import { Tracker } from './tracker'

export default async function HomePage() {
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

  return <Tracker reviews={reviews.docs.map((review) => ({ ...review, id: String(review.id) }))} notionUrl={settings.notionUrl ?? ''} />
}
