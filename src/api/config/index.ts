import axios from 'axios'
import router from '@/router'
import {
    notify,
    getToken,
    getRolePathMap,
    STATUS_CODE_FORBIDDEN,
    STATUS_CODE_SUCCESS,
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
    function (config: any) {
        try {
            const token = getToken()
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
        } catch (error) {
            throw Error('')
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function (response) {
        if (response?.data?.status_code === STATUS_CODE_FORBIDDEN) {
            notify(t('auth.notify.permission_denied'), '', 'error')
            return router.push({ name: 'not-found' })
        }
        if (response?.status !== STATUS_CODE_SUCCESS) {
            return Promise.reject(response?.data)
        }
        return response.data
    },
    async function (error) {
        const originalRequest = error.config

        if (
            error?.response?.data.message === 'Unauthenticated.' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            const { status_code, data } = await API.refresh(getRolePathMap())
            if (status_code === STATUS_CODE_SUCCESS) {
                setAuth(data.me, data.access_token)
                originalRequest.headers['Authorization'] =
                    `Bearer ${data.access_token}`

                return instance(originalRequest)
            }

            localStorage.clear()
            notify(t('auth.notify.token_failed'), '', 'error')
            return router.push({ name: 'login' })
        }
        if (error?.response?.data) {
            return Promise.reject(error?.response?.data)
        }
        return Promise.reject(error)
    }
)

export const setLocaleApi = (locale: string) => {
    instance.defaults.headers.common['lang'] = locale
}

export default instance
