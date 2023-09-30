import * as yup from 'yup'
import { JobDto } from '@/job/dtos/JobDto'
import { commonError } from '@/utils/commonError'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

type jobSchemaValidationType = (data: JobDto) => Promise<
  | {
      error: true
      message: string
      status: number
    }
  | {
      error: false
    }
>

const jobSchemaValidation: jobSchemaValidationType = async data => {
  const jobSchema = yup.object().shape({
    position: yup.string().min(3).required('Job position is required.'),
    company: yup.string().min(2).required('Company is required.'),
    technologies: yup.array().of(yup.string()).required('Job technologies are required.'),
    city: yup.string().required('Job city is required.'),
    site: yup.string().required('Job site is required.'),
    jobType: yup.string().oneOf(['remote', 'office', 'hybrid']).required('Job type is required.'),
    workRegime: yup.string().oneOf(['clt', 'pj']).required('Work regime is required.'),
    companySize: yup
      .string()
      .oneOf(['small', 'mid-level', 'large'])
      .required('Company size is required.'),
    salary: yup.number().min(0, 'Salary cannot be negative.').required('Salary is required.'),
    experienceLevel: yup
      .string()
      .oneOf(['junior', 'mid-level', 'senior'])
      .required('Experience level is required.'),
    desciption: yup.string().required('Description is required.')
  })

  try {
    await jobSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonError(getYupErrorMessage(error), status.badRequest)
  }
}

export { jobSchemaValidation }
