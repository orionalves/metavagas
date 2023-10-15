import { Router } from 'express'
import { techSearchController } from '@/techSearch/TechSearchModule'

const techSearchRoutes = Router()

// const techSearchRoutesGet = techSearchRoutes.get(
//   '/',
//   techSearchController.topTrends.bind(techSearchController)
// )
const techSearchRoutesGetCities = techSearchRoutes.get(
  '/',
  techSearchController.topCities.bind(techSearchController)
)

// export { techSearchRoutesGet, techSearchRoutesGetCities }
export { techSearchRoutesGetCities }
