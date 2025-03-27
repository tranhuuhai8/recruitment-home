import { getToken } from '@/libs'
import { useQueryStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const ifAuthenticated = (to: any, from: any, next: any) => {
    if (getToken()) {
        next()
        return
    }
    next('/login')
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            beforeEnter: ifAuthenticated,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Auth/LoginView.vue'),
        },
        {
            path: '/not-found',
            name: 'not-found',
            component: () => import('../views/NotFound.vue'),
        },
    ],
})

router.beforeEach((to, from, next) => {
    const queryStore = useQueryStore()
    const fromModule = from.name?.toString().split('-')[0]
    const toModule = to.name?.toString().split('-')[0]

    if (fromModule !== toModule) queryStore.clearQuery()

    next()
})

export default router
