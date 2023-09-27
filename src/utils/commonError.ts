interface ErrorObject {
  error: true
  message: string
  status: number
}

const commonError = (message: string, status: number): ErrorObject => {
  return {
    error: true,
    message,
    status
  }
}

export { commonError }
