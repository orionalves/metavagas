import { commonError } from '@/utils/commonError'
import { CityRepository } from '@/city/repositories/CityRepository'
import { status } from '@/utils/status'
import { CityDto } from '@/city/dtos/CityDto'
import { TypeCity } from '@/city/entities/City'

class CityService {
  constructor(private repository: CityRepository) {}

  async create(data: CityDto) {
    const cityAlreadyExist = await this.repository.findOne(data)
    if (cityAlreadyExist) {
      return commonError('This city already exist.', status.badRequest)
    }

    const result = await this.repository.create(data as TypeCity)
    return result
  }

  // async search(data: CitySearch) {
  //   // if (data.technologies) {
  //   //   await this.repository
  //   // }
  //   const result = await this.repository.search(data)
  //   return result
  // }

  async index() {
    const result = await this.repository.findAll()
    return result
  }
}

export { CityService }
