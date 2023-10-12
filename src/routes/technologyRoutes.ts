import { Router } from 'express'
import { technologyController } from '@/app/technology/TechnologyModule'

const technologyRoutes = Router()

const technologyRoutesPost = technologyRoutes.post(
  '/',
  technologyController.create.bind(technologyController)
)

export { technologyRoutesPost }
