import * as yup from 'yup'
import { commonReturn } from '@/utils/commonReturn'
import { TechSearchDto } from '@/techSearch/dtos/TechSearchDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

const techSearchValidation = async (
  data: TechSearchDto
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
  const TechSearchSchema = yup.object().shape({
    technology: yup.string().min(2).required()
  })

  try {
    await TechSearchSchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(`❌ ${error}`), status.badRequest)
  }
}

export { techSearchValidation }
