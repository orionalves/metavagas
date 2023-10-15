import { describe, it, vi, expect } from 'vitest'
import { TechSearchService } from './TechSearchService'
import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'
import { TechSearchDto } from '@/techSearch/dtos/TechSearchDto'

const repositoryMock = {
  findFiveTopTrends: vi.fn()
}

const paramsMock: TechSearchDto = {
  technology: 'Teste',
  cities: [{ city: 'Teste' }]
}

const sut = new TechSearchService(repositoryMock as unknown as TechSearchRepository)

describe('TechSearchService topTrends', () => {
  it('Should be able to search 5 top trends technologies.', async () => {
    vi.spyOn(repositoryMock, 'findFiveTopTrends').mockResolvedValue(paramsMock)

    const result = await sut.topTrends()
    const expected = paramsMock

    expect(result).toStrictEqual(expected)
  })
})
