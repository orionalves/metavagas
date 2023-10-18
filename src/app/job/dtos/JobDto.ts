interface JobDto {
  position: string
  company: string
  technologies: string[]
  city: string
  link: string
  jobType: 'remote' | 'office' | 'hybrid'
  workRegime: 'clt' | 'pj'
  companySize: 'small' | 'mid-level' | 'large'
  salary: number
  experienceLevel: 'junior' | 'mid-level' | 'senior'
  description: string
}

interface JobSearch {
  position?: string
  technologies?: string[]
  city?: string
  jobType?: 'remote' | 'office' | 'hybrid'
  workRegime?: 'clt' | 'pj'
  companySize?: 'small' | 'mid-level' | 'large'
  experienceLevel?: 'junior' | 'mid-level' | 'senior'
  minSalary?: number
  maxSalary?: number
  page?: number
  perPage?: number
}

export { JobDto, JobSearch }
