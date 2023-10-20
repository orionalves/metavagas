import { hashPassword } from '@/utils/hashPassword'
import { commonReturn } from '@/utils/commonReturn'
import { UserRepository } from '@/user/repositories/UserRepository'
import { TypeUser } from '@/user/entities/User'
import { status } from '@/utils/status'
import { UserFavorite, UserUpdate } from '@/user/dtos/UserDto'
import { comparePassword } from '@/utils/comparePassword'

class UserService {
  constructor(private repository: UserRepository) {}

  async create(data: TypeUser) {
    const userAlreadyExist = await this.repository.findByEmail(data.email)
    if (userAlreadyExist) {
      return commonReturn(true, '❌ Problem: This email already exist.', status.badRequest)
    }
    const newUser = {
      ...data,
      password: hashPassword(data.password)
    }

    const result = await this.repository.create(newUser)
    return result
  }

  async update(data: UserUpdate) {
    if (!data.name && !data.password) {
      return commonReturn(true, "❌ Problem: User don't updated.", status.badRequest)
    }

    const user = await this.repository.findById(data.id)
    if (!user || 'error' in user) {
      return commonReturn(true, "❌ Problem: User don't updated.", status.badRequest)
    }

    if (!data.password) {
      return await this.repository.update(data)
    }

    if (!data.oldPassword) {
      return commonReturn(true, "❌ Problem: User don't updated.", status.badRequest)
    }

    const passwordIsValid = comparePassword(data.oldPassword, user.password)
    if (!passwordIsValid) {
      return commonReturn(true, "❌ Problem: Password don't match.", status.notFound)
    }

    const userUpdate = {
      ...data,
      password: hashPassword(data.password)
    }

    const result = await this.repository.update(userUpdate)
    return result
  }

  async showFavority(id: string) {
    return await this.repository.showFavorite(id)
  }

  async toggleFavorite(data: UserFavorite) {
    if (!data.remove) {
      const favoriteExiste = await this.repository.findFavorite(data.favorite)
      if (favoriteExiste) {
        return commonReturn(true, '❌ Problem: Already favorited.', status.badRequest)
      }
    }
    return await this.repository.toggleFavorite(data)
  }
}

export { UserService }
