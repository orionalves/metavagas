import { Router } from 'express'
import { techSearchController } from '@/techSearch/TechSearchModule'

const techSearchRoutes = Router()

const techSearchRoutesGet = techSearchRoutes.get(
  '/trends/techs',
  techSearchController.topTrends.bind(techSearchController)
)

export { techSearchRoutesGet }
