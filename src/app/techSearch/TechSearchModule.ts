import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository.js'
import { TechSearchService } from '@/techSearch/services/TechSearchService.js'
import { TechSearchController } from '@/techSearch/controllers/TechSearchController.js'
import { TechSearch } from '@/techSearch/entities/TechSearch.js'

class TechSearchModule {
  static getInstance() {
    const repository = new TechSearchRepository(TechSearch)
    const service = new TechSearchService(repository)
    const controller = new TechSearchController(service)

    return { repository, controller }
  }
}

const techSearchController = TechSearchModule.getInstance().controller
const techSearchRepository = TechSearchModule.getInstance().repository

export { techSearchRepository, techSearchController }
