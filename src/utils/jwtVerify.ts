import JWT from 'jsonwebtoken'

const jwtVerify = (token: string, secretKey: string) => {
  return JWT.verify(token, secretKey)
}

export { jwtVerify }
