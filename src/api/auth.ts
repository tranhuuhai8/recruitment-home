import request from '@/api/config'
import type {
    ChangePasswordDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    ResponseList,
} from '@/interface'

export const login = (payload: Record<string, any>) =>
    request<any, any>({
        url: `auth/login`,
        method: 'POST',
        data: payload,
    })

export const refresh = () =>
    request<ResponseList, ResponseList>({
        url: `auth/refresh`,
        method: 'POST',
    })

export const register = (payload: Record<string, any>, prefix: string) =>
    request<ResponseList, ResponseList>({
        url: `auth/${prefix}/register`,
        method: 'POST',
        data: payload,
    })

export const changePassword = (payload: ChangePasswordDto) =>
    request<ResponseList, ResponseList>({
        url: `auth/change-password`,
        method: 'POST',
        data: payload,
    })

export const forgotPassword = (payload: ForgotPasswordDto) =>
    request<ResponseList, ResponseList>({
        url: `auth/forgot-password`,
        method: 'POST',
        data: payload,
    })

export const resetPassword = (token: String, payload: ResetPasswordDto) =>
    request<ResponseList, ResponseList>({
        url: `auth/reset-password/${token}`,
        method: 'POST',
        data: payload,
    })

export const logout = () =>
    request<any, any>({
        url: `auth/logout`,
        method: 'POST',
    })

export const me = () =>
    request<any, any>({
        url: `auth/me`,
        method: 'GET',
    })
