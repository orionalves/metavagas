import { describe, it, vi, expect } from 'vitest'
import { TechSearchService } from './TechSearchService'
import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'

const repositoryMock = {
  findFiveTopTrends: vi.fn(),
  findByIdAndAgregate: vi.fn()
}

const sut = new TechSearchService(repositoryMock as unknown as TechSearchRepository)

describe('TechSearchService topTrends', () => {
  it('Should be able to search 5 top trends technologies.', async () => {
    vi.spyOn(repositoryMock, 'findFiveTopTrends').mockResolvedValue('5 top trends technologies.')

    const result = await sut.topTrends()
    const expected = '5 top trends technologies.'

    expect(result).toStrictEqual(expected)
  })
  it('Should be able to search 5 top cities in technology.', async () => {
    vi.spyOn(repositoryMock, 'findByIdAndAgregate').mockResolvedValue('5 top cities in technology')

    const result = await sut.topCities('teste')
    const expected = '5 top cities in technology'

    expect(result).toStrictEqual(expected)
  })
})
