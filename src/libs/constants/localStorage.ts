import type { User } from '@/interface'

export const ACCESS_TOKEN = 'access_token'
export const USER = 'user'

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)
export const getUserInformation = () => {
    const user = localStorage.getItem(USER)
    if (!user) return {}
    try {
        return JSON.parse(user)
    } catch (error) {
        return {}
    }
}

export const setAuth = (user: User, accessToken: string) => {
    localStorage.setItem(USER, JSON.stringify(user))
    localStorage.setItem(ACCESS_TOKEN, accessToken)
}
