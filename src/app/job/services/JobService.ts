import { commonError } from '@/utils/commonError'
import { JobRepository } from '@/job/repositories/JobRepository'
import { status } from '@/utils/status'
import { JobDto } from '@/job/dtos/JobDto'
import { TypeJob } from '@/job/entities/Job'

class JobService {
  constructor(private repository: JobRepository) {}

  async create(data: JobDto) {
    const jobAlreadyExist = await this.repository.findOne(data)
    if (jobAlreadyExist) {
      return commonError('This job already exist.', status.badRequest)
    }

    const result = await this.repository.create(data as TypeJob)
    return result
  }

  async index() {
    const result = await this.repository.findAll()
    return result
  }
}

export { JobService }
