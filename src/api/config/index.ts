import axios, { type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import {
    notify,
    getToken,
    STATUS_CODE_FORBIDDEN,
    STATUS_CODE_SUCCESS,
    STATUS_CODE_UNAUTHORIZED,
    setAuth,
} from '@/libs'
import * as API from '@/api/auth'
import i18n from '@/lang'

axios.defaults.withCredentials = false
const { t } = i18n

export const API_URL = import.meta.env.VITE_PUBLIC_APP_API
const instance = axios.create({
    baseURL: API_URL,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(
    (response) => {
        if (response?.data?.status_code === STATUS_CODE_FORBIDDEN) {
            notify(t('auth.notify.permission_denied'), '', 'error')
            router.push({ name: 'not-found' })
            return Promise.reject(response.data)
        }

        if (response?.data?.status_code !== STATUS_CODE_SUCCESS) {
            return Promise.reject(response.data)
        }
        return response.data
    },

    async (error) => {
        const originalRequest = error.config
        if (!error.response) {
            return Promise.reject(error)
        }

        if (
            error.response.status === STATUS_CODE_UNAUTHORIZED &&
            error.response.data?.message === 'Unauthenticated.' &&
            !originalRequest._retry &&
            originalRequest.url !== 'auth/refresh'
        ) {
            originalRequest._retry = true
            try {
                const { status_code, data } = await API.refresh()
                if (status_code === STATUS_CODE_SUCCESS) {
                    setAuth(data.me, data.access_token)
                    originalRequest.headers['Authorization'] =
                        `Bearer ${data.access_token}`

                    try {
                        const { useAuthStore } = await import('@/stores')
                        const authStore = useAuthStore()
                        authStore.token = data.access_token
                        authStore.role = data.me.role
                    } catch (syncErr) {
                        console.error('Store sync failed', syncErr)
                    }

                    return instance(originalRequest)
                }
            } catch (err) {
                console.error('❌ REFRESH TOKEN FAILED', err)
            }

            try {
                const { useAuthStore } = await import('@/stores')
                const authStore = useAuthStore()
                authStore.token = null
                authStore.role = null
            } catch (clearAuthErr) {
                console.error('Failed to clear auth state', clearAuthErr)
            }

            localStorage.clear()
            notify(t('auth.notify.token_failed'), '', 'error')
            router.push({ name: 'login' })
            return Promise.reject(error.response.data)
        }

        return Promise.reject(error.response.data)
    }
)

export const setLocaleApi = (locale: string) => {
    instance.defaults.headers.common['lang'] = locale
}

export default instance
