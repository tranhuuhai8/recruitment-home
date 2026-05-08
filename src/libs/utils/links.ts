import i18n from '@/lang'

const { t } = i18n

export const APP_HEADER: Record<string, any> = {
    home: {
        order: 1,
        label: t('header.home'),
        route: '',
        name: 'home',
        class: '',
        menu_childs: [],
    },
    introduce: {
        order: 2,
        label: t('header.introduce'),
        route: 'introduce',
        name: 'introduce',
        class: '',
        menu_childs: [],
},
    job: {
        order: 3,
        label: t('header.job'),
        route: 'page-job',
        name: 'job-home-list',
        class: '',
        menu_childs: [],
    },
    news: {
        order: 4,
        label: t('header.news'),
        route: 'news',
        name: 'news',
        class: '',
        menu_childs: [],
    },
    contact: {
        order: 5,
        label: t('header.contact'),
        route: 'contact',
        name: 'contact',
        class: '',
        menu_childs: [],
    },
}

export const APP_SIDEBAR_ADMIN: Record<string, any> = {
    dashboard: {
        order: 1,
        label: t('sidebar.dashboard'),
        route: 'admin-dashboard',
        name: 'dashboard',
        class: '',
        menu_childs: [],
    },
    companies: {
        order: 2,
        label: t('sidebar.companies'),
        route: 'admin-companies',
        name: 'companies',
        class: '',
        menu_childs: [],
    },
    applicants: {
        order: 3,
        label: t('sidebar.applicants'),
        route: 'admin-applicants',
        name: 'applicants',
        class: '',
        menu_childs: [],
    },
    jobs: {
        order: 4,
        label: t('sidebar.jobs'),
        route: 'admin-jobs',
        name: 'jobs',
        class: '',
        menu_childs: [],
    },
    reviews: {
        order: 5,
        label: t('sidebar.reviews'),
        route: 'admin-reviews',
        name: 'reviews',
        class: '',
        menu_childs: [],
    },
    master_data: {
        order: 6,
        label: t('sidebar.master_data'),
        route: 'admin-master-data',
        name: 'masterData',
        class: '',
        menu_childs: [],
    },
    company_followers: {
        order: 7,
        label: 'Công ty đã lưu',
        route: 'admin-company-followers',
        name: 'companyFollowers',
        class: '',
        menu_childs: [],
    },
    contact_group: {
        order: 8,
        label: t('sidebar.contact_group'),
        route: '',
        name: 'contactGroup',
        class: '',
        menu_childs: [
            {
                order: 71,
                label: t('sidebar.contacts'),
                route: 'admin-contact',
                name: 'contact',
            },
            {
                order: 72,
                label: t('sidebar.mail_log'),
                route: 'admin-mail-log',
                name: 'mailLog',
            },
            {
                order: 73,
                label: t('sidebar.mail_template'),
                route: 'admin-mail-template',
                name: 'mailTemplate',
            },
        ],
    },
}

export const APP_SIDEBAR_COMPANY: Record<string, any> = {
    dashboard: {
        order: 1,
        label: t('sidebar.dashboard'),
        route: 'company-dashboard',
        name: 'dashboard',
        class: '',
        menu_childs: [],
    },
    info: {
        order: 2,
        label: t('sidebar.info'),
        route: 'company-info',
        name: 'info',
        class: '',
        menu_childs: [],
    },
    jobs: {
        order: 3,
        label: t('sidebar.jobs'),
        route: 'company-jobs',
        name: 'jobs',
        class: '',
        menu_childs: [],
    },
    applications: {
        order: 4,
        label: t('sidebar.applications'),
        route: 'company-applications',
        name: 'applications',
        class: '',
        menu_childs: [],
    },
}

export const APP_SIDEBAR_APPLICANT: Record<string, any> = {
    dashboard: {
        order: 1,
        label: t('sidebar.dashboard'),
        route: 'applicant-dashboard',
        name: 'dashboard',
        class: '',
        menu_childs: [],
    },
    info: {
        order: 2,
        label: t('sidebar.info'),
        route: 'applicant-info',
        name: 'info',
        class: '',
        menu_childs: [],
    },
    file: {
        order: 3,
        label: t('sidebar.files'),
        route: 'applicant-file-upload',
        name: 'fileUpload',
        class: '',
        menu_childs: [],
    },
    applied: {
        order: 4,
        label: t('sidebar.applied'),
        route: 'applicant-applied',
        name: 'applied',
        class: '',
        menu_childs: [],
    },
    saved: {
        order: 5,
        label: t('sidebar.saved_jobs'),
        route: 'applicant-saved-jobs',
        name: 'savedJobs',
        class: '',
        menu_childs: [],
    },
}

export const APP_SIDEBAR_BOTTOM: Record<string, any> = {
    change_password: {
        order: 1,
        label: t('sidebar.change_password'),
        route: 'change-password',
        name: 'changePassword',
        class: '',
        menu_childs: [],
    },
    back_to_home: {
        order: 2,
        label: t('sidebar.back_to_home'),
        route: 'home',
        name: 'home',
        class: '',
        menu_childs: [],
    },
    logout: {
        order: 3,
        label: t('sidebar.logout'),
        route: 'logout',
        name: 'logout',
        class: '',
        menu_childs: [],
    },
}
