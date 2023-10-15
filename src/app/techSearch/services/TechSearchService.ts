/* eslint-disable max-lines */
import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'
// import { status } from '@/utils/status'
// import { TechSearchDto } from '@/techSearch/dtos/TechSearchDto'
// import { TechnologyRepository } from '@/technology/repositories/TechnologyRepository'
// import { CityRepository } from '@/city/repositories/CityRepository'
// import { commonReturn } from '@/utils/commonReturn'

class TechSearchService {
  constructor(private repository: TechSearchRepository) {}

  // async search(data: JobSearch) {
  //   const cityExist = data.city ? await this.cityRepository.returnId(data.city) : null
  //   const city = typeof cityExist === 'string' ? cityExist : '000000000000000000000000'

  //   const queryTechnologies = data.technologies
  //     ? await Promise.all(
  //       data.technologies.map(name => this.technologyRepository.returnId({ name }))
  //     )
  //     : []
  //   const technologies = queryTechnologies.filter(item => typeof item === 'string') as string[]

  //   if (data.city && !data.technologies) {
  //     data.city = city

  //     return await this.repository.search(data)
  //   }

  //   if (!data.city && data.technologies) {
  //     data.technologies = technologies

  //     data.technologies.forEach(async technology => {
  //       const technologyExists = await this.techSearchRepository.findByTechnology(technology)
  //       if (!technologyExists) {
  //         const newTechnology = { technology }
  //         await this.techSearchRepository.create(newTechnology)
  //       }
  //       await this.techSearchRepository.incrementsTechnologyCount(technology)
  //     })

  //     return await this.repository.search(data)
  //   }

  //   if (cityExist && data.technologies) {
  //     data.city = city
  //     data.technologies = technologies

  //     data.technologies.forEach(async technology => {
  //       const technologyExists = await this.techSearchRepository.findByTechnology(technology)
  //       if (!technologyExists) {
  //         const newTechnology = { technology, cities: [{ city: data.city }] }
  //         await this.techSearchRepository.create(newTechnology)
  //       }
  //       const technologyWithCity = { technology, 'cities.city': data.city }
  //       await this.techSearchRepository.incrementsTechnologyCount(technology)
  //       const cityInTechnology = await this.techSearchRepository.findCity(technology, city)
  //       if (Array.isArray(cityInTechnology) && !cityInTechnology.length) {
  //         await this.techSearchRepository.addCity(technology, city)
  //       }
  //       await this.techSearchRepository.incrementsCityCount(technologyWithCity)
  //     })

  //     return await this.repository.search(data)
  //   }

  //   const result = await this.repository.search(data)
  //   return result
  // }

  async topTrends() {
    const result = await this.repository.findFiveTopTrends()
    return result
  }

  async topCities(data: string) {
    const result = await this.repository.findByIdAndAgregate(data)
    return result
  }
}

export { TechSearchService }
