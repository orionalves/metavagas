interface JobDto {
  jobTitle: string
  company: string
  technologies: string[]
  city: string
  site: string
  jobType: 'remote' | 'office' | 'hybrid'
  workRegime: 'clt' | 'pj'
  companySize: 'small' | 'mid-level' | 'large'
  salary: number
  experienceLevel: 'junior' | 'mid-level' | 'senior'
  desciption: string
}

export { JobDto }
