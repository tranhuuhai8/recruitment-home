import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/auth'
import {
    setUserInformation,
    clearUserInformation,
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
    const me = ref<User | undefined>(userInfo as User | undefined)
    const token = ref<string | null>(null)
    const role = ref<number | null>((userInfo as any)?.role ?? null)
    const initialized = ref(false)

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => role.value === ROLE_ADMIN)
    const isCompany = computed(() => role.value === ROLE_COMPANY)
    const isApplicant = computed(() => role.value === ROLE_APPLICANT)
    const getUser = computed(() => me.value)

    const login = async (payload: LoginDto) => {
        try {
            const result = await API.login(payload)
            if (result.status_code === STATUS_CODE_SUCCESS) {
                const { data } = result
                _applyAuth(data.me, data.access_token)
            }
            return result
        } catch (error: any) {
            return error
        }
    }

    /**
     * Restore session on page load by exchanging the HttpOnly refresh_token
     * cookie (sent automatically by the browser) for a fresh access token.
     */
    const initAuth = async () => {
        if (initialized.value) return
        try {
            const result = await API.refresh()
            if (result.status_code === STATUS_CODE_SUCCESS) {
                const { data } = result
                _applyAuth(data.me, data.access_token)
            }
        } catch {
            // no valid refresh token cookie — user is not logged in
        } finally {
            initialized.value = true
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

    const resetPassword = async (resetToken: string, data: ResetPasswordDto) => {
        try {
            return await API.resetPassword(resetToken, data)
        } catch (error: any) {
            return error
        }
    }

    const logout = async () => {
        try {
            const { status_code, message } = await API.logout()
            if (status_code === STATUS_CODE_SUCCESS) {
                _clearAuth()
                return message
            }
            return false
        } catch {
            return false
        }
    }

    const getMe = async () => {
        try {
            const { data } = await API.me()
            _applyAuth(data, token.value ?? '')
            return data
        } catch (error: any) {
            return error
        }
    }

    // ── private helpers ──────────────────────────────────────────────────────

    const _applyAuth = (user: User, accessToken: string) => {
        token.value = accessToken
        me.value = user
        role.value = user.role
        setUserInformation(user)
    }

    const _clearAuth = () => {
        token.value = null
        role.value = null
        me.value = undefined
        clearUserInformation()
    }

    return {
        token,
        role,
        initialized,
        isAuthenticated,
        isAdmin,
        isCompany,
        isApplicant,
        getUser,
        login,
        initAuth,
        register,
        changePassword,
        forgotPassword,
        resetPassword,
        logout,
        getMe,
    }
})
