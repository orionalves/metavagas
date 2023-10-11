import { Model } from 'mongoose'
import { TypeTechSearch } from '@/techSearch/entities/TechSearch'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

class TechSearchRepository {
  constructor(private model: Model<TypeTechSearch>) {}

  async create(data: TypeTechSearch) {
    try {
      return this.model.create(data)
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }

  async findTechnology(technology: string) {
    try {
      return this.model.findOne({ technology })
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
}

export { TechSearchRepository }
