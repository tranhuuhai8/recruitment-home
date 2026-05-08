import { useQueryStore, useAuthStore } from '@/stores'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import * as Pages from '@/views/index'
import {
    getUserInformation,
    notify,
    ROLE_ADMIN,
    ROLE_COMPANY,
    ROLE_APPLICANT,
} from '@/libs'
import { ROUTER_AUTH, ROUTE_NAME_DASHBOARD } from '@/libs/constants/router'
import i18n from '@/lang'
import { storeToRefs } from 'pinia'

const { t } = i18n

const requireCompanyInfo = (to: any, from: any, next: any) => {
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

        if (isCompleted) return next()

        notify(t('notify.missing_info.company'), '', 'warning')
        return next({ name: `company-info` })
    }

    return next()
}

// Layout: Public Routes
const publicRoutes: RouteRecordRaw[] = [
    { path: '', name: 'home', component: Pages.HomeView },
    { path: 'introduce', name: 'introduce', component: Pages.AboutView },
    { path: 'news', name: 'news', component: Pages.NewView },
    { path: 'contact', name: 'contact', component: Pages.ContactView },
    {
        path: 'page-company/:id',
        name: 'company-home-detail',
        component: Pages.CompanyDetailView,
    },
    { path: 'page-job', name: 'job-home-list', component: Pages.JobView },
    {
        path: 'page-job/:id',
        name: 'job-home-detail',
        component: Pages.JobDetailView,
    },
]

// Layout: Auth Routes
const authRoutes: RouteRecordRaw[] = [
    { path: 'login', name: 'login', component: Pages.LoginView },
    { path: 'register', name: 'register', component: Pages.RegisterView },
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
]

// Layout: Admin Routes
const adminRoutes: RouteRecordRaw[] = [
    {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: Pages.HomeViewAdmin,
    },
    {
        path: 'companies',
        name: 'admin-companies',
        component: Pages.CompanyView,
    },
    {
        path: 'companies/:id/edit',
        name: 'admin-companies-edit',
        component: Pages.CompanyUpdate,
    },
    {
        path: 'applicants',
        name: 'admin-applicants',
        component: Pages.ApplicantView,
    },
    {
        path: 'applicants/:id/edit',
        name: 'admin-applicants-edit',
        component: Pages.ApplicantUpdate,
    },
    { path: 'jobs', name: 'admin-jobs', component: Pages.JobViewAdmin },
    { path: 'reviews', name: 'admin-reviews', component: Pages.HomeViewAdmin },
    {
        path: 'master-data',
        name: 'admin-master-data',
        component: Pages.MasterView,
    },
    {
        path: 'contact',
        name: 'admin-contact',
        component: Pages.ContactAdminView,
    },
    {
        path: 'contact/:id',
        name: 'admin-contact-detail',
        component: Pages.ContactDetailAdmin,
        meta: { parentRoute: 'admin-contact' },
    },
    {
        path: 'mail-template',
        name: 'admin-mail-template',
        component: Pages.MailTemplateView,
    },
    {
        path: 'mail-log',
        name: 'admin-mail-log',
        component: Pages.MailLogView,
    },
    {
        path: 'company-followers',
        name: 'admin-company-followers',
        component: Pages.CompanyFollowersAdminView,
    },
]

// Layout: Company Routes
const companyRoutes: RouteRecordRaw[] = [
    { path: '', name: 'company-dashboard', component: Pages.HomeViewCompany },
    { path: 'info', name: 'company-info', component: Pages.InformationCompany },
    { path: 'jobs', name: 'company-jobs', component: Pages.JobViewCompany },
    {
        path: 'jobs/create',
        name: 'company-jobs-create',
        component: Pages.JobCreateViewCompany,
        beforeEnter: requireCompanyInfo,
    },
    {
        path: 'jobs/:id',
        name: 'company-jobs-detail',
        component: Pages.JobDetailViewCompany,
    },
    {
        path: 'jobs/:id/edit',
        name: 'company-jobs-edit',
        component: Pages.JobUpdateViewCompany,
    },
    {
        path: 'applications',
        name: 'company-applications',
        component: Pages.JobApplicationsViewCompany,
    },
]

// Layout: Applicant Routes
const applicantRoutes: RouteRecordRaw[] = [
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
    {
        path: 'saved-jobs',
        name: 'applicant-saved-jobs',
        component: Pages.SavedJobsApplicant,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            children: [
                ...publicRoutes,
                { path: 'auth', children: authRoutes },
                {
                    path: 'admin',
                    meta: { requiresAuth: true, roles: [ROLE_ADMIN] },
                    children: adminRoutes,
                },
                {
                    path: 'company',
                    meta: { requiresAuth: true, roles: [ROLE_COMPANY] },
                    children: companyRoutes,
                },
                {
                    path: 'applicant',
                    meta: { requiresAuth: true, roles: [ROLE_APPLICANT] },
                    children: applicantRoutes,
                },
                {
                    path: ':pathMatch(.*)*',
                    name: 'not-found',
                    component: Pages.NotFound,
                },
            ],
        },
    ],
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' }
    },
})

// Helper routing
const navigateToDashboard = (roleValue: number | null) => {
    const dashboardRouteName = roleValue
        ? ROUTE_NAME_DASHBOARD[roleValue]
        : undefined
    return { name: dashboardRouteName || 'home' }
}

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
        return next(navigateToDashboard(role.value))
    }

    if (to.meta.roles) {
        const routeRoles = to.meta.roles as number[]
        if (role.value === null || !routeRoles.includes(role.value)) {
            return next(navigateToDashboard(role.value))
        }
    }

    next()
})

export default router
