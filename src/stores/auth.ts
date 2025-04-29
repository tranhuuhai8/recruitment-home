import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/auth'
import {
    getInfoUser,
    ROLE_APPLICANT,
    ROLE_PATH_PREFIX,
    STATUS_CODE_SUCCESS,
} from '@/libs'
const tokenKey = 'access_token'

export const useAuthStore = defineStore('auth', () => {
    const me = ref({})
    const TOKEN_STR = localStorage.getItem(tokenKey)
    const token = ref(TOKEN_STR)
    const isAuthenticated = computed(() => !!token.value)

    const login = async (payload: Record<string, any>, prefix: string) => {
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

    const logout = async () => {
        try {
            const { status_code, message } = await API.logout(
                ROLE_PATH_PREFIX[getInfoUser()?.role ?? ROLE_APPLICANT]
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

    const setUserInformation = async (user: any, accessToken: string) => {
        localStorage.setItem(tokenKey, accessToken)
        localStorage.setItem('user', JSON.stringify(user))
        token.value = accessToken
        me.value = user
    }

    const getMe = async (prefix: string) => {
        try {
            const { data } = await API.me(prefix)
            me.value = data
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
        setUserInformation,
        logout,
        getUser,
        getMe,
    }
})
