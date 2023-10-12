const commonReturn = (error: boolean, message: string, status: number) => {
  return { error, message, status }
}

export { commonReturn }
