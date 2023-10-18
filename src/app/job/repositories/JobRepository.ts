/* eslint-disable max-lines */
import mongoose, { Model } from 'mongoose'
import { TypeJob } from '@/job/entities/Job'
import { JobDto, JobSearch } from '@/job/dtos/JobDto'
import { status } from '@/utils/status'
import { commonReturn } from '@/utils/commonReturn'

class JobRepository {
  constructor(private model: Model<TypeJob>) {}

  async findOne(data: JobDto) {
    try {
      return this.model
        .findOne(data)
        .populate({ path: 'technologies', select: 'name -_id' })
        .populate({ path: 'city', select: 'name uf -_id' })
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

  async create(data: JobDto) {
    try {
      this.model.create(data)
      return commonReturn(false, '✔️ Ok: Job created!', status.created)
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

  async search(data: JobSearch) {
    const technologiesIds = data.technologies
      ? data.technologies.map(tech => new mongoose.Types.ObjectId(tech))
      : undefined
    const page = data.page || 1
    const perPage = data.perPage || 10
    try {
      return await this.model
        // .find({
        //   ...(data.position
        //     ? { position: { $regex: '.*' + data.position + '.*', $options: 'i' } }
        //     : {}),
        //   ...(data.technologies ? { technologies: { $in: data.technologies } } : {}),
        //   ...(data.city ? { city: data.city } : {}),
        //   ...(data.jobType ? { jobType: data.jobType } : {}),
        //   ...(data.workRegime ? { workRegime: data.workRegime } : {}),
        //   ...(data.experienceLevel ? { experienceLevel: data.experienceLevel } : {}),
        //   salary: {
        //     ...(data.minSalary ? { $gte: data.minSalary } : {}),
        //     ...(data.maxSalary ? { $lte: data.maxSalary } : {}),
        //     ...(!(data.minSalary && data.maxSalary) ? { $exists: true } : {})
        //   }
        // })
        // .populate({ path: 'technologies', select: 'name -_id' })
        // .populate({ path: 'city', select: 'name uf -_id' })
        .aggregate([
          {
            $match: {
              $and: [
                data.position
                  ? { position: { $regex: '.*' + data.position + '.*', $options: 'i' } }
                  : {},
                technologiesIds ? { technologies: { $in: technologiesIds } } : {},
                data.city ? { city: new mongoose.Types.ObjectId(data.city) } : {},
                data.jobType ? { jobType: data.jobType } : {},
                data.workRegime ? { workRegime: data.workRegime } : {},
                data.companySize ? { companySize: data.companySize } : {},
                data.experienceLevel ? { experienceLevel: data.experienceLevel } : {},
                {
                  $and: [
                    data.minSalary ? { salary: { $gte: Number(data.minSalary) } } : {},
                    data.maxSalary ? { salary: { $lte: Number(data.maxSalary) } } : {},
                    !data.minSalary && !data.maxSalary ? { salary: { $exists: true } } : {}
                  ]
                }
              ]
            }
          },
          {
            $lookup: {
              from: 'technologies',
              localField: 'technologies',
              foreignField: '_id',
              as: 'technologies'
            }
          },
          {
            $lookup: {
              from: 'cities',
              localField: 'city',
              foreignField: '_id',
              as: 'city'
            }
          },
          {
            $unwind: '$city'
          },
          {
            $sort: { updatedAt: -1 }
          },
          {
            $project: {
              position: 1,
              company: 1,
              technologies: { name: 1 },
              city: {
                name: '$city.name',
                uf: '$city.uf'
              },
              link: 1,
              jobType: 1,
              workRegime: 1,
              companySize: 1,
              salary: 1,
              experienceLevel: 1,
              description: 1
            }
          },
          {
            $facet: {
              metadata: [
                { $count: 'total' },
                {
                  $addFields: {
                    totalPages: { $ceil: { $divide: ['$total', Number(perPage)] } },
                    page: Number(page),
                    perPage: Number(perPage)
                  }
                }
              ],
              data: [{ $skip: (Number(page) - 1) * Number(perPage) }, { $limit: Number(perPage) }]
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

  async topFiveCities(technology: string) {
    try {
      return await this.model.aggregate([
        {
          $match: {
            technologies: new mongoose.Types.ObjectId(technology)
          }
        },
        {
          $group: {
            _id: '$city',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 5
        },
        {
          $lookup: {
            from: 'cities',
            localField: '_id',
            foreignField: '_id',
            as: 'city'
          }
        },
        {
          $unwind: '$city'
        },
        {
          $project: {
            _id: 1,
            count: 1,
            city: '$city.name',
            uf: '$city.uf'
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

export { JobRepository }
