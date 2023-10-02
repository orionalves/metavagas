import { Request, Response } from 'express'
import { jobSchemaValidation } from '@/utils/validations/jobSchemaValidation'
import { JobService } from '@/job/services/JobService'
import { status } from '@/utils/status'

class JobController {
  constructor(private service: JobService) {}

  async create(request: Request, response: Response) {
    const { body } = request
    const bodyIsValid = await jobSchemaValidation(body)
    if (bodyIsValid.error) {
      return response.status(bodyIsValid.status).json(bodyIsValid)
    }

    const result = await this.service.create(body)

    if ('error' in result) {
      return response.status(result.status).json(result)
    }

    return response.status(status.created).json(result)
  }

  async search(request: Request, response: Response) {
    const { query } = request

    if (Object.keys(query).length === 0) {
      const resultAll = await this.service.index()
      return response.status(status.ok).json(resultAll)
    }

    const result = await this.service.search(query)
    if ('error' in result) {
      return response.status(result.status).json(result)
    }
    return response.status(status.ok).json(result)
  }
}

export { JobController }
