import { useQueryStore, useAuthStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import * as Pages from '@/views/index'
import {
    getRolePathMap,
    getUserInformation,
    notify,
    ROLE_COMPANY,
    ROUTE_CHANGE_PASSWORD,
} from '@/libs'
import i18n from '@/lang'

const { t } = i18n

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

    if (!isAuthorized && to.name != ROUTE_CHANGE_PASSWORD) {
        return next({ name: `${expectedPath}-dashboard` })
    }

    next()
}

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
                            beforeEnter: ifAuthenticated,
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
                            children: [
                                {
                                    path: '',
                                    name: 'admin-jobs',
                                    component: Pages.JobViewAdmin,
                                    beforeEnter: ifAuthenticated,
                                },
                            ],
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
                        {
                            path: 'jobs',
                            children: [
                                {
                                    path: '',
                                    name: 'company-jobs',
                                    component: Pages.JobViewCompany,
                                    beforeEnter: ifAuthenticated,
                                },
                                {
                                    path: 'create',
                                    name: 'company-jobs-create',
                                    component: Pages.JobCreateViewCompany,
                                    beforeEnter: [
                                        ifAuthenticated,
                                        ifInfoCompleted,
                                    ],
                                },
                                {
                                    path: ':id',
                                    name: 'company-jobs-detail',
                                    component: Pages.JobDetailViewCompany,
                                    beforeEnter: ifAuthenticated,
                                },
                                {
                                    path: ':id/edit',
                                    name: 'company-jobs-edit',
                                    component: Pages.JobUpdateViewCompany,
                                    beforeEnter: ifAuthenticated,
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
                                    beforeEnter: ifAuthenticated,
                                },
                            ],
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
                        {
                            path: 'file-upload',
                            name: 'applicant-file-upload',
                            component: Pages.FileUploadApplicant,
                            beforeEnter: ifAuthenticated,
                        },
                        {
                            path: 'applied',
                            name: 'applicant-applied',
                            component: Pages.JobAppliedApplicant,
                            beforeEnter: ifAuthenticated,
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

router.beforeEach((to, from, next) => {
    const queryStore = useQueryStore()
    const fromModule = from.name?.toString().split('-')[0]
    const toModule = to.name?.toString().split('-')[0]

    if (fromModule !== toModule) queryStore.clearQuery()

    next()
})

export default router
