// Home page
export const HomeView = () => import('@/views/Home/HomeView.vue')
export const AboutView = () => import('@/views/Home/AboutView.vue')
export const JobView = () => import('@/views/Home/JobView.vue')
export const NewView = () => import('@/views/Home/NewView.vue')
export const ContactView = () => import('@/views/Home/ContactView.vue')
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
export const ChangePasswordView = () =>
    import('@/views/Auth/ChangePasswordView.vue')
export const ForgotPasswordView = () =>
    import('@/views/Auth/ForgotPasswordView.vue')
export const ResetPasswordView = () =>
    import('@/views/Auth/ResetPasswordView.vue')
