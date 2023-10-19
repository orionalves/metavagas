import { Router } from 'express'
import { technologyController } from '@/app/technology/TechnologyModule'

const technologyRoutes = Router()

const technologyRoutesPost = technologyRoutes.post(
  '/tech',
  technologyController.create.bind(technologyController)
)

const technologyRoutesGet = technologyRoutes.get(
  '/tech',
  technologyController.index.bind(technologyController)
)

export { technologyRoutesPost, technologyRoutesGet }
