import { useQueryStore, useAuthStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import * as Pages from '@/views/index'
import {
    getRolePathMap,
    getUserInformation,
    notify,
    ROLE_ADMIN,
    ROLE_COMPANY,
    ROLE_APPLICANT,
} from '@/libs'
import { ROUTER_AUTH } from '@/libs/constants/router'
import i18n from '@/lang'
import { storeToRefs } from 'pinia'

const { t } = i18n

const ifInfoCompleted = (to: any, from: any, next: any) => {
    const me = getUserInformation()

    if (me?.role === ROLE_COMPANY) {
        const company = me?.company
        const requiredFields = [
            'name',
            'short_name',
            'telephone',
            'address',
            'city_id',
        ]
        const isCompleted = requiredFields.every((field) =>
            Boolean(company?.[field])
        )

        if (isCompleted) {
            return next()
        }

        notify(t('notify.missing_info.company'), '', 'warning')
        return next({ name: `${getRolePathMap()}-info` })
    }

    return next()
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
                    path: 'page-company',
                    children: [
                        {
                            path: ':id',
                            name: 'company-home-detail',
                            component: Pages.CompanyDetailView,
                        },
                    ],
                },
                {
                    path: 'introduce',
                    name: 'introduce',
                    component: Pages.AboutView,
                },
                {
                    path: 'page-job',
                    children: [
                        {
                            path: '',
                            name: 'job-home-list',
                            component: Pages.JobView,
                        },
                        {
                            path: ':id',
                            name: 'job-home-detail',
                            component: Pages.JobDetailView,
                        },
                    ],
                },
                {
                    path: 'news',
                    name: 'news',
                    component: Pages.NewView,
                },
                {
                    path: 'contact',
                    name: 'contact',
                    component: Pages.ContactView,
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
                        {
                            path: 'change-password',
                            name: 'change-password',
                            component: Pages.ChangePasswordView,
                            meta: { requiresAuth: true },
                        },
                        {
                            path: 'forgot-password',
                            name: 'forgot-password',
                            component: Pages.ForgotPasswordView,
                        },
                        {
                            path: 'reset-password',
                            name: 'reset-password',
                            component: Pages.ResetPasswordView,
                        },
                    ],
                },
                {
                    path: 'admin',
                    meta: { requiresAuth: true, roles: [ROLE_ADMIN] },
                    children: [
                        {
                            path: 'dashboard',
                            name: 'admin-dashboard',
                            component: Pages.HomeViewAdmin,
                        },
                        {
                            path: 'companies',
                            children: [
                                {
                                    path: '',
                                    name: 'admin-companies',
                                    component: Pages.CompanyView,
                                },
                                {
                                    path: ':id/edit',
                                    name: 'admin-companies-edit',
                                    component: Pages.CompanyUpdate,
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
                                },
                                {
                                    path: ':id/edit',
                                    name: 'admin-applicants-edit',
                                    component: Pages.ApplicantUpdate,
                                },
                            ],
                        },
                        {
                            path: 'jobs',
                            children: [
                                {
                                    path: '',
                                    name: 'admin-jobs',
                                    component: Pages.JobViewAdmin,
                                },
                            ],
                        },
                        {
                            path: 'reviews',
                            name: 'admin-reviews',
                            component: Pages.HomeViewAdmin,
                        },
                        {
                            path: 'master-data',
                            name: 'admin-master-data',
                            component: Pages.MasterView,
                        },
                    ],
                },
                {
                    path: 'company',
                    meta: { requiresAuth: true, roles: [ROLE_COMPANY] },
                    children: [
                        {
                            path: '',
                            name: 'company-dashboard',
                            component: Pages.HomeViewCompany,
                        },
                        {
                            path: 'info',
                            name: 'company-info',
                            component: Pages.InformationCompany,
                        },
                        {
                            path: 'jobs',
                            children: [
                                {
                                    path: '',
                                    name: 'company-jobs',
                                    component: Pages.JobViewCompany,
                                },
                                {
                                    path: 'create',
                                    name: 'company-jobs-create',
                                    component: Pages.JobCreateViewCompany,
                                    beforeEnter: ifInfoCompleted,
                                },
                                {
                                    path: ':id',
                                    name: 'company-jobs-detail',
                                    component: Pages.JobDetailViewCompany,
                                },
                                {
                                    path: ':id/edit',
                                    name: 'company-jobs-edit',
                                    component: Pages.JobUpdateViewCompany,
                                },
                            ],
                        },
                        {
                            path: 'applications',
                            children: [
                                {
                                    path: '',
                                    name: 'company-applications',
                                    component: Pages.JobApplicationsViewCompany,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'applicant',
                    meta: { requiresAuth: true, roles: [ROLE_APPLICANT] },
                    children: [
                        {
                            path: '',
                            name: 'applicant-dashboard',
                            component: Pages.HomeViewApplicant,
                        },
                        {
                            path: 'info',
                            name: 'applicant-info',
                            component: Pages.InformationApplicant,
                        },
                        {
                            path: 'file-upload',
                            name: 'applicant-file-upload',
                            component: Pages.FileUploadApplicant,
                        },
                        {
                            path: 'applied',
                            name: 'applicant-applied',
                            component: Pages.JobAppliedApplicant,
                        },
                    ],
                },
                {
                    path: ':pathMatch(.*)*',
                    name: 'not-found',
                    component: Pages.NotFound,
                },
            ],
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const queryStore = useQueryStore()
    const authStore = useAuthStore()
    const { token, role } = storeToRefs(authStore)

    if (token.value && role.value === null) {
        await authStore.getMe()
    }

    const fromModule = from.name?.toString().split('-')[0]
    const toModule = to.name?.toString().split('-')[0]

    if (fromModule !== toModule) queryStore.clearQuery()

    if (to.meta.requiresAuth && !token.value) {
        return next('/auth/login')
    }

    if (ROUTER_AUTH.includes(String(to.name)) && token.value) {
        if (authStore.isAdmin) return next({ name: 'admin-dashboard' })
        if (authStore.isCompany) return next({ name: 'company-dashboard' })
        if (authStore.isApplicant) return next({ name: 'applicant-dashboard' })
        return next({ name: 'home' })
    }

    if (to.meta.roles) {
        const routeRoles = to.meta.roles as number[]
        if (role.value === null || !routeRoles.includes(role.value)) {
            if (authStore.isAdmin) return next({ name: 'admin-dashboard' })
            if (authStore.isCompany) return next({ name: 'company-dashboard' })
            if (authStore.isApplicant)
                return next({ name: 'applicant-dashboard' })
            return next({ name: 'home' })
        }
    }

    next()
})

export default router
