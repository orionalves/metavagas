import { Router } from 'express'
import { cityController } from '@/city/CityModule'
import { AuthMiddleware } from '@/middlewares/AuthMiddleware'

const cityRoutes = Router()

// Get city
const getCity = cityRoutes.get('/city', cityController.index.bind(cityController))

// Create city

const postCity = cityRoutes.post(
  '/city',
  AuthMiddleware.handler,
  cityController.create.bind(cityController)
)

export { postCity, getCity }
