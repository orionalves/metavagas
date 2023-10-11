import * as yup from 'yup'
import { commonError } from '@/utils/commonError'
import { TechSearchDto } from '@/techSearch/dtos/TechSearchDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

type techSearchValidationType = (data: TechSearchDto) => Promise<
  | {
      error: true
      message: string
      status: number
    }
  | {
      error: false
    }
>

const techSearchValidation: techSearchValidationType = async data => {
  const TechSearchSchema = yup.object().shape({
    technology: yup.string().min(2).required(),
    cities: yup.array().of(yup.string()).min(2)
  })

  try {
    await TechSearchSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonError(getYupErrorMessage(error), status.badRequest)
  }
}

export { techSearchValidation }
