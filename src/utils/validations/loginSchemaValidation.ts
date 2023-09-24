import * as yup from 'yup'
import { commonError } from '@/utils/commonError'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { AuthDto } from '@/auth/dtos/AuthDto'

type loginSchemaValidationType = (data: AuthDto) => Promise<
  | {
      error: true
      message: string
      status: number
    }
  | {
      error: false
    }
>

const loginSchemaValidation: loginSchemaValidationType = async data => {
  const loginSchema = yup.object().shape({
    email: yup.string().email('Needs to be email').min(6).required('Email is required'),
    password: yup.string().min(8).required('Password is required')
  })

  try {
    await loginSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonError(getYupErrorMessage(error), 400)
  }
}

export { loginSchemaValidation }
