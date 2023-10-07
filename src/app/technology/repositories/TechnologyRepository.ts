import { Model } from 'mongoose'
import { TypeTechnology } from '@/technology/entities/Technology'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

class TechnologyRepository {
  constructor(private model: Model<TypeTechnology>) {}

  async create(data: TypeTechnology) {
    try {
      return this.model.create(data)
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.internalServerError)
      }
      return commonError('Database conection failed.', status.internalServerError)
    }
  }

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

  async returnId(data: TechnologyDto) {
    try {
      const result = await this.model.findOne(data).select('_id')
      if (result && result._id) {
        return result._id.toString() // Converte o _id para uma string
      } else {
        // Retornar um valor padrão ou lançar uma exceção se desejar tratar quando nenhum documento for encontrado.
        return null // ou throw new Error('Documento não encontrado');
      }
    } catch (error) {
      if (error instanceof Error) {
        return commonError(error.message, status.badRequest)
      }
      return commonError('Erro na conexão com o banco de dados.', status.internalServerError)
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