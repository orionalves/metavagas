/* eslint-disable max-lines */
import { TypeUser } from '@/user/entities/User'
import { commonReturn } from '@/utils/commonReturn'
import { status } from '@/utils/status'
import mongoose, { Model } from 'mongoose'
import { UserFavorite, UserUpdate } from '@/user/dtos/UserDto'

class UserRepository {
  constructor(private model: Model<TypeUser>) {}

  async create(data: TypeUser) {
    try {
      await this.model.create(data)
      return commonReturn(false, '✔️ Ok: User created!', status.created)
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

  async showFavorite(id: string) {
    try {
      // return this.model.findById(id)
      return this.model.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $unwind: '$favorites'
        },
        {
          $lookup: {
            from: 'jobs', // Nome da coleção "jobs" no seu banco de dados
            localField: 'favorites',
            foreignField: '_id',
            as: 'favorites'
          }
        },
        {
          $unwind: '$favorites'
        },
        {
          $lookup: {
            from: 'technologies', // Nome da coleção "technologies" no seu banco de dados
            localField: 'favorites.technologies',
            foreignField: '_id',
            as: 'favorites.technologies'
          }
        },
        {
          $lookup: {
            from: 'cities', // Nome da coleção "cities" no seu banco de dados
            localField: 'favorites.city',
            foreignField: '_id',
            as: 'favorites.city'
          }
        },
        {
          $unwind: '$favorites.city'
        },
        {
          $project: {
            favorites: {
              position: 1,
              company: 1,
              technologies: { name: 1 },
              city: { name: 1, uf: 1 },
              link: 1,
              jobType: 1,
              workRegime: 1,
              salary: 1,
              experienceLevel: 1,
              description: 1
            }
          }
        }
      ])
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  async toggleFavorite(data: UserFavorite) {
    const favorite = { favorites: data.favorite }
    try {
      if (data.remove) {
        await this.model.findByIdAndUpdate(data.id, { $pull: favorite }, { new: true })
        return commonReturn(false, '✔️ Ok: Unfavourited!', status.ok)
      }
      await this.model.findByIdAndUpdate(data.id, { $push: favorite }, { new: true })
      return commonReturn(false, '✔️ Ok: Favourited!', status.ok)
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  async findFavorite(id: string) {
    try {
      return this.model.findOne({ favorites: [id] })
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
