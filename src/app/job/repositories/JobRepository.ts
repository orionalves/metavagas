/* eslint-disable max-lines */
import { Model } from 'mongoose'
import { TypeJob } from '@/job/entities/Job'
import { JobDto, JobSearch } from '@/job/dtos/JobDto'
import { status } from '@/utils/status'
import { commonReturn } from '@/utils/commonReturn'

class JobRepository {
  constructor(private model: Model<TypeJob>) {}

  async findOne(data: JobDto) {
    try {
      return this.model
        .findOne(data)
        .populate({ path: 'technologies', select: 'name -_id' })
        .populate({ path: 'city', select: 'name uf -_id' })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, error.message, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }

  async create(data: JobDto) {
    try {
      this.model.create(data)
      return commonReturn(false, '✔️ Ok: Job created!', status.created)
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, error.message, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }

  async findById(id: string) {
    try {
      return this.model
        .findById(id)
        .populate({ path: 'technologies', select: 'name -_id' })
        .populate({ path: 'city', select: 'name uf -_id' })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, error.message, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }

  async findAll() {
    try {
      return this.model
        .find()
        .populate({ path: 'technologies', select: 'name -_id' })
        .populate({ path: 'city', select: 'name uf -_id' })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, error.message, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }

  async search(data: JobSearch) {
    try {
      return await this.model
        .find(
          {
            position: { $regex: '^.*' + data.position + '.*$', $options: 'i' },
            technologies: data.technologies,
            city: { $regex: data.city + '.*$', $options: 'i' },
            jobType: data.jobType,
            workRegime: data.workRegime,
            companySize: data.companySize,
            salary: { $gte: data.minSalary, $lte: data.maxSalary },
            // $and: [{ salary: { $gte: data.minSalary, $lte: data.maxSalary } }]
            experienceLevel: data.experienceLevel
          }
          // query
        )
        .populate({ path: 'technologies', select: 'name -_id' })
        .populate({ path: 'city', select: 'name uf -_id' })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, error.message, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }
}

export { JobRepository }
