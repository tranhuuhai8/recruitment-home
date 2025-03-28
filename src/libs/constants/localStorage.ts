import type { User } from '@/interface'

export const ACCESS_TOKEN = 'access_token'
export const USER = 'user'

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)
export const setToken = (token: string) =>
    localStorage.setItem(ACCESS_TOKEN, token)

export const getUser = () => localStorage.getItem(USER)
export const setUser = (user: User) =>
    localStorage.setItem(USER, JSON.stringify(user))
