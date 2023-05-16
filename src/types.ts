export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface UsersState {
  data: User[]
  total: number
  loading: boolean
  error: string | null
}

export interface DarkModeState {
  darkMode: boolean
}
