import { userRepository } from '@/user/UserModule'
import { AuthService } from '@/auth/services/AuthService'
import { AuthController } from '@/auth/controllers/AuthController'

class AuthModule {
  static getInstance() {
    const service = new AuthService(userRepository)
    const controller = new AuthController(service)

    return { controller }
  }
}

const authController = AuthModule.getInstance().controller

export { authController }
