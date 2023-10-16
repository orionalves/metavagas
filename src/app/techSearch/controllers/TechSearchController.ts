import { Request, Response } from 'express'
import { TechSearchService } from '@/techSearch/services/TechSearchService'
import { status } from '@/utils/status'

class TechSearchController {
  constructor(private service: TechSearchService) {}

  async topTrends(request: Request, response: Response) {
    const result = await this.service.topTrends()
    if ('error' in result) {
      return response.status(result.status).json(result)
    }
    return response.status(status.ok).json(result)
  }

  async topCities(request: Request, response: Response) {
    const { params } = request
    const id = params.id
    const result = await this.service.topCities(id)
    if ('error' in result) {
      return response.status(result.status).json(result)
    }
    return response.status(status.ok).json(result)
  }
}

export { TechSearchController }
