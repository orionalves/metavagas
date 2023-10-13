/* eslint-disable max-lines */
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
    if (data.city && data.technologies) {
      const city = await this.cityRepository.returnId(data.city)

      const technologies = await Promise.all(
        data.technologies.map(name => this.technologyRepository.returnId({ name }))
      )
      const technologiesExists = technologies.some(item => typeof item === 'string')

      if (typeof city !== 'string' && (technologies.includes(null) || !technologiesExists)) {
        return await this.repository.search(data)
      }

      if (typeof city !== 'string') {
        data = { ...data, technologies: technologies as string[] }
        return await this.repository.search(data)
      }

      if (technologies.includes(null) || !technologiesExists) {
        data = { ...data, city }
        return await this.repository.search(data)
      }

      data = { ...data, city, technologies: technologies as string[] }
      if (data.technologies) {
        data.technologies.forEach(async technology => {
          const technologyExists = await this.techSearchRepository.findByTechnology(technology)
          if (!technologyExists && data.city) {
            const newTechnology = { technology, cities: [data.city] }
            await this.techSearchRepository.create(newTechnology)
          }
          console.log(technologyExists)
          console.log('Acrescentar 1 número')
        })
      }
      // data.technologies.forEach(technology => {
      //   console.log(`{ technology: '${technology}', city: '${data.city}' }`)
      // })

      return await this.repository.search(data)
    }

    if (data.city && !data.technologies) {
      const city = await this.cityRepository.returnId(data.city)
      if (typeof city !== 'string') {
        return await this.repository.search(data)
      }
      data = { ...data, city }
      return await this.repository.search(data)
    }

    if (!data.city && data.technologies) {
      const technologies = await Promise.all(
        data.technologies.map(name => this.technologyRepository.returnId({ name }))
      )

      const technologiesExists = technologies.some(item => typeof item === 'string')
      if (technologies.includes(null) || !technologiesExists) {
        return await this.repository.search(data)
      }
      data = { ...data, technologies: technologies as string[] }
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
