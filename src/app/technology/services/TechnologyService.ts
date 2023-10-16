import { TechnologyRepository } from '@/technology/repositories/TechnologyRepository'
import { status } from '@/utils/status'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { commonReturn } from '@/utils/commonReturn'

class TechnologyService {
  constructor(private repository: TechnologyRepository) {}

  async create(data: TechnologyDto) {
    const technologyAlreadyExist = await this.repository.findOne(data)
    if (technologyAlreadyExist) {
      return commonReturn(true, '❌ Problem: This technology already exist.', status.badRequest)
    }

    const result = await this.repository.create(data)
    return result
  }

  async index() {
    const result = await this.repository.findAll()
    return result
  }
}

export { TechnologyService }
