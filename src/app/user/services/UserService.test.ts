/* eslint-disable max-lines */
import { describe, it, vi, expect } from 'vitest'
import { TypeUser } from '@/user/entities/User'
import { UserRepository } from '@/user/repositories/UserRepository'
import { UserService } from './UserService'
import { commonReturn } from '@/utils/commonReturn'
import { status } from '@/utils/status'
import { UserFavorite, UserPage, UserUpdate } from '@/user/dtos/UserDto'

const repositoryMock = {
  create: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  findAll: vi.fn(),
  update: vi.fn(),
  showFavorite: vi.fn(),
  findFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
  showHistory: vi.fn()
}

const paramsMock = {
  name: 'teste',
  email: 'teste@teste.com',
  password: '123'
}

const paramsUpdateMock: UserUpdate = {
  id: '123',
  name: 'teste',
  password: '123',
  oldPassword: '456'
}

const paramsFavoriteMock: UserFavorite = {
  id: '123',
  remove: false,
  favorite: 'id123'
}

const paramsPageMock: UserPage = {
  page: 1,
  perPage: 10
}

const sut = new UserService(repositoryMock as unknown as UserRepository)

describe('UserService create', () => {
  it('Should be able to return an error if user already exists.', async () => {
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(paramsMock)

    const result = await sut.create(paramsMock as TypeUser)
    const expected = commonReturn(true, '❌ Problem: This email already exist.', status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to create a user.', async () => {
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(false)
    vi.spyOn(repositoryMock, 'create').mockResolvedValue(paramsMock)

    const hashPassword = await import('@/utils/hashPassword')
    vi.spyOn(hashPassword, 'hashPassword').mockReturnValue('hash')

    const result = await sut.create(paramsMock as TypeUser)
    const expected = paramsMock

    expect(result).toStrictEqual(expected)
  })
})

describe('UserService update', () => {
  it('Should be able to return an error if no have name and password for update.', async () => {
    const result = await sut.update({ id: '123' })
    const expected = commonReturn(true, "❌ Problem: User don't updated.", status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it("Should be able to return an error if user don't exist.", async () => {
    vi.spyOn(repositoryMock, 'findById').mockResolvedValue(false)

    const result = await sut.update(paramsUpdateMock)
    const expected = commonReturn(true, "❌ Problem: User don't updated.", status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to update just a name.', async () => {
    vi.spyOn(repositoryMock, 'findById').mockResolvedValue({ user: true })
    vi.spyOn(repositoryMock, 'update').mockResolvedValue('Ok')

    const result = await sut.update({ id: '123', name: 'Novo nome' })
    const expected = 'Ok'

    expect(result).toStrictEqual(expected)
  })

  it("Should be able to return an error if don't has old password.", async () => {
    vi.spyOn(repositoryMock, 'findById').mockResolvedValue({ user: true })

    const result = await sut.update({ id: '123', name: 'Novo nome', password: '123' })
    const expected = commonReturn(true, "❌ Problem: User don't updated.", status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it("Should be able to return an error if old password don't match.", async () => {
    vi.spyOn(repositoryMock, 'findById').mockResolvedValue({ user: true })

    const comparePassword = await import('@/utils/comparePassword')
    vi.spyOn(comparePassword, 'comparePassword').mockReturnValue(false)

    const result = await sut.update(paramsUpdateMock)
    const expected = commonReturn(true, "❌ Problem: Password don't match.", status.notFound)

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to update a user.', async () => {
    vi.spyOn(repositoryMock, 'findById').mockResolvedValue({ user: true })
    vi.spyOn(repositoryMock, 'update').mockResolvedValue('Ok')

    const comparePassword = await import('@/utils/comparePassword')
    vi.spyOn(comparePassword, 'comparePassword').mockReturnValue(true)

    const result = await sut.update(paramsUpdateMock)
    const expected = 'Ok'

    expect(result).toStrictEqual(expected)
  })
})

describe('UserService showFavority', () => {
  it('Should be able to return favorites.', async () => {
    vi.spyOn(repositoryMock, 'showFavorite').mockResolvedValue('Ok')

    const result = await sut.update(paramsUpdateMock)
    const expected = 'Ok'

    expect(result).toStrictEqual(expected)
  })
})

describe('UserService toggleFavorite', () => {
  it('Should be able to add favorite.', async () => {
    vi.spyOn(repositoryMock, 'findFavorite').mockResolvedValue(false)
    vi.spyOn(repositoryMock, 'toggleFavorite').mockResolvedValue('Favorited')

    const result = await sut.toggleFavorite(paramsFavoriteMock)
    const expected = 'Favorited'

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to remove favorite.', async () => {
    vi.spyOn(repositoryMock, 'toggleFavorite').mockResolvedValue('Unfavorited')

    const result = await sut.toggleFavorite({ ...paramsFavoriteMock, remove: true })
    const expected = 'Unfavorited'

    expect(result).toStrictEqual(expected)
  })
})

describe('UserService showHistory', () => {
  it('Should be able to return history.', async () => {
    vi.spyOn(repositoryMock, 'showHistory').mockResolvedValue('Ok')

    const result = await sut.showHistory('123', paramsPageMock)
    const expected = 'Ok'

    expect(result).toStrictEqual(expected)
  })
})
