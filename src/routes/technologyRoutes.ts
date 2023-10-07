import { Router } from 'express'
import { technologyController } from '@/app/technology/TechnologyModule'

const technologyRoutes = Router()

const technologyRoutesPost = technologyRoutes.post(
  '/',
  technologyController.create.bind(technologyController)
)
const technologyRoutesGet = technologyRoutes.get(
  '/',
  technologyController.returnId.bind(technologyController)
)

export { technologyRoutesPost, technologyRoutesGet }
