export const HomeView = () => import('@/views/HomeView.vue')
export const HomeViewAdmin = () => import('@/views/Admin/DashboardView.vue')
export const HomeViewApplicant = () =>
    import('@/views/Applicant/DashboardView.vue')
export const HomeViewCompany = () => import('@/views/Company/DashboardView.vue')
// Page Admin
export const MasterView = () => import('@/views/Admin/Master/MasterView.vue')
export const CompanyView = () => import('@/views/Admin/Company/CompanyView.vue')
export const CompanyDetail = () =>
    import('@/views/Admin/Company/CompanyDetail.vue')
export const ApplicantView = () =>
    import('@/views/Admin/Applicant/ApplicantView.vue')
export const ApplicantDetail = () =>
    import('@/views/Admin/Applicant/ApplicantDetail.vue')

// Auth
export const LoginView = () => import('@/views/Auth/LoginView.vue')
export const RegisterView = () => import('@/views/Auth/RegisterView.vue')
