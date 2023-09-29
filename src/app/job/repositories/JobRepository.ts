import { Model } from 'mongoose'
import { TypeJob } from '@/job/entities/Job'
import { JobDto } from '@/job/dtos/JobDto'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

class JobRepository {
  constructor(private model: Model<TypeJob>) {}

  async findOne(data: JobDto) {
    try {
      return this.model.findOne(data)
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }

  async create(data: TypeJob) {
    try {
      return this.model.create(data)
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }

  async findById(id: string) {
    try {
      return this.model.findById(id)
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }

  async findAll() {
    try {
      return this.model.find()
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }

  async search(data: Partial<JobDto>) {
    try {
      return await this.model.find({
        $and: [
          { jobTitle: { $regex: '.*' + data.jobTitle + '.*', $options: 'i' } },
          { company: { $regex: '.*' + data.company + '.*', $options: 'i' } },
          { technologies: { $regex: '.*' + data.technologies + '.*', $options: 'i' } },
          { city: { $regex: '.*' + data.city + '.*', $options: 'i' } },
          { site: { $regex: '.*' + data.site + '.*', $options: 'i' } },
          { jobType: { $regex: '.*' + data.jobType + '.*', $options: 'i' } },
          { workRegime: { $regex: '.*' + data.workRegime + '.*', $options: 'i' } },
          { companySize: { $regex: '.*' + data.companySize + '.*', $options: 'i' } },
          { salary: data.salary },
          { experienceLevel: { $regex: '.*' + data.experienceLevel + '.*', $options: 'i' } },
          { description: { $regex: '.*' + data.description + '.*', $options: 'i' } }
        ]
      })
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }
}

export { JobRepository }
