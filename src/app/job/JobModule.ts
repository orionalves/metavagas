import { JobRepository } from '@/job/repositories/JobRepository.js'
import { JobService } from '@/job/services/JobService.js'
import { JobController } from '@/job/controllers/JobController.js'
import { Job } from '@/job/entities/Job.js'
import { technologyRepository } from '@/technology/TechnologyModule'
import { cityRepository } from '@/city/CityModule'

class JobModule {
  static getInstance() {
    const repository = new JobRepository(Job)
    const service = new JobService(repository, technologyRepository, cityRepository)
    const controller = new JobController(service)

    return { repository, controller }
  }
}

const jobController = JobModule.getInstance().controller
const jobRepository = JobModule.getInstance().repository

export { jobController, jobRepository }
