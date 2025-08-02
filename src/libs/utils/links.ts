import i18n from '@/lang'

const { t } = i18n

export const APP_HEADER: Record<string, any> = {
    home: {
        order: 1,
        label: t('header.home'),
        route: 'home',
        name: 'home',
        class: '',
        menu_childs: [],
    },
    about: {
        order: 2,
        label: t('header.about'),
        route: 'home',
        name: 'home',
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
        class: '',
        menu_childs: [],
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
    menu2: {
        order: 3,
        label: t('sidebar.menu2'),
        route: '/menu2',
        name: 'menu2',
        class: '',
        menu_childs: [],
    },
    menu3: {
        order: 4,
        label: t('sidebar.menu3'),
        route: '/menu3',
        name: 'menu3',
        class: '',
        menu_childs: [],
    },
    menu4: {
        order: 5,
        label: t('sidebar.menu4'),
        route: '/menu4',
        name: 'menu4',
        class: '',
        menu_childs: [],
    },
    menu5: {
        order: 6,
        label: t('sidebar.menu5'),
        route: '/menu5',
        name: 'menu5',
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
    menu2: {
        order: 3,
        label: t('sidebar.menu2'),
        route: '/menu2',
        name: 'menu2',
        class: '',
        menu_childs: [],
    },
    menu3: {
        order: 4,
        label: t('sidebar.menu3'),
        route: '/menu3',
        name: 'menu3',
        class: '',
        menu_childs: [],
    },
    menu4: {
        order: 5,
        label: t('sidebar.menu4'),
        route: '/menu4',
        name: 'menu4',
        class: '',
        menu_childs: [],
    },
    menu5: {
        order: 6,
        label: t('sidebar.menu5'),
        route: '/menu5',
        name: 'menu5',
        class: '',
        menu_childs: [],
    },
}

export const APP_SIDEBAR_BOTTOM: Record<string, any> = {
    back_to_home: {
        order: 1,
        label: t('sidebar.back_to_home'),
        route: 'home',
        class: '',
        menu_childs: [],
    },
    logout: {
        order: 2,
        label: t('sidebar.logout'),
        route: 'logout',
        class: '',
        menu_childs: [],
    },
}
