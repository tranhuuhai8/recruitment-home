import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/auth'
import {
    setAuth,
    ACCESS_TOKEN,
    ROLE_APPLICANT,
    ROLE_PATH_PREFIX,
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
    const me = ref<User>()
    const TOKEN_STR = localStorage.getItem(ACCESS_TOKEN)
    const token = ref(TOKEN_STR)
    const isAuthenticated = computed(() => !!token.value)

    const login = async (payload: LoginDto, prefix: string) => {
        try {
            const result = await API.login(payload, prefix)
            if (result.status_code === STATUS_CODE_SUCCESS) {
                const { data } = result
                setUserInformation(data.me, data.access_token)
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

    const changePassword = async (data: ChangePasswordDto, prefix: string) => {
        try {
            return await API.changePassword(data, prefix)
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
            const { status_code, message } = await API.logout(
                ROLE_PATH_PREFIX[getUserInformation()?.role ?? ROLE_APPLICANT]
            )
            if (status_code === STATUS_CODE_SUCCESS) {
                localStorage.clear()
                token.value = null
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
    }

    const getMe = async (prefix: string) => {
        try {
            const { data } = await API.me(prefix)
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
        isAuthenticated,
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
