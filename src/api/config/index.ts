import axios from 'axios'
import router from '@/router'
import { notify, STATUS_CODE_SUCCESS } from '@/libs'

axios.defaults.withCredentials = false

export const API_URL = import.meta.env.VITE_PUBLIC_APP_API
const instance = axios.create({
    baseURL: API_URL,
})

instance.interceptors.request.use(
    function (config: any) {
        try {
            const token = localStorage.getItem('access_token')
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
        if (response?.status !== STATUS_CODE_SUCCESS)
            return Promise.reject(response?.data)
        return response.data
    },
    function (error) {
        if (error?.response?.data.message === 'Unauthenticated.') {
            localStorage.clear()
            notify(
                'Truy cập bị từ chối. Vui lòng đăng nhập để tiếp tục!',
                '',
                'error'
            )
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
