import { Router } from 'express'
import { jobController } from '@/job/JobModule'
import { AuthMiddleware } from '@/middlewares/AuthMiddleware'

const jobRoutes = Router()

const getTrendsCities = jobRoutes.get(
  '/trends/:id/cities',
  jobController.topFiveCities.bind(jobController)
)

const createJobs = jobRoutes.post(
  '/jobs',
  AuthMiddleware.handler,
  jobController.create.bind(jobController)
)

const searchJobs = jobRoutes.get(
  '/jobs',
  AuthMiddleware.handler,
  jobController.search.bind(jobController)
)

export { createJobs, searchJobs, getTrendsCities }
