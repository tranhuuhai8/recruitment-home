import request from '@/api/config'
import type {
    ChangePasswordDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    ResponseList,
} from '@/interface'

export const login = (payload: Record<string, any>, prefix: string) =>
    request<ResponseList, ResponseList>({
        url: `auth/${prefix}/login`,
        method: 'POST',
        data: payload,
    })

export const refresh = (prefix: string) =>
    request<ResponseList, ResponseList>({
        url: `auth/${prefix}/refresh`,
        method: 'POST',
    })

export const register = (payload: Record<string, any>, prefix: string) =>
    request<ResponseList, ResponseList>({
        url: `auth/${prefix}/register`,
        method: 'POST',
        data: payload,
    })

export const changePassword = (payload: ChangePasswordDto, prefix: string) =>
    request<ResponseList, ResponseList>({
        url: `auth/${prefix}/change-password`,
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
