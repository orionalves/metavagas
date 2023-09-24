import * as yup from 'yup'

const getYupErrorMessage = (error: unknown) => {
  if (error instanceof yup.ValidationError) return String(error.errors)
  return String(error)
}

export { getYupErrorMessage }
