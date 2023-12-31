import { JobRepository } from '@/job/repositories/JobRepository.js'
import { JobService } from '@/job/services/JobService.js'
import { JobController } from '@/job/controllers/JobController.js'
import { Job } from '@/job/entities/Job.js'
import { technologyRepository } from '@/technology/TechnologyModule'
import { cityRepository } from '@/city/CityModule'
import { techSearchRepository } from '@/techSearch/TechSearchModule'
import { userRepository } from '@/user/UserModule'

class JobModule {
  static getInstance() {
    const repository = new JobRepository(Job)
    const service = new JobService(
      repository,
      technologyRepository,
      userRepository,
      cityRepository,
      techSearchRepository
    )
    const controller = new JobController(service)

    return { repository, controller }
  }
}

const jobController = JobModule.getInstance().controller
const jobRepository = JobModule.getInstance().repository

export { jobController, jobRepository }
