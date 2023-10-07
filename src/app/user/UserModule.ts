import { UserRepository } from '@/user/repositories/UserRepository'
import { UserService } from '@/user/services/UserService'
import { UserController } from '@/user/controllers/UserController'
import { User } from '@/user/entities/User'

class UserModule {
  static getInstance() {
    const repository = new UserRepository(User)
    const service = new UserService(repository)
    const controller = new UserController(service)

    return { repository, controller }
  }
}

const userController = UserModule.getInstance().controller
const userRepository = UserModule.getInstance().repository

export { userController, userRepository }
