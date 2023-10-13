import * as yup from 'yup'
import { commonReturn } from '@/utils/commonReturn'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { AuthDto } from '@/auth/dtos/AuthDto'
import { status } from '@/utils/status'

const loginSchemaValidation = async (
  data: AuthDto
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
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('❌ Problem: Needs to be email')
      .min(6)
      .required('❌ Problem: Email is required'),
    password: yup.string().min(8).required('❌ Problem: Password is required')
  })

  try {
    await loginSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(`❌ ${error}`), status.badRequest)
  }
}

export { loginSchemaValidation }
