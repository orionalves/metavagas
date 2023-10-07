import { TechnologyRepository } from '@/technology/repositories/TechnologyRepository'
import { TechnologyService } from '@/technology/services/TechnologyService'
import { TechnologyController } from '@/technology/controllers/TechnologyController'
import { Technology } from '@/technology/entities/Technology'

class TechnologyModule {
  static getInstance() {
    const repository = new TechnologyRepository(Technology)
    const service = new TechnologyService(repository)
    const controller = new TechnologyController(service)

    return { repository, controller }
  }
}

const technologyController = TechnologyModule.getInstance().controller
const technologyRepository = TechnologyModule.getInstance().repository

export { technologyController, technologyRepository }
