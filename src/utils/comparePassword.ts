import { compareSync } from 'bcrypt'

const comparePassword = (dataPassword: string, userPassword: string) => {
  return compareSync(dataPassword, userPassword)
}

export { comparePassword }
