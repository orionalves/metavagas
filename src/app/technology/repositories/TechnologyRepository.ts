import { Model } from 'mongoose'
import { TypeTechnology } from '@/technology/entities/Technology'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

class TechnologyRepository {
  constructor(private model: Model<TypeTechnology>) {}

  async findOne(data: TechnologyDto) {
    try {
      return this.model.findOne(data)
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

export { TechnologyRepository }
