import * as yup from 'yup'
import { commonError } from '@/utils/commonError'
import { CityDto } from '@/city/dtos/CityDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

type citySchemaValidationType = (data: CityDto) => Promise<
  | {
      error: true
      message: string
      status: number
    }
  | {
      error: false
    }
>

const citySchemaValidation: citySchemaValidationType = async data => {
  const citySchema = yup.object().shape({
    name: yup.string().min(2).required('Name is required.'),
    uf: yup.string().min(2).max(2).required('UF is required.')
  })

  try {
    await citySchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonError(getYupErrorMessage(error), status.badRequest)
  }
}

export { citySchemaValidation }
