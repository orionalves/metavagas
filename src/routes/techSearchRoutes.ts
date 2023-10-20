import { Router } from 'express'
import { techSearchController } from '@/techSearch/TechSearchModule'

const techSearchRoutes = Router()

const getTrendTech = techSearchRoutes.get(
  '/trends/techs',
  techSearchController.topTrends.bind(techSearchController)
)

export { getTrendTech }
