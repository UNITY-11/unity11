import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

/** Fresh reads for admin CRUD — avoids stale CDN cache after writes */
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
