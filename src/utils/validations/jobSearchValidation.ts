import * as yup from 'yup'
import { JobSearch } from '@/job/dtos/JobDto'
import { commonReturn } from '@/utils/commonReturn'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

const jobSearchValidation = async (
  data: JobSearch
): Promise<
  | {
      error: true
      message: string
      status: number
    }
  | {
      error: false
    }
> => {
  const jobSchema = yup.object().shape({
    position: yup.string(),
    company: yup.string(),
    technologies: yup.array().of(yup.string()),
    city: yup.string(),
    link: yup.string(),
    jobType: yup.string(),
    workRegime: yup.string(),
    companySize: yup.string(),
    salary: yup.number(),
    experienceLevel: yup.string()
  })

  try {
    await jobSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(`❌ ${error}`), status.badRequest)
  }
}

export { jobSearchValidation }
