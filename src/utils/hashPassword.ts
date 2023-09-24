import { hashSync } from 'bcrypt'

const hashPassword = (password: string) => {
  return hashSync(password, 8)
}

export { hashPassword }
