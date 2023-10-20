import { Router } from 'express'
import { technologyController } from '@/app/technology/TechnologyModule'
import { AuthMiddleware } from '@/middlewares/AuthMiddleware'

const technologyRoutes = Router()

const postTechnology = technologyRoutes.post(
  '/tech',
  AuthMiddleware.handler,
  technologyController.create.bind(technologyController)
)

const getTechnology = technologyRoutes.get(
  '/tech',
  technologyController.index.bind(technologyController)
)

export { postTechnology, getTechnology }
