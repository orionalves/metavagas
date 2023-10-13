import * as yup from 'yup'
import { commonReturn } from '@/utils/commonReturn'
import { UserDto } from '@/user/dtos/UserDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

const userSchemaValidation = async (
  data: UserDto
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
  const userSchema = yup.object().shape({
    name: yup.string().min(2).required('❌ Problem: Name is required'),
    email: yup
      .string()
      .email('❌ Problem: Needs to be email')
      .min(6)
      .required('❌ Problem: Email is required'),
    password: yup.string().min(8).required('❌ Problem: Password is required')
  })

  try {
    await userSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(`❌ ${error}`), status.badRequest)
  }
}

export { userSchemaValidation }
