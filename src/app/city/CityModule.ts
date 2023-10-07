import { CityRepository } from '@/city/repositories/CityRepository'
import { CityService } from '@/city/services/CityService'
import { CityController } from '@/city/controllers/CityController'
import { City } from '@/city/entities/City'

class CityModule {
  static getInstance() {
    const repository = new CityRepository(City)
    const service = new CityService(repository)
    const controller = new CityController(service)

    return { repository, controller }
  }
}

const cityController = CityModule.getInstance().controller
const cityRepository = CityModule.getInstance().repository

export { cityController, cityRepository }
