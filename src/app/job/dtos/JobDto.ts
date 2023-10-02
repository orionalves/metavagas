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

interface JobSearch extends Partial<JobDto> {
  minSalary?: number
  maxSalary?: number
}

export { JobDto, JobSearch }
