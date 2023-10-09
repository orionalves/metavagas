import { commonError } from '@/utils/commonError'
import { JobRepository } from '@/job/repositories/JobRepository'
import { status } from '@/utils/status'
import { JobDto, JobSearch } from '@/job/dtos/JobDto'
import { TechnologyRepository } from '@/app/technology/repositories/TechnologyRepository'
import { CityRepository } from '@/app/city/repositories/CityRepository'

class JobService {
  constructor(
    private repository: JobRepository,
    private technologyRepository: TechnologyRepository,
    private cityRepository: CityRepository
  ) {}

  async create(data: JobDto) {
    const technologies = await Promise.all(
      data.technologies.map(name => this.technologyRepository.returnId({ name }))
    )

    const technologiesExists = technologies.some(item => typeof item === 'string')
    if (technologies.includes(null) || !technologiesExists) {
      return commonError("We don't have any technology.", status.badRequest)
    }

    const city = await this.cityRepository.returnId(data.city)
    if (typeof city !== 'string') {
      return commonError("We don't have this city.", status.badRequest)
    }

    const job = data
    job.technologies = technologies as string[]
    job.city = city

    const jobAlreadyExist = await this.repository.findOne(job)
    if (jobAlreadyExist) {
      return commonError('This job already exist.', status.badRequest)
    }

    const result = await this.repository.create(job)
    return result
  }

  async search(data: JobSearch) {
    // if (data.technologies) {
    //   await this.repository
    // }
    const result = await this.repository.search(data)
    return result
  }

  async index() {
    const result = await this.repository.findAll()
    return result
  }
}

export { JobService }
