import { Router } from 'express'
import { jobController } from '@/job/JobModule'

const jobRoutes = Router()

const createJobs = jobRoutes.post('/jobs', jobController.create.bind(jobController))
const searchJobs = jobRoutes.get('/jobs', jobController.search.bind(jobController))
const getTrendsCities = jobRoutes.get(
  '/trends/:id/cities',
  jobController.topFiveCities.bind(jobController)
)

export { createJobs, searchJobs, getTrendsCities }
