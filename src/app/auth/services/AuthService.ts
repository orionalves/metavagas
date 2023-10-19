import { UserRepository } from '@/user/repositories/UserRepository'
import { comparePassword } from '@/utils/comparePassword'
import { createToken } from '@/utils/createToken'
import { commonReturn } from '@/utils/commonReturn'
import { AuthDto } from '@/auth/dtos/AuthDto'
import { status } from '@/utils/status'

class AuthService {
  constructor(private repository: UserRepository) {}

  async login(data: AuthDto) {
    if (!process.env.JWT_SECRET_KEY) {
      return commonReturn(
        true,
        '❌ Problem: Environment configuration failed: secretKey not found.',
        status.internalServerError
      )
    }

    const user = await this.repository.findByEmail(data.email)
    if (!user) {
      return commonReturn(true, '❌ Problem: E-mail or password is invalid', status.notFound)
    }
    if ('error' in user) {
      return commonReturn(true, `❌ Problem: ${user.message}`, user.status)
    }

    const passwordIsValid = comparePassword(data.password, user.password)
    if (!passwordIsValid) {
      return commonReturn(true, '❌ Problem: E-mail or password is invalid', status.notFound)
    }

    const payload = { name: user.name, email: user.email }
    const secretKey = process.env.JWT_SECRET_KEY
    const options = { expiresIn: '5m' }

    const token = createToken(payload, secretKey, options)

    return { id: user._id, ...payload, token }
  }
}

export { AuthService }
