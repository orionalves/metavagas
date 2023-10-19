import { commonReturn } from '@/utils/commonReturn'
import { status } from '@/utils/status.js'
import { jwtVerify } from '@/utils/jwtVerify'
import { Request, Response, NextFunction } from 'express'

class AuthMiddleware {
  static async handler(request: Request, response: Response, next: NextFunction) {
    if (!process.env.JWT_SECRET_KEY) {
      return commonReturn(
        true,
        '❌ Problem: Environment configuration failed: secretKey not found.',
        status.internalServerError
      )
    }
    const { headers } = request

    if (!headers.authorization) {
      return response
        .status(status.unauthorized)
        .json(commonReturn(true, '❌ Problem: Unauthorized!', status.unauthorized))
    }

    const [, token] = headers.authorization.split(' ')

    try {
      jwtVerify(token, process.env.JWT_SECRET_KEY)
    } catch {
      return response
        .status(status.unauthorized)
        .json(commonReturn(true, '❌ Problem: Unauthorized!', status.unauthorized))
    }

    next()
  }
}

export { AuthMiddleware }
