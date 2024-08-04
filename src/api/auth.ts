import request from '@/api/config'

export function login(payload: Record<string, any>) {
    const url = 'auth/login'
    return request<any, any>({
        url,
        method: 'POST',
        data: payload,
    })
}

export function changePassword(payload: Record<string, any>) {
    const url = 'auth/change-password'
    return request<any, any>({
        url,
        method: 'PATCH',
        data: payload,
    })
}

export const logout = () => {
    const url = 'auth/logout'
    return request({
        url,
        method: 'POST',
    })
}

export const me = () => {
    const url = 'auth/me'
    return request<any, any>({
        url,
        method: 'GET',
    })
}
