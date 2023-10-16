import { Router } from 'express'
import { techSearchController } from '@/techSearch/TechSearchModule'

const techSearchRoutes = Router()

const techSearchRoutesGetCities = techSearchRoutes.get(
  '/trends/:id/cities',
  techSearchController.topCities.bind(techSearchController)
)
const techSearchRoutesGet = techSearchRoutes.get(
  '/trends/techs',
  techSearchController.topTrends.bind(techSearchController)
)

export { techSearchRoutesGet, techSearchRoutesGetCities }
