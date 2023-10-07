import { Model } from 'mongoose'
import { TypeJob } from '@/job/entities/Job'
import { JobDto, JobSearch } from '@/job/dtos/JobDto'
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

  async create(data: JobDto) {
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

  async search(data: JobSearch) {
    // const query: JobSearch = {}
    // if (data.position) {
    //   query.position = { $regex: '.*' + data.position + '.*', $options: 'i' } as unknown as string
    // }
    // if (data.technologies) {
    //   query.technologies = data.technologies
    // }
    // if (data.city) {
    //   query.city = { $regex: data.city + '.*', $options: 'i' } as unknown as string
    // }
    // if (data.jobType) {
    //   query.jobType = data.jobType
    // }
    // if (data.workRegime) {
    //   query.workRegime = data.workRegime
    // }
    // if (data.companySize) {
    //   query.companySize = data.companySize
    // }
    // if (data.minSalary || data.maxSalary) {
    //   query.salary = { $gte: data.minSalary, $lte: data.maxSalary } as unknown as number
    // }
    // if (data.experienceLevel) {
    //   query.experienceLevel = data.experienceLevel
    // }
    try {
      return await this.model.find(
        {
          // position: { $regex: '.*' + data.position + '.*', $options: 'i' },
          // technologies: data.technologies,
          // city: { $regex: data.city + '.*', $options: 'i' },
          // jobType: data.jobType,
          // workRegime: data.workRegime,
          // companySize: data.companySize,
          salary: { $gte: data.minSalary, $lte: data.maxSalary }
          // $and: [{ salary: { $gte: data.minSalary, $lte: data.maxSalary } }]
          // experienceLevel: data.experienceLevel
        }
        // query
      )
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }
}

export { JobRepository }
