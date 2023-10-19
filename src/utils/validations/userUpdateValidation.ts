import * as yup from 'yup'
import { commonReturn } from '@/utils/commonReturn'
import { UserUpdate } from '@/user/dtos/UserDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

const userUpdateValidation = async (
  data: UserUpdate
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
    name: yup.string().min(2),
    password: yup.string().min(8),
    oldPassword: yup.string()
  })

  try {
    await userSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(`❌ ${error}`), status.badRequest)
  }
}

export { userUpdateValidation }
