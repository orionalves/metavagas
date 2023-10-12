import { Request, Response } from 'express'
import { technologySchemaValidation } from '@/utils/validations/technologySchemaValidation'
import { TechnologyService } from '@/technology/services/TechnologyService'
import { status } from '@/utils/status'

class TechnologyController {
  constructor(private service: TechnologyService) {}

  async create(request: Request, response: Response) {
    const { body } = request
    const bodyIsValid = await technologySchemaValidation(body)
    if (bodyIsValid.error) {
      return response.status(bodyIsValid.status).json(bodyIsValid)
    }

    const result = await this.service.create(body)

    if ('error' in result) {
      return response.status(result.status).json(result)
    }

    return response.status(status.created).json(result)
  }

  async index(request: Request, response: Response) {
    const result = await this.service.index()
    return response.status(status.ok).json(result)
  }
}

export { TechnologyController }
