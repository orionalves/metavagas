import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'

class TechSearchService {
  constructor(private repository: TechSearchRepository) {}

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
