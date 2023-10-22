interface UserDto {
  name: string
  email: string
  password: string
}

interface UserUpdate {
  id: string
  name?: string
  password?: string
  oldPassword?: string
}

interface UserFavorite {
  id: string
  remove?: boolean
  favorite: string
}

interface UserPage {
  page: number
  perPage: number
}

export { UserDto, UserUpdate, UserFavorite, UserPage }
