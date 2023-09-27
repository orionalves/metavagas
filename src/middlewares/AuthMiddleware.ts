import { commonError } from '@/utils/commonError.js'
import { status } from '@/utils/status.js'
import { jwtVerify } from '@/utils/jwtVerify'
import { Request, Response, NextFunction } from 'express'

class AuthMiddleware {
  static async handler(request: Request, response: Response, next: NextFunction) {
    if (!process.env.JWT_SECRET_KEY) {
      return commonError(
        'Environment configuration failed: secretKey not found.',
        status.internalServerError
      )
    }
    const { headers } = request

    if (!headers.authorization) {
      return response
        .status(status.unauthorized)
        .json(commonError('Unauthorized!', status.unauthorized))
    }

    const [, token] = headers.authorization.split(' ')

    try {
      // JWT.verify(token, process.env.JWT_SECRET_KEY)
      jwtVerify(token, process.env.JWT_SECRET_KEY)
    } catch {
      return response
        .status(status.unauthorized)
        .json(commonError('Unauthorized!', status.unauthorized))
    }

    next()
  }
}

export { AuthMiddleware }
