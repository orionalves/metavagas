import JWT from 'jsonwebtoken'

const createToken = (
  payload: string | object | Buffer,
  secretKey: string,
  options: JWT.SignOptions
) => {
  return JWT.sign(payload, secretKey, options)
}

export { createToken }
