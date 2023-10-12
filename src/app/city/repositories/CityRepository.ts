import { Model } from 'mongoose'
import { TypeCity } from '@/city/entities/City'
import { CityDto } from '@/city/dtos/CityDto'
import { status } from '@/utils/status'
import { commonReturn } from '@/utils/commonReturn'

class CityRepository {
  constructor(private model: Model<TypeCity>) {}

  async create(data: TypeCity) {
    try {
      await this.model.create(data)
      return commonReturn(false, '✔️ Ok: City created!', status.created)
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

  async findOne(data: CityDto) {
    try {
      return this.model.findOne(data)
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
      return this.model.findById(id)
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

  async returnId(name: string) {
    try {
      const result = await this.model.findOne({ name }).select('_id')
      if (!result) {
        return null
      }
      return result._id.toString()
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
      return this.model.find()
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

export { CityRepository }
