import { Request, Response } from 'express'
import { loginSchemaValidation } from '@/utils/validations/loginSchemaValidation'
import { AuthService } from '@/auth/services/AuthService'
import { status } from '@/utils/status'

class AuthController {
  constructor(private service: AuthService) {}

  async login(request: Request, response: Response) {
    const { body } = request

    const bodyIsValid = await loginSchemaValidation(body)
    if (bodyIsValid.error) {
      return response.status(bodyIsValid.status).json(bodyIsValid)
    }

    const result = await this.service.login(body)

    if ('error' in result) {
      return response.status(result.status).json(result)
    }

    return response.status(status.ok).json(result)
  }
}

export { AuthController }
