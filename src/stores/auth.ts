import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/auth'
import { STATUS_CODE_SUCCESS } from '@/libs'
const tokenKey = 'access_token'

export const useAuthStore = defineStore('auth', () => {
    const me = ref({})
    const TOKEN_STR = localStorage.getItem(tokenKey)
    const token = ref(TOKEN_STR)
    const isAuthenticated = computed(() => !!token.value)

    const login = async (payload: any | {}) => {
        try {
            const result = await API.login(payload)
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
            const data: any = await API.logout()
            if (data) {
                localStorage.clear()
                token.value = null
                return true
            }
            return false
        } catch (error: any) {
            return error
        }
    }

    const changePassword = async (payload: any | {}) => {
        try {
            return await API.changePassword(payload)
        } catch (error: any) {
            return error
        }
    }

    const setUserInformation = async (user: any, accessToken: string) => {
        localStorage.setItem(tokenKey, accessToken)
        localStorage.setItem('user', JSON.stringify(user))
        token.value = accessToken
        me.value = user
    }

    const getMe = async () => {
        try {
            const { data } = await API.me()
            me.value = data
            return data
        } catch (error: any) {
            return error
        }
    }

    const getUser = computed(() => me.value)

    return {
        token,
        me,
        isAuthenticated,
        login,
        changePassword,
        setUserInformation,
        logout,
        getUser,
        getMe,
    }
})
