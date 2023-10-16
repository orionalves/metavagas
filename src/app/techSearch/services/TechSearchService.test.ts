import { describe, it, vi, expect } from 'vitest'
import { TechSearchService } from './TechSearchService'
import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'

const repositoryMock = {
  findFiveTopTrends: vi.fn()
}

const sut = new TechSearchService(repositoryMock as unknown as TechSearchRepository)

describe('TechSearchService topTrends', () => {
  it('Should be able to search 5 top trends technologies.', async () => {
    vi.spyOn(repositoryMock, 'findFiveTopTrends').mockResolvedValue('5 top trends technologies.')

    const result = await sut.topTrends()
    const expected = '5 top trends technologies.'

    expect(result).toStrictEqual(expected)
  })
})
