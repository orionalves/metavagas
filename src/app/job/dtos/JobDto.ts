interface JobDto {
  jobTitle: string
  technologies: string[]
  location: string
  jobType: 'remote' | 'office' | 'hybrid'
  workRegime: string
  companySize: string
  salary: number
  experienceLevel: string
}

export { JobDto }
