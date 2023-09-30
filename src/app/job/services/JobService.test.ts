import { describe, it, vi, expect } from 'vitest'
import { JobService } from './JobService'
import { JobRepository } from '@/job/repositories/JobRepository'
import { JobDto } from '@/job/dtos/JobDto'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

const repositoryMock = {
  findOne: vi.fn(),
  create: vi.fn(),
  findById: vi.fn(),
  findAll: vi.fn()
}

const paramsMock: JobDto = {
  position: 'Teste',
  company: 'Teste',
  technologies: ['teste1', 'teste2', 'teste3'],
  site: 'testavagas.com',
  jobType: 'office',
  workRegime: 'pj',
  companySize: 'large',
  salary: 2000,
  experienceLevel: 'junior',
  description: 'Essa é uma vaga de teste',
  city: 'Teste'
}

const sut = new JobService(repositoryMock as unknown as JobRepository)

describe('JobService', () => {
  it('Should be able to return an error if job already exists.', async () => {
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(paramsMock)

    const result = await sut.create(paramsMock)
    const expected = commonError('This job already exist.', status.badRequest)

    expect(result).toStrictEqual(expected)
  })

  it('Should be able to create a job.', async () => {
    vi.spyOn(repositoryMock, 'findOne').mockResolvedValue(false)
    vi.spyOn(repositoryMock, 'create').mockResolvedValue(paramsMock)

    const result = await sut.create(paramsMock)
    const expected = paramsMock

    expect(result).toStrictEqual(expected)
  })
})
