import { describe, it, vi, expect } from 'vitest'
import { TypeUser } from '@/user/entities/User'
import { UserRepository } from '@/user/repositories/UserRepository'
// import { UserService } from '@/user/services/UserService'
import { UserService } from './UserService'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

const repositoryMock = {
  create: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
  findAll: vi.fn()
}

const paramsMock = {
  name: 'teste',
  email: 'teste@teste.com',
  password: '123'
}

// System under test
const sut = new UserService(repositoryMock as unknown as UserRepository)

describe('UserService', () => {
  it('should be able to return an error if user already exists', async () => {
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(paramsMock)

    const result = await sut.create(paramsMock as TypeUser)
    const expected = commonError('This email already exist.', status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it('should be able to create a user', async () => {
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(false)
    vi.spyOn(repositoryMock, 'create').mockResolvedValue(paramsMock)

    const hashPassword = await import('@/utils/hashPassword')
    vi.spyOn(hashPassword, 'hashPassword').mockReturnValue('hash')

    const result = await sut.create(paramsMock as TypeUser)
    const expected = paramsMock

    expect(result).toStrictEqual(expected)
  })
})
