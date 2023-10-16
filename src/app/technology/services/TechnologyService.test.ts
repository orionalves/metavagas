import { describe, it, vi, expect } from 'vitest'
import { TechnologyService } from './TechnologyService'
import { TechnologyRepository } from '@/technology/repositories/TechnologyRepository'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { commonReturn } from '@/utils/commonReturn'
import { status } from '@/utils/status'

const repositoryMock = {
  create: vi.fn(),
  findOne: vi.fn(),
  findAll: vi.fn()
}

const paramsMock: TechnologyDto = {
  name: 'Teste'
}

const sut = new TechnologyService(repositoryMock as unknown as TechnologyRepository)

describe('TechnologyService create', () => {
  it('Should be able to to return an error if technology exists.', async () => {
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(true)

    const result = await sut.create(paramsMock)
    const expected = commonReturn(
      true,
      '❌ Problem: This technology already exist.',
      status.badRequest
    )

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to create technology.', async () => {
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(false)
    vi.spyOn(repositoryMock, 'create').mockResolvedValue('Created.')

    const result = await sut.create(paramsMock)
    const expected = 'Created.'

    expect(result).toStrictEqual(expected)
  })
})

describe('TechnologyService index', () => {
  it('Should be able to to return all cities.', async () => {
    vi.spyOn(repositoryMock, 'findAll').mockResolvedValue('All cities')

    const result = await sut.index()
    const expected = 'All cities'

    expect(result).toStrictEqual(expected)
  })
})
