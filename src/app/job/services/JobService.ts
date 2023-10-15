import { JobRepository } from '@/job/repositories/JobRepository'
import { status } from '@/utils/status'
import { JobDto, JobSearch } from '@/job/dtos/JobDto'
import { TechnologyRepository } from '@/technology/repositories/TechnologyRepository'
import { CityRepository } from '@/city/repositories/CityRepository'
import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'
import { commonReturn } from '@/utils/commonReturn'

class JobService {
  constructor(
    private repository: JobRepository,
    private technologyRepository: TechnologyRepository,
    private cityRepository: CityRepository,
    private techSearchRepository: TechSearchRepository
  ) {}

  async create(data: JobDto) {
    const technologies = await Promise.all(
      data.technologies.map(name => this.technologyRepository.returnId({ name }))
    )

    const technologiesExists = technologies.some(item => typeof item === 'string')
    if (technologies.includes(null) || !technologiesExists) {
      return commonReturn(true, "❌ Problem: We don't have any technology.", status.badRequest)
    }

    const city = await this.cityRepository.returnId(data.city)
    if (typeof city !== 'string') {
      return commonReturn(true, "❌ Problem: We don't have this city.", status.badRequest)
    }

    const job = data
    job.technologies = technologies as string[]
    job.city = city

    const jobAlreadyExist = await this.repository.findOne(job)
    if (jobAlreadyExist) {
      return commonReturn(true, '❌ Problem: This job already exist.', status.badRequest)
    }

    const result = await this.repository.create(job)
    return result
  }

  async search(data: JobSearch) {
    const cityExist = data.city ? await this.cityRepository.returnId(data.city) : null
    const city = typeof cityExist === 'string' ? cityExist : '000000000000000000000000'

    const queryTechnologies = data.technologies
      ? await Promise.all(
          data.technologies.map(name => this.technologyRepository.returnId({ name }))
        )
      : []
    const technologies = queryTechnologies.filter(item => typeof item === 'string') as string[]

    if (data.city && !data.technologies) {
      data.city = city

      return await this.repository.search(data)
    }

    if (!data.city && data.technologies) {
      data.technologies = technologies

      data.technologies.forEach(async technology => {
        const technologyExists = await this.techSearchRepository.findByTechnology(technology)
        if (!technologyExists) {
          const newTechnology = { technology }
          await this.techSearchRepository.create(newTechnology)
        }
        await this.techSearchRepository.incrementsTechnologyCount(technology)
      })

      return await this.repository.search(data)
    }

    if (cityExist && data.technologies) {
      data.city = city
      data.technologies = technologies

      data.technologies.forEach(async technology => {
        const technologyExists = await this.techSearchRepository.findByTechnology(technology)
        if (!technologyExists) {
          const newTechnology = { technology, cities: [{ city: data.city }] }
          await this.techSearchRepository.create(newTechnology)
        }
        const technologyWithCity = { technology, 'cities.city': data.city }
        await this.techSearchRepository.incrementsTechnologyCount(technology)
        const cityInTechnology = await this.techSearchRepository.findCity(technology, city)
        if (Array.isArray(cityInTechnology) && !cityInTechnology.length) {
          await this.techSearchRepository.addCity(technology, city)
        }
        await this.techSearchRepository.incrementsCityCount(technologyWithCity)
      })

      return await this.repository.search(data)
    }

    const result = await this.repository.search(data)
    return result
  }

  async index() {
    const result = await this.repository.findAll()
    return result
  }
}

export { JobService }
