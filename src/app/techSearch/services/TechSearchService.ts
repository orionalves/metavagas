import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'

class TechSearchService {
  constructor(private repository: TechSearchRepository) {}

  async topTrends() {
    const result = await this.repository.findFiveTopTrends()
    return result
  }
}

export { TechSearchService }
