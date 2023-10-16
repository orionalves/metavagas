import { Router } from 'express'
import { jobController } from '@/job/JobModule'

const jobRoutes = Router()

const jobRoutesPost = jobRoutes.post('/', jobController.create.bind(jobController))
const jobRoutesGet = jobRoutes.get('/', jobController.search.bind(jobController))
const jobRoutesGetCities = jobRoutes.get(
  '/trends/:id/cities',
  jobController.topFiveCities.bind(jobController)
)

export { jobRoutesPost, jobRoutesGet, jobRoutesGetCities }
