import { Request, Response } from 'express'
import { userSchemaValidation } from '@/utils/validations/userSchemaValidation'
import { UserService } from '@/user/services/UserService'
import { status } from '@/utils/status'
import { UserUpdate } from '../dtos/UserDto'
import { userUpdateValidation } from '@/utils/validations/userUpdateValidation'

class UserController {
  constructor(private service: UserService) {}

  async create(request: Request, response: Response) {
    const { body } = request
    const bodyIsValid = await userSchemaValidation(body)
    if (bodyIsValid.error) {
      return response.status(bodyIsValid.status).json(bodyIsValid)
    }

    const result = await this.service.create(body)

    if ('error' in result) {
      return response.status(result.status).json(result)
    }

    return response.status(status.created).json(result)
  }

  async update(request: Request, response: Response) {
    const { body } = request
    const bodyIsValid = await userUpdateValidation(body)
    if (bodyIsValid.error) {
      return response.status(bodyIsValid.status).json(bodyIsValid)
    }

    const { params } = request

    const data: UserUpdate = {
      id: params.id,
      name: body.name,
      password: body.password,
      oldPassword: body.oldPassword
    }

    const result = await this.service.update(data)

    if (result !== null && 'error' in result) {
      return response.status(result.status).json(result)
    }
    const payload = {
      id: result?._id,
      name: result?.name,
      email: result?.email
    }
    return response.status(status.ok).json(payload)
  }
}

export { UserController }
