import { TypeUser } from '@/user/entities/User'
import { commonReturn } from '@/utils/commonReturn'
import { status } from '@/utils/status'
import { Model } from 'mongoose'
import { UserUpdate } from '@/user/dtos/UserDto'

class UserRepository {
  constructor(private model: Model<TypeUser>) {}

  async create(data: TypeUser) {
    try {
      // Retorno do que aparece no json
      return this.model.create(data)
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  async findById(id: string) {
    try {
      return this.model.findById(id)
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  async findByEmail(email: string) {
    try {
      return this.model.findOne({ email })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  async update(data: UserUpdate) {
    const update = { name: data.name, password: data.password }
    try {
      return this.model.findByIdAndUpdate(data.id, update, { new: true })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  // async findAll() {
  //   try {
  //     return this.model.find().populate('')
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return commonReturn(true,`❌ Problem: ${error.message}`, status.internalServerError)
  //     }
  //     return commonReturn(true,'Database conection failed.', status.internalServerError)
  //   }
  // }
}

export { UserRepository }
