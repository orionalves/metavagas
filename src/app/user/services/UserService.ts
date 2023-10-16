import { hashPassword } from '@/utils/hashPassword'
import { commonError } from '@/utils/commonError'
import { UserRepository } from '@/user/repositories/UserRepository'
import { TypeUser } from '@/user/entities/User'
import { status } from '@/utils/status'

class UserService {
  constructor(private repository: UserRepository) {}

  async create(data: TypeUser) {
    const userAlreadyExist = await this.repository.findByEmail(data.email)
    if (userAlreadyExist) {
      return commonError('This email already exist.', status.badRequest)
    }
    const newUser = {
      ...data,
      password: hashPassword(data.password)
    }

    const result = await this.repository.create(newUser)
    return result
  }
}

export { UserService }
