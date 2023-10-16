import { describe, it, vi, expect } from 'vitest'
import { CityService } from './CityService'
import { CityRepository } from '@/city/repositories/CityRepository'
import { CityDto } from '@/city/dtos/CityDto'
import { commonReturn } from '@/utils/commonReturn'
import { status } from '@/utils/status'

const repositoryMock = {
  create: vi.fn(),
  findOne: vi.fn(),
  findAll: vi.fn()
}

const paramsMock: CityDto = {
  name: 'Teste',
  uf: 'TS'
}

const sut = new CityService(repositoryMock as unknown as CityRepository)

describe('CityService create', () => {
  it('Should be able to to return an error if city exists.', async () => {
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(true)

    const result = await sut.create(paramsMock)
    const expected = commonReturn(true, '❌ Problem: This city already exist.', status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to create city.', async () => {
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(false)
    vi.spyOn(repositoryMock, 'create').mockResolvedValue('Created.')

    const result = await sut.create(paramsMock)
    const expected = 'Created.'

    expect(result).toStrictEqual(expected)
  })
})

describe('CityService index', () => {
  it('Should be able to to return all cities.', async () => {
    vi.spyOn(repositoryMock, 'findAll').mockResolvedValue('All cities')

    const result = await sut.index()
    const expected = 'All cities'

    expect(result).toStrictEqual(expected)
  })
})
