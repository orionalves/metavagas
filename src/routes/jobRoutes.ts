import { Router } from 'express'
import { jobController } from '@/job/JobModule'

const jobRoutes = Router()

jobRoutes.post('/', jobController.create.bind(jobController))

export { jobRoutes }
