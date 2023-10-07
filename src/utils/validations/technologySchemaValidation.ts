import * as yup from 'yup'
import { commonError } from '@/utils/commonError'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

type technologySchemaValidationType = (data: TechnologyDto) => Promise<
  | {
      error: true
      message: string
      status: number
    }
  | {
      error: false
    }
>

const technologySchemaValidation: technologySchemaValidationType = async data => {
  const technologySchema = yup.object().shape({
    name: yup.string().required('Name is required.')
  })

  try {
    await technologySchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonError(getYupErrorMessage(error), status.badRequest)
  }
}

export { technologySchemaValidation }
