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

  async returnId(request: Request, response: Response) {
    // const { body } = request
    // const bodyIsValid = await technologySchemaValidation(body)
    // if (bodyIsValid.error) {
    //   return response.status(bodyIsValid.status).json(bodyIsValid)
    // }

    // const result = await this.service.returnId(body)
    const { query } = request
    const nameParam = query.name
    // const queryJson = JSON.stringify(query)
    if (typeof nameParam !== 'string') {
      return null
    }

    const tech = nameParam.split(',')
    console.log(tech)
    const result = await Promise.all(tech.map(async name => await this.service.returnId(name)))
    console.log(result)

    // const result = await this.service.returnId(queryJson)

    // if (result instanceof Object && 'error' in result) {
    //   return response.status(result.status).json(result)
    // }

    // return response.status(status.ok).json(result)
    return response.status(status.ok).json(result)
  }

  // async search(request: Request, response: Response) {
  //   const { query } = request

  //   if (Object.keys(query).length === 0) {
  //     const resultAll = await this.service.index()
  //     return response.status(status.ok).json(resultAll)
  //   }

  //   const result = await this.service.search(query)
  //   if ('error' in result) {
  //     return response.status(result.status).json(result)
  //   }
  //   return response.status(status.ok).json(result)
  // }
}

export { TechnologyController }
