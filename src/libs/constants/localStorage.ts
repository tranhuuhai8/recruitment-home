import type { User } from '@/interface'

export const USER = 'user'

export const getUserInformation = (): User | Record<string, never> => {
    const user = localStorage.getItem(USER)
    if (!user) return {}
    try {
        return JSON.parse(user)
    } catch {
        return {}
    }
}

export const setUserInformation = (user: User) => localStorage.setItem(USER, JSON.stringify(user))

export const clearUserInformation = () => localStorage.removeItem(USER)
