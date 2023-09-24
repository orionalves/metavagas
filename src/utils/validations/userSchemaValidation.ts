import * as yup from 'yup'
import { commonError } from '@/utils/commonError'
import { UserDto } from '@/user/dtos/UserDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'

type userSchemaValidationType = (data: UserDto) => Promise<
  | {
      error: true
      message: string
      status: number
    }
  | {
      error: false
    }
>

const userSchemaValidation: userSchemaValidationType = async data => {
  const userSchema = yup.object().shape({
    name: yup.string().min(2).required('Name is required'),
    email: yup.string().email('Needs to be email').min(6).required('Email is required'),
    password: yup.string().min(8).required('Password is required')
  })

  try {
    await userSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonError(getYupErrorMessage(error), 400)
  }
}

export { userSchemaValidation }
