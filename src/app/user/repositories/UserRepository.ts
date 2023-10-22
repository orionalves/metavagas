/* eslint-disable max-lines */
import { TypeUser } from '@/user/entities/User'
import { commonReturn } from '@/utils/commonReturn'
import { status } from '@/utils/status'
import mongoose, { Model } from 'mongoose'
import { UserFavorite, UserPage, UserUpdate } from '@/user/dtos/UserDto'

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

  async showHistory(id: string, data: UserPage) {
    const page = data.page || 1
    const perPage = data.perPage || 10
    try {
      const result = await this.model.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $unwind: '$history'
        },
        {
          $lookup: {
            from: 'jobs',
            localField: 'history',
            foreignField: '_id',
            as: 'history'
          }
        },
        {
          $unwind: '$history'
        },
        {
          $lookup: {
            from: 'technologies',
            localField: 'history.technologies',
            foreignField: '_id',
            as: 'history.technologies'
          }
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'history.city',
            foreignField: '_id',
            as: 'history.city'
          }
        },
        {
          $unwind: '$history.city'
        },
        {
          $project: {
            history: {
              position: 1,
              company: 1,
              technologies: { name: 1 },
              city: { name: 1, uf: 1 },
              link: 1,
              jobType: 1,
              workRegime: 1,
              companySize: 1,
              salary: 1,
              experienceLevel: 1,
              description: 1
            }
          }
        },
        {
          $facet: {
            metadata: [
              { $count: 'totalDocuments' },
              {
                $addFields: {
                  totalPages: { $ceil: { $divide: ['$totalDocuments', Number(perPage)] } },
                  page: Number(page)
                }
              }
            ],
            data: [{ $skip: (Number(page) - 1) * Number(perPage) }, { $limit: Number(perPage) }]
          }
        }
      ])
      result[0].metadata = { ...result[0].metadata[0], count: result[0].data.length }
      return result
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  async handdlerHistory(id: string, data: string[]) {
    const maxHistory = 4

    try {
      await this.model.findByIdAndUpdate(
        id,
        { $unset: { [`history.${maxHistory}`]: 1 } },
        { new: true }
      )
      await this.model.findByIdAndUpdate(id, { $pull: { history: null } }, { new: true })
      return await this.model.findByIdAndUpdate(
        id,
        { $push: { history: { $each: [data], $position: 0 } } },
        { new: true }
      )
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }

  async showFavorite(id: string) {
    try {
      return this.model.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $unwind: '$favorites'
        },
        {
          $lookup: {
            from: 'jobs',
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
            from: 'technologies',
            localField: 'favorites.technologies',
            foreignField: '_id',
            as: 'favorites.technologies'
          }
        },
        {
          $lookup: {
            from: 'cities',
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
              companySize: 1,
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
      return this.model.find({ favorites: [id] })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
      return commonReturn(true, 'Database conection failed.', status.internalServerError)
    }
  }
}

export { UserRepository }
