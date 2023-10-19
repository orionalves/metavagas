interface UserDto {
  name: string
  email: string
  password: string
}

interface UserUpdate {
  id: string
  name?: string
  password?: string
  oldPassword: string
}

export { UserDto, UserUpdate }
