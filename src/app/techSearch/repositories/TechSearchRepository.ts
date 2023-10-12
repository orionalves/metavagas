import { Model } from 'mongoose'
import { TypeTechSearch } from '@/techSearch/entities/TechSearch'
import { status } from '@/utils/status'
import { commonReturn } from '@/utils/commonReturn'

class TechSearchRepository {
  constructor(private model: Model<TypeTechSearch>) {}

  async create(data: TypeTechSearch) {
    try {
      await this.model.create(data)
      return commonReturn(false, '✔️ Ok: TechSearch salved!', status.created)
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

  async findTechnology(technology: string) {
    try {
      return this.model.findOne({ technology }).populate('Technology').populate('City')
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
      return this.model.findById(id).populate('Technology').populate('City')
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
      return this.model.find().populate('Technology').populate('City')
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

  async count(id: string) {
    try {
      return this.model.findByIdAndUpdate(id, { $inc: { count: 1 } })
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

export { TechSearchRepository }
