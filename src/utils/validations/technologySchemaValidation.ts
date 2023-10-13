import * as yup from 'yup'
import { commonReturn } from '@/utils/commonReturn'
import { TechnologyDto } from '@/technology/dtos/TechnologyDto'
import { getYupErrorMessage } from '@/utils/getYupErrorMessage'
import { status } from '@/utils/status'

const technologySchemaValidation = async (
  data: TechnologyDto
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
  const technologySchema = yup.object().shape({
    name: yup.string().required('❌ Problem: Name is required.')
  })

  try {
    await technologySchema.validate(data)
    return { error: false }
  } catch (error) {
    return commonReturn(true, getYupErrorMessage(`❌ ${error}`), status.badRequest)
  }
}

export { technologySchemaValidation }
