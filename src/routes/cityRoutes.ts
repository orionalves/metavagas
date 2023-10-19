import { Router } from 'express'
import { cityController } from '@/city/CityModule'

const cityRoutes = Router()

const cityRoutesPost = cityRoutes.post('/city', cityController.create.bind(cityController))
const cityRoutesGet = cityRoutes.get('/city', cityController.index.bind(cityController))

export { cityRoutesPost, cityRoutesGet }
