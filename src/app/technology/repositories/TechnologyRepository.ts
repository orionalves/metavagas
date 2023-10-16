import { Model } from 'mongoose'
import { TypeTechnology } from '@/technology/entities/Technology'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { status } from '@/utils/status'
import { commonReturn } from '@/utils/commonReturn'

class TechnologyRepository {
  constructor(private model: Model<TypeTechnology>) {}

  async create(data: TechnologyDto) {
    try {
      this.model.create(data)
      return commonReturn(false, '✔️ Ok: Technology created!', status.created)
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }

  async findOne(data: TechnologyDto) {
    try {
      return this.model.findOne(data).select('name _id')
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }

  async returnId(data: TechnologyDto) {
    try {
      const result = await this.model.findOne(data).select('_id')
      if (result && result._id) {
        return result._id.toString()
      } else {
        return null
      }
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
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
      return this.model.find().select('name _id').sort({ name: 1 })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(
        true,
        '❌ Problem: Database conection failed.',
        status.internalServerError
      )
    }
  }
}

export { TechnologyRepository }
