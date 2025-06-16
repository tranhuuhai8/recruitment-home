import request from '@/api/config'

export const login = (payload: Record<string, any>, prefix: string) =>
    request<any, any>({
        url: `auth/${prefix}/login`,
        method: 'POST',
        data: payload,
    })

export const refresh = (prefix: string) =>
    request<any, any>({
        url: `auth/${prefix}/refresh`,
        method: 'POST',
    })

export const register = (payload: Record<string, any>, prefix: string) =>
    request<any, any>({
        url: `auth/${prefix}/register`,
        method: 'POST',
        data: payload,
    })

export const logout = (prefix: string) =>
    request<any, any>({
        url: `auth/${prefix}/logout`,
        method: 'POST',
    })

export const me = (prefix: string) =>
    request<any, any>({
        url: `auth/${prefix}/me`,
        method: 'GET',
    })
