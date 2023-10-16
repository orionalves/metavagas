/* eslint-disable max-lines */
import mongoose, { Model } from 'mongoose'
import { TypeTechSearch } from '@/techSearch/entities/TechSearch'
import { status } from '@/utils/status'
import { commonReturn } from '@/utils/commonReturn'
import { TechSearchDto } from '@/techSearch/dtos/TechSearchDto'

class TechSearchRepository {
  constructor(private model: Model<TypeTechSearch>) {}

  async create(data: TechSearchDto) {
    try {
      return await this.model.create(data)
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
    }
  }

  async addCity(technology: string, city: string) {
    const update = { $push: { cities: { city, count: 0 } } }
    try {
      return await this.model.findOneAndUpdate({ technology }, update, { new: true })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
    }
  }

  async findByTechnology(technology: string) {
    try {
      return this.model.findOne({ technology })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
    }
  }

  async findCity(technology: string, city: string) {
    try {
      return this.model.find({ technology, 'cities.city': city })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
    }
  }

  async incrementsTechnologyCount(technology: string) {
    const update = { $inc: { count: 1 } }
    try {
      return this.model.findOneAndUpdate({ technology }, update, { new: true })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
    }
  }

  async incrementsCityCount(data: TechSearchDto) {
    const update = { $inc: { 'cities.$.count': 1 } }
    try {
      return this.model.findOneAndUpdate(data, update, { new: true })
    } catch (error) {
      if (error instanceof Error) {
        return commonReturn(true, `❌ Problem: ${error.message}`, status.internalServerError)
      }
    }
  }

  async findFiveTopTrends() {
    try {
      return this.model
        .find()
        .sort({ count: -1 })
        .sort({ updatedAt: 1 })
        .select('_id technology count')
        .limit(5)
        .populate({ path: 'technology', select: 'name -_id' })
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

  async findByIdAndAgregate(id: string) {
    try {
      return this.model.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'technologies',
            localField: 'technology',
            foreignField: '_id',
            as: 'technology'
          }
        },
        {
          $unwind: '$technology'
        },
        { $unwind: '$cities' },
        { $sort: { 'cities.count': -1 } },
        { $sort: { 'cities.updatedAt': -1 } },
        {
          $lookup: {
            from: 'cities',
            localField: 'cities.city',
            foreignField: '_id',
            as: 'cities.city'
          }
        },
        { $unwind: '$cities.city' },
        {
          $group: {
            _id: '$_id',
            technology: { $first: '$technology' },
            count: { $first: '$count' },
            cities: { $push: '$cities' },
            cityData: {
              $push: {
                name: '$cities.city.name',
                uf: '$cities.city.uf',
                count: '$cities.count'
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            'technology.name': 1,
            count: 1,
            cities: '$cityData'
          }
        }
      ])
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

export { TechSearchRepository }
