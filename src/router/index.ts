import { useQueryStore, useAuthStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import * as Page from '@/views/index'
import { getRolePathMap } from '@/libs'

const ifAuthenticated = (to: any, from: any, next: any) => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
        next('/auth/login')
        return
    }

    const expectedPath = getRolePathMap()
    const isAuthorized = to.matched.some((record: Record<string, any>) =>
        record.path.startsWith(`/${expectedPath}`)
    )

    if (!isAuthorized) {
        return next({ name: `${expectedPath}-dashboard` })
    }

    next()
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Page.HomeView,
                },
                {
                    path: 'auth',
                    children: [
                        {
                            path: 'login',
                            name: 'login',
                            component: Page.LoginView,
                        },
                    ],
                },
                {
                    path: 'admin',
                    children: [
                        {
                            path: 'dashboard',
                            name: 'admin-dashboard',
                            component: Page.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'companies',
                            name: 'admin-companies',
                            component: Page.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'applicants',
                            name: 'admin-applicants',
                            component: Page.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'jobs',
                            name: 'admin-jobs',
                            component: Page.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'reviews',
                            name: 'admin-reviews',
                            component: Page.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'master-data',
                            children: [
                                {
                                    path: 'contact-types',
                                    name: 'admin-contact-types',
                                    component: Page.HomeViewAdmin,
                                    beforeEnter: ifAuthenticated,
                                },
                                {
                                    path: 'cities',
                                    name: 'admin-cities',
                                    component: Page.HomeViewAdmin,
                                    beforeEnter: ifAuthenticated,
                                },
                                {
                                    path: 'job-categories',
                                    name: 'admin-job-categories',
                                    component: Page.HomeViewAdmin,
                                    beforeEnter: ifAuthenticated,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'company',
                    children: [
                        {
                            path: '',
                            name: 'company-dashboard',
                            component: Page.HomeViewCompany,
                            beforeEnter: ifAuthenticated,
                        },
                    ],
                },
                {
                    path: 'applicant',
                    children: [
                        {
                            path: '',
                            name: 'applicant-dashboard',
                            component: Page.HomeViewApplicant,
                            beforeEnter: ifAuthenticated,
                        },
                    ],
                },
            ],
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
