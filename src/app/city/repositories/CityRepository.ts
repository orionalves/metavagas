import { Model } from 'mongoose'
import { TypeCity } from '@/city/entities/City'
import { CityDto } from '@/city/dtos/CityDto'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

class CityRepository {
  constructor(private model: Model<TypeCity>) {}

  async create(data: TypeCity) {
    try {
      return this.model.create(data)
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }

  async findOne(data: CityDto) {
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

  async returnId(data: string) {
    try {
      const result = await this.model.findOne({ name: data }).select('_id')
      if (!result) {
        return null
      }
      return result._id.toString()
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.badRequest)
      }
      return commonError('Erro na conexão com o banco de dados.', status.internalServerError)
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

export { CityRepository }
