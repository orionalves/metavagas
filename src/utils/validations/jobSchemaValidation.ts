import * as yup from 'yup'
import { JobDto } from '@/job/dtos/JobDto'
import { commonReturn } from '@/utils/commonReturn'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

const jobSchemaValidation = async (
  data: JobDto
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
    position: yup.string().min(3).required('❌ Problem: Job position is required.'),
    company: yup.string().min(2).required('❌ Problem: Company is required.'),
    technologies: yup
      .array()
      .of(yup.string())
      .required('❌ Problem: Job technologies are required.'),
    city: yup.string().required('❌ Problem: Job city is required.'),
    link: yup.string().required('❌ Problem: Job link is required.'),
    jobType: yup
      .string()
      .oneOf(['remote', 'office', 'hybrid'])
      .required('❌ Problem: Job type is required.'),
    workRegime: yup.string().oneOf(['clt', 'pj']).required('❌ Problem: Work regime is required.'),
    companySize: yup
      .string()
      .oneOf(['small', 'mid-level', 'large'])
      .required('❌ Problem: Company size is required.'),
    salary: yup
      .number()
      .min(0, 'Salary cannot be negative.')
      .required('❌ Problem: Salary is required.'),
    experienceLevel: yup
      .string()
      .oneOf(['junior', 'mid-level', 'senior'])
      .required('❌ Problem: Experience level is required.'),
    description: yup.string().required('❌ Problem: Description is required.')
  })

  try {
    await jobSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(error), status.badRequest)
  }
}

export { jobSchemaValidation }
