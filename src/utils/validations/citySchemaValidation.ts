import * as yup from 'yup'
import { commonReturn } from '@/utils/commonReturn'
import { CityDto } from '@/city/dtos/CityDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

const citySchemaValidation = async (
  data: CityDto
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
  const citySchema = yup.object().shape({
    name: yup.string().min(2).required('❌ Problem: Name is required.'),
    uf: yup.string().min(2).max(2).required('❌ Problem: UF is required.')
  })

  try {
    await citySchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(error), status.badRequest)
  }
}

export { citySchemaValidation }
