import { Router } from 'express'
import { cityController } from '@/city/CityModule'

const cityRoutes = Router()

const cityRoutesGet = cityRoutes.get('/city', cityController.index.bind(cityController))
const cityRoutesPost = cityRoutes.post('/city', cityController.create.bind(cityController))

export { cityRoutesPost, cityRoutesGet }
