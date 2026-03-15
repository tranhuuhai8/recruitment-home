import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/auth'
import {
    setAuth,
    ACCESS_TOKEN,
    ROLE_COMPANY,
    ROLE_APPLICANT,
    ROLE_ADMIN,
    STATUS_CODE_SUCCESS,
    getUserInformation,
} from '@/libs'
import type {
    ChangePasswordDto,
    ForgotPasswordDto,
    LoginDto,
    RegisterDto,
    ResetPasswordDto,
    User,
} from '@/interface'

export const useAuthStore = defineStore('auth', () => {
    const userInfo = getUserInformation()
    const me = ref<User | undefined>(userInfo)
    const TOKEN_STR = localStorage.getItem(ACCESS_TOKEN)
    const token = ref(TOKEN_STR)
    const role = ref<number | null>(userInfo?.role ?? null)
    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => role.value === ROLE_ADMIN)
    const isCompany = computed(() => role.value === ROLE_COMPANY)
    const isApplicant = computed(() => role.value === ROLE_APPLICANT)

    const login = async (payload: LoginDto) => {
        try {
            const result = await API.login(payload)
            if (result.status_code === STATUS_CODE_SUCCESS) {
                const { data } = result
                setUserInformation(data.user, data.token)
            }

            return result
        } catch (error: any) {
            return error
        }
    }

    const register = async (payload: RegisterDto, prefix: string) => {
        try {
            return await API.register(payload, prefix)
        } catch (error: any) {
            return error
        }
    }

    const changePassword = async (data: ChangePasswordDto) => {
        try {
            return await API.changePassword(data)
        } catch (error: any) {
            return error
        }
    }

    const forgotPassword = async (data: ForgotPasswordDto) => {
        try {
            return await API.forgotPassword(data)
        } catch (error: any) {
            return error
        }
    }

    const resetPassword = async (token: string, data: ResetPasswordDto) => {
        try {
            return await API.resetPassword(token, data)
        } catch (error: any) {
            return error
        }
    }

    const logout = async () => {
        try {
            const { status_code, message } = await API.logout()
            if (status_code === STATUS_CODE_SUCCESS) {
                localStorage.clear()
                token.value = null
                role.value = null
                me.value = undefined
                return message
            }
            return false
        } catch (error: any) {
            return false
        }
    }

    const setUserInformation = async (user: User, accessToken: string) => {
        setAuth(user, accessToken)
        token.value = accessToken
        me.value = user
        role.value = user.role
    }

    const getMe = async () => {
        try {
            const { data } = await API.me()
            me.value = data
            setAuth(data, token.value ?? '')
            return data
        } catch (error: any) {
            return error
        }
    }

    const getUser = computed(() => me.value)

    return {
        token,
        role,
        isAuthenticated,
        isAdmin,
        isCompany,
        isApplicant,
        login,
        register,
        changePassword,
        forgotPassword,
        resetPassword,
        logout,
        getUser,
        getMe,
    }
})
