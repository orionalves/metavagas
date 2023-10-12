import { commonError } from '@/utils/commonError'
import { TechnologyRepository } from '@/technology/repositories/TechnologyRepository'
import { status } from '@/utils/status'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { TypeTechnology } from '@/technology/entities/Technology'

class TechnologyService {
  constructor(private repository: TechnologyRepository) {}

  async create(data: TechnologyDto) {
    const technologyAlreadyExist = await this.repository.findOne(data)
    if (technologyAlreadyExist) {
      return commonError('This technology already exist.', status.badRequest)
    }

    const result = await this.repository.create(data as TypeTechnology)
    return result
  }

  async index() {
    const result = await this.repository.findAll()
    return result
  }
}

export { TechnologyService }
