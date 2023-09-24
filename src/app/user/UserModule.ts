import { UserRepository } from '@/user/repositories/UserRepository.js'
import { UserService } from '@/user/services/UserService.js'
import { UserController } from '@/user/controllers/UserController.js'
import { User } from '@/user/entities/User.js'

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
