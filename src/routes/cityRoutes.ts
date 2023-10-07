import { Router } from 'express'
import { cityController } from '@/city/CityModule'

const cityRoutes = Router()

const cityRoutesPost = cityRoutes.post('/', cityController.create.bind(cityController))
const cityRoutesGet = cityRoutes.get('/', cityController.index.bind(cityController))

export { cityRoutesPost, cityRoutesGet }
