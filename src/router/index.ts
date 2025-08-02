import { useQueryStore, useAuthStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import * as Pages from '@/views/index'
import { getRolePathMap } from '@/libs'

const ifAuthenticated = (to: any, from: any, next: any) => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
        next({ name: 'login' })
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
                    component: Pages.HomeView,
                },
                {
                    path: 'not-found',
                    name: 'not-found',
                    component: Pages.NotFound,
                },
                {
                    path: 'auth',
                    children: [
                        {
                            path: 'login',
                            name: 'login',
                            component: Pages.LoginView,
                        },
                        {
                            path: 'register',
                            name: 'register',
                            component: Pages.RegisterView,
                        },
                    ],
                },
                {
                    path: 'admin',
                    children: [
                        {
                            path: 'dashboard',
                            name: 'admin-dashboard',
                            component: Pages.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'companies',
                            children: [
                                {
                                    path: '',
                                    name: 'admin-companies',
                                    component: Pages.CompanyView,
                                    beforeEnter: ifAuthenticated,
                                },
                                {
                                    path: ':id/edit',
                                    name: 'admin-companies-edit',
                                    component: Pages.CompanyUpdate,
                                    beforeEnter: ifAuthenticated,
                                },
                            ],
                        },
                        {
                            path: 'applicants',
                            children: [
                                {
                                    path: '',
                                    name: 'admin-applicants',
                                    component: Pages.ApplicantView,
                                    beforeEnter: ifAuthenticated,
                                },
                                {
                                    path: ':id/edit',
                                    name: 'admin-applicants-edit',
                                    component: Pages.ApplicantUpdate,
                                    beforeEnter: ifAuthenticated,
                                },
                            ],
                        },
                        {
                            path: 'jobs',
                            name: 'admin-jobs',
                            component: Pages.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'reviews',
                            name: 'admin-reviews',
                            component: Pages.HomeViewAdmin,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'master-data',
                            name: 'admin-master-data',
                            component: Pages.MasterView,
                            beforeEnter: ifAuthenticated,
                        },
                    ],
                },
                {
                    path: 'company',
                    children: [
                        {
                            path: '',
                            name: 'company-dashboard',
                            component: Pages.HomeViewCompany,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'info',
                            name: 'company-info',
                            component: Pages.InformationCompany,
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
                            component: Pages.HomeViewApplicant,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'info',
                            name: 'applicant-info',
                            component: Pages.InformationApplicant,
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
