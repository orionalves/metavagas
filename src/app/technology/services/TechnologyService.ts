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

  async returnId(data: string) {
    // const tech = data.split(',')
    // async returnId(data: TechnologyDto) {
    //   const tech = data.name.split(',')
    // if (data.technologies) {
    //   await this.repository
    // }

    const result = await this.repository.returnId({ name: data })
    // const result = await Promise.all(tech.map(name => this.repository.returnId({ name })))
    // const result = await Promise.all(tech.map(item => this.repository.returnId({ name: item })))
    return result
  }

  async index() {
    const result = await this.repository.findAll()
    return result
  }
}

export { TechnologyService }
