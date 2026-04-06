// Home page
export const HomeView = () => import('@/views/Home/HomeView.vue')
export const AboutView = () => import('@/views/Home/AboutView.vue')
export const JobView = () => import('@/views/Home/JobView.vue')
export const NewView = () => import('@/views/Home/NewView.vue')
export const ContactView = () => import('@/views/Home/ContactView.vue')

export const CompanyDetailView = () =>
    import('@/views/Home/Company/CompanyDetail.vue')

export const JobDetailView = () => import('@/views/Home/Job/JobDetail.vue')

export const NotFound = () => import('@/views/NotFound.vue')

// Page Applicant
export const HomeViewApplicant = () =>
    import('@/views/Applicant/DashboardView.vue')
export const InformationApplicant = () =>
    import('@/views/Applicant/Information/UpdateView.vue')
export const FileUploadApplicant = () =>
    import('@/views/Applicant/FileUpload/FileUploadView.vue')
export const JobAppliedApplicant = () =>
    import('@/views/Applicant/Applied/AppliedView.vue')

// Page Company
export const HomeViewCompany = () => import('@/views/Company/DashboardView.vue')
export const InformationCompany = () =>
    import('@/views/Company/Information/UpdateView.vue')
export const JobViewCompany = () => import('@/views/Company/Job/JobView.vue')
export const JobCreateViewCompany = () =>
    import('@/views/Company/Job/JobCreateView.vue')
export const JobDetailViewCompany = () =>
    import('@/views/Company/Job/JobDetailView.vue')
export const JobUpdateViewCompany = () =>
    import('@/views/Company/Job/JobUpdateView.vue')
export const JobApplicationsViewCompany = () =>
    import('@/views/Company/Apply/ApplyView.vue')

// Page Admin
export const HomeViewAdmin = () =>
    import('@/views/Admin/Dashboard/DashboardView.vue')

export const MasterView = () => import('@/views/Admin/Master/MasterView.vue')

export const CompanyView = () => import('@/views/Admin/Company/CompanyView.vue')
export const CompanyUpdate = () =>
    import('@/views/Admin/Company/CompanyUpdate.vue')

export const ApplicantView = () =>
    import('@/views/Admin/Applicant/ApplicantView.vue')
export const ApplicantUpdate = () =>
    import('@/views/Admin/Applicant/ApplicantUpdate.vue')

export const JobViewAdmin = () => import('@/views/Admin/Job/JobView.vue')

export const ContactAdminView = () =>
    import('@/views/Admin/Contact/ContactView.vue')
export const ContactDetailAdmin = () =>
    import('@/views/Admin/Contact/ContactDetail.vue')
export const MailTemplateView = () =>
    import('@/views/Admin/MailTemplate/MailTemplateView.vue')
export const MailLogView = () => import('@/views/Admin/MailLog/MailLogView.vue')

// Auth
export const LoginView = () => import('@/views/Auth/LoginView.vue')
export const RegisterView = () => import('@/views/Auth/RegisterView.vue')
export const ChangePasswordView = () =>
    import('@/views/Auth/ChangePasswordView.vue')
export const ForgotPasswordView = () =>
    import('@/views/Auth/ForgotPasswordView.vue')
export const ResetPasswordView = () =>
    import('@/views/Auth/ResetPasswordView.vue')
