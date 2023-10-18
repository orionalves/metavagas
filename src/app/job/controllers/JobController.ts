import { Request, Response } from 'express'
import { jobSchemaValidation } from '@/utils/validations/jobSchemaValidation'
import { JobService } from '@/job/services/JobService'
import { status } from '@/utils/status'
import { jobSearchValidation } from '@/utils/validations/jobSearchValidation'

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

    const queryIsValid = await jobSearchValidation(query)
    if (queryIsValid.error) {
      return response.status(queryIsValid.status).json(queryIsValid)
    }

    const result = await this.service.search(query)
    if ('error' in result) {
      return response.status(result.status).json(result)
    }
    return response.status(status.ok).json(result)
  }

  async topFiveCities(request: Request, response: Response) {
    const { params } = request
    const id = params.id

    const result = await this.service.topFiveCities(id)

    if ('error' in result) {
      return response.status(result.status).json(result)
    }

    return response.status(status.ok).json(result)
  }
}

export { JobController }
