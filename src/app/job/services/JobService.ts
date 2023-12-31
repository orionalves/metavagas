import { JobRepository } from '@/job/repositories/JobRepository'
import { status } from '@/utils/status'
import { JobDto, JobSearch } from '@/job/dtos/JobDto'
import { TechnologyRepository } from '@/technology/repositories/TechnologyRepository'
import { UserRepository } from '@/user/repositories/UserRepository'
import { CityRepository } from '@/city/repositories/CityRepository'
import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'
import { commonReturn } from '@/utils/commonReturn'

class JobService {
  constructor(
    private repository: JobRepository,
    private technologyRepository: TechnologyRepository,
    private userRepository: UserRepository,
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

  async search(id: string, data: JobSearch) {
    const cityExist = data.city ? await this.cityRepository.returnId(data.city) : null
    const city = typeof cityExist === 'string' ? cityExist : '000000000000000000000000'
    data.city = cityExist ? city : undefined

    const queryTechnologies = data.technologies
      ? await Promise.all(
          data.technologies.map(name => this.technologyRepository.returnId({ name }))
        )
      : []
    const technologies = queryTechnologies.filter(item => typeof item === 'string') as string[]

    data.technologies = technologies.length === 0 ? undefined : technologies

    if (!data.technologies) {
      const result = await this.repository.search(data)

      if (Array.isArray(result) && result.length > 0 && 'data' in result[0]) {
        const historyData: { _id: string }[] = result[0].data
        const idsArray = historyData.map(item => item._id.toString())
        await this.userRepository.handdlerHistory(id, idsArray)
      }

      return result
    }

    data.technologies.forEach(async technology => {
      const technologyExists = await this.techSearchRepository.findByTechnology(technology)
      if (!technologyExists) {
        const newTechnology = { technology }
        await this.techSearchRepository.create(newTechnology)
      }
      await this.techSearchRepository.incrementsTechnologyCount(technology)
    })

    const result = await this.repository.search(data)

    if (Array.isArray(result) && result.length > 0 && 'data' in result[0]) {
      const historyData: { _id: string }[] = result[0].data
      const idsArray = historyData.map(item => item._id.toString())
      await this.userRepository.handdlerHistory(id, idsArray)
    }

    return result
  }

  async topFiveCities(technology: string) {
    return this.repository.topFiveCities(technology)
  }
}

export { JobService }
