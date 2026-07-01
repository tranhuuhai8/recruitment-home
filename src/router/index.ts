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
    {
        path: 'gioi-thieu',
        name: 'introduce',
        component: Pages.AboutView,
    },
    { path: 'tin-tuc', name: 'news', component: Pages.NewView },
    { path: 'lien-he', name: 'contact', component: Pages.ContactView },
    {
        path: 'cong-ty/:slug',
        name: 'company-home-detail',
        component: Pages.CompanyDetailView,
    },
    { path: 'viec-lam', name: 'job-home-list', component: Pages.JobView },
    {
        path: 'viec-lam/:slug',
        name: 'job-home-detail',
        component: Pages.JobDetailView,
    },
]

// Layout: Auth Routes
const authRoutes: RouteRecordRaw[] = [
    { path: 'dang-nhap', name: 'login', component: Pages.LoginView },
    { path: 'dang-ky', name: 'register', component: Pages.RegisterView },
    {
        path: 'doi-mat-khau',
        name: 'change-password',
        component: Pages.ChangePasswordView,
        meta: { requiresAuth: true },
    },
    {
        path: 'quen-mat-khau',
        name: 'forgot-password',
        component: Pages.ForgotPasswordView,
    },
    {
        path: 'dat-lai-mat-khau',
        name: 'reset-password',
        component: Pages.ResetPasswordView,
    },
]

// Layout: Admin Routes
const adminRoutes: RouteRecordRaw[] = [
    {
        path: 'tong-quan',
        name: 'admin-dashboard',
        component: Pages.HomeViewAdmin,
    },
    {
        path: 'cong-ty',
        name: 'admin-companies',
        component: Pages.CompanyView,
    },
    {
        path: 'cong-ty/:slug/chinh-sua',
        name: 'admin-companies-edit',
        component: Pages.CompanyUpdate,
        meta: { parentRoute: 'admin-companies' },
    },
    {
        path: 'ung-vien',
        name: 'admin-applicants',
        component: Pages.ApplicantView,
    },
    {
        path: 'ung-vien/:id/chinh-sua',
        name: 'admin-applicants-edit',
        component: Pages.ApplicantUpdate,
        meta: { parentRoute: 'admin-applicants' },
    },
    { path: 'viec-lam', name: 'admin-jobs', component: Pages.JobViewAdmin },
    {
        path: 'viec-lam/:slug/chinh-sua',
        name: 'admin-jobs-edit',
        component: Pages.JobUpdateViewAdmin,
        meta: { parentRoute: 'admin-jobs' },
    },
    { path: 'danh-gia', name: 'admin-reviews', component: Pages.HomeViewAdmin },
    {
        path: 'du-lieu-chung',
        name: 'admin-master-data',
        component: Pages.MasterView,
    },
    {
        path: 'lien-he',
        name: 'admin-contact',
        component: Pages.ContactAdminView,
    },
    {
        path: 'lien-he/:id',
        name: 'admin-contact-detail',
        component: Pages.ContactDetailAdmin,
        meta: { parentRoute: 'admin-contact' },
    },
    {
        path: 'mau-mail',
        name: 'admin-mail-template',
        component: Pages.MailTemplateView,
    },
    {
        path: 'nhat-ky-mail',
        name: 'admin-mail-log',
        component: Pages.MailLogView,
    },
    {
        path: 'cong-ty-da-luu',
        name: 'admin-company-followers',
        component: Pages.CompanyFollowersAdminView,
    },
]

// Layout: Company Routes
const companyRoutes: RouteRecordRaw[] = [
    { path: '', name: 'company-dashboard', component: Pages.HomeViewCompany },
    {
        path: 'thong-tin',
        name: 'company-info',
        component: Pages.InformationCompany,
    },
    { path: 'viec-lam', name: 'company-jobs', component: Pages.JobViewCompany },
    {
        path: 'viec-lam/tao',
        name: 'company-jobs-create',
        component: Pages.JobCreateViewCompany,
        beforeEnter: requireCompanyInfo,
        meta: { parentRoute: 'company-jobs' },
    },
    {
        path: 'viec-lam/:slug',
        name: 'company-jobs-detail',
        component: Pages.JobDetailViewCompany,
        meta: { parentRoute: 'company-jobs' },
    },
    {
        path: 'viec-lam/:slug/chinh-sua',
        name: 'company-jobs-edit',
        component: Pages.JobUpdateViewCompany,
        meta: { parentRoute: 'company-jobs' },
    },
    {
        path: 'ung-tuyen',
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
        path: 'thong-tin',
        name: 'applicant-info',
        component: Pages.InformationApplicant,
    },
    {
        path: 'tai-len-tep',
        name: 'applicant-file-upload',
        component: Pages.FileUploadApplicant,
    },
    {
        path: 'ung-tuyen',
        name: 'applicant-applied',
        component: Pages.JobAppliedApplicant,
    },
    {
        path: 'viec-lam-da-luu',
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
                { path: 'tai-khoan', children: authRoutes },
                {
                    path: 'quan-tri',
                    meta: { requiresAuth: true, roles: [ROLE_ADMIN] },
                    children: adminRoutes,
                },
                {
                    path: 'cong-ty',
                    meta: { requiresAuth: true, roles: [ROLE_COMPANY] },
                    children: companyRoutes,
                },
                {
                    path: 'ung-vien',
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
        return next('/tai-khoan/dang-nhap')
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
