export const HomeView = () => import('@/views/HomeView.vue')
export const NotFound = () => import('@/views/NotFound.vue')

// Page Applicant
export const HomeViewApplicant = () =>
    import('@/views/Applicant/DashboardView.vue')
export const InformationApplicant = () =>
    import('@/views/Applicant/Information/UpdateView.vue')

// Page Company
export const HomeViewCompany = () => import('@/views/Company/DashboardView.vue')
export const InformationCompany = () =>
    import('@/views/Company/Information/UpdateView.vue')

// Page Admin
export const HomeViewAdmin = () => import('@/views/Admin/DashboardView.vue')
export const MasterView = () => import('@/views/Admin/Master/MasterView.vue')
export const CompanyView = () => import('@/views/Admin/Company/CompanyView.vue')
export const CompanyUpdate = () =>
    import('@/views/Admin/Company/CompanyUpdate.vue')
export const ApplicantView = () =>
    import('@/views/Admin/Applicant/ApplicantView.vue')
export const ApplicantUpdate = () =>
    import('@/views/Admin/Applicant/ApplicantUpdate.vue')

// Auth
export const LoginView = () => import('@/views/Auth/LoginView.vue')
export const RegisterView = () => import('@/views/Auth/RegisterView.vue')
