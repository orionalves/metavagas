/* eslint-disable max-lines */
import { describe, it, vi, expect } from 'vitest'
import { JobService } from './JobService'
import { JobRepository } from '@/job/repositories/JobRepository'
import { JobDto, JobSearch } from '@/job/dtos/JobDto'
import { status } from '@/utils/status'
import { TechnologyRepository } from '@/app/technology/repositories/TechnologyRepository'
import { CityRepository } from '@/app/city/repositories/CityRepository'
import { TechSearchRepository } from '@/techSearch/repositories/TechSearchRepository'
import { commonReturn } from '@/utils/commonReturn'

const repositoryMock = {
  findOne: vi.fn(),
  create: vi.fn(),
  findById: vi.fn(),
  search: vi.fn()
}
const technologyRepositoryMock = {
  returnId: vi.fn()
}
const cityRepositoryMock = {
  returnId: vi.fn()
}
const techSearchRepositoryMock = {
  returnId: vi.fn(),
  findByTechnology: vi.fn(),
  incrementsTechnologyCount: vi.fn(),
  findCity: vi.fn(),
  incrementsCityCount: vi.fn()
}

const paramsMock: JobDto = {
  position: 'Teste',
  company: 'Teste',
  technologies: ['teste1', 'teste2', 'teste3'],
  link: 'testavagas.com',
  jobType: 'office',
  workRegime: 'pj',
  companySize: 'large',
  salary: 2000,
  experienceLevel: 'junior',
  description: 'Essa é uma vaga de teste',
  city: 'Teste'
}

const paramsMockJobSearchWithoutTechs: JobSearch = {
  position: 'Teste',
  jobType: 'office',
  workRegime: 'pj',
  minSalary: 2000,
  maxSalary: 20000,
  experienceLevel: 'junior',
  city: 'Teste'
}

const paramsMockJobSearchWitTechsWithoutCity: JobSearch = {
  position: 'Teste',
  technologies: ['teste1', 'teste2', 'teste3'],
  jobType: 'office',
  workRegime: 'pj',
  minSalary: 2000,
  maxSalary: 20000,
  experienceLevel: 'junior'
}

const paramsMockJobSearchWitTechsAndCity: JobSearch = {
  position: 'Teste',
  technologies: ['teste1', 'teste2', 'teste3'],
  jobType: 'office',
  workRegime: 'pj',
  minSalary: 2000,
  maxSalary: 20000,
  experienceLevel: 'junior',
  city: 'Teste'
}

const sut = new JobService(
  repositoryMock as unknown as JobRepository,
  technologyRepositoryMock as unknown as TechnologyRepository,
  cityRepositoryMock as unknown as CityRepository,
  techSearchRepositoryMock as unknown as TechSearchRepository
)

describe('JobService create', () => {
  it("Should be able to return an error if any technogies don't exists.", async () => {
    vi.spyOn(technologyRepositoryMock, 'returnId').mockResolvedValue(null)

    const result = await sut.create(paramsMock)
    const expected = commonReturn(
      true,
      "❌ Problem: We don't have any technology.",
      status.badRequest
    )

    expect(result).toStrictEqual(expected)
  })

  it("Should be able to return an error if city don't exists.", async () => {
    vi.spyOn(technologyRepositoryMock, 'returnId').mockResolvedValue('string')
    vi.spyOn(cityRepositoryMock, 'returnId').mockResolvedValue(null)

    const result = await sut.create(paramsMock)
    const expected = commonReturn(true, "❌ Problem: We don't have this city.", status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to return an error if job already exists.', async () => {
    vi.spyOn(technologyRepositoryMock, 'returnId').mockResolvedValue('string')
    vi.spyOn(cityRepositoryMock, 'returnId').mockResolvedValue('string')
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(true)

    const result = await sut.create(paramsMock)
    const expected = commonReturn(true, '❌ Problem: This job already exist.', status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to create a job.', async () => {
    vi.spyOn(technologyRepositoryMock, 'returnId').mockResolvedValue('string')
    vi.spyOn(cityRepositoryMock, 'returnId').mockResolvedValue('string')
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(false)
    vi.spyOn(repositoryMock, 'create').mockResolvedValue(
      commonReturn(false, '✔️ Ok: Job created!', status.created)
    )

    const result = await sut.create(paramsMock)
    const expected = commonReturn(false, '✔️ Ok: Job created!', status.created)

    expect(result).toStrictEqual(expected)
  })
})

describe('JobService search', () => {
  it('Should be able to search jobs without any technologies.', async () => {
    vi.spyOn(repositoryMock, 'search').mockResolvedValue('All jobs without any technologies.')

    const result = await sut.search(paramsMockJobSearchWithoutTechs)
    const expected = 'All jobs without any technologies.'

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to search jobs without city.', async () => {
    vi.spyOn(repositoryMock, 'search').mockResolvedValue(
      'All jobs with technologies and without city.'
    )
    vi.spyOn(techSearchRepositoryMock, 'findByTechnology').mockReturnValue(true)
    vi.spyOn(techSearchRepositoryMock, 'incrementsTechnologyCount').mockReturnValue(true)

    const result = await sut.search(paramsMockJobSearchWitTechsWithoutCity)
    const expected = 'All jobs with technologies and without city.'

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to search jobs.', async () => {
    vi.spyOn(repositoryMock, 'search').mockResolvedValue('All jobs with technologies and city.')
    vi.spyOn(techSearchRepositoryMock, 'findCity').mockReturnValue(true)
    vi.spyOn(techSearchRepositoryMock, 'incrementsCityCount').mockReturnValue(true)

    const result = await sut.search(paramsMockJobSearchWitTechsAndCity)
    const expected = 'All jobs with technologies and city.'

    expect(result).toStrictEqual(expected)
  })
})
