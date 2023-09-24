const commonError = (message: string, status: number) => {
  return {
    error: true,
    message,
    status
  }
}

export { commonError }
