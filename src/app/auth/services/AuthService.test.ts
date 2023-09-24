import { describe, it, vi, expect } from 'vitest'
import { UserRepository } from '@/user/repositories/UserRepository'
import { AuthService } from './AuthService'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

const repositoryMock = {
  create: vi.fn(),
  findById: vi.fn(),
  findAll: vi.fn(),
  findByEmail: vi.fn()
}

const paramsMock = {
  email: 'teste@teste.com',
  password: '123'
}

const sut = new AuthService(repositoryMock as unknown as UserRepository)

describe('AuthService', () => {
  it('should be able to return an error if environment configuration failed', async () => {
    vi.stubEnv('JWT_SECRET_KEY', '')

    const result = await sut.login(paramsMock)
    const expected = commonError(
      'Environment configuration failed: secretKey not found.',
      status.internalServerError
    )

    expect(result).toStrictEqual(expected)
  })

  it('should be able to return an error if user not found', async () => {
    vi.stubEnv('JWT_SECRET_KEY', 'Validate!')
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(false)

    const result = await sut.login(paramsMock)
    const expected = commonError('E-mail or password is invalid', status.notFound)

    expect(result).toStrictEqual(expected)
  })

  it('should be able to return an error if database connection failed', async () => {
    const userErrorMock = {
      error: true,
      message: 'Database connection failed',
      status: status.internalServerError
    }
    vi.stubEnv('JWT_SECRET_KEY', 'Validate!')
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue(userErrorMock)

    const result = await sut.login(paramsMock)
    const expected = commonError('Database connection failed', status.internalServerError)

    expect(result).toStrictEqual(expected)
  })

  it('should be able to return an error if password is invalid', async () => {
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue({})
    const comparePassword = await import('@/utils/comparePassword')
    vi.spyOn(comparePassword, 'comparePassword').mockReturnValue(false)

    const result = await sut.login(paramsMock)
    const expected = commonError('E-mail or password is invalid', status.notFound)

    expect(result).toStrictEqual(expected)
  })

  it('should be able to return a user and token', async () => {
    vi.spyOn(repositoryMock, 'findByEmail').mockResolvedValue({
      _id: 1,
      name: 'teste',
      ...paramsMock
    })
    const comparePassword = await import('@/utils/comparePassword')
    vi.spyOn(comparePassword, 'comparePassword').mockReturnValue(true)
    const createToken = await import('@/utils/createToken')
    vi.spyOn(createToken, 'createToken').mockReturnValue('safe')

    const result = await sut.login(paramsMock)
    const expected = { id: 1, name: 'teste', email: paramsMock.email, token: 'safe' }

    expect(result).toStrictEqual(expected)
  })
})
