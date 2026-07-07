export interface ChartDatePoint {
    date: string
    count: number
}

export interface StatusBreakdownItem {
    status: number
    count: number
}

// Admin
export interface DashboardAdminTotals {
    applicant: number
    company: number
    job: number
    application_acceptance_rate: number
    total_applications: number
}

export interface ChartTopCategoryItem {
    name: string
    total_jobs: number
}

export interface ChartUserGrowthItem {
    date: string
    company: number
    applicant: number
}

export interface TopCompanyItem {
    id: number
    name: string
    slug: string
    jobs_count: number
    followers_count: number
}

export interface TopCityItem {
    name: string
    total_jobs: number
}

export interface DashboardNeedsAttention {
    pending_contacts: number
    failed_mails: number
}

export interface DashboardAdminResult {
    totals: DashboardAdminTotals
    chartTopCategory: ChartTopCategoryItem[]
    chartJobApplication: ChartDatePoint[]
    chartUserGrowth: ChartUserGrowthItem[]
    chartJobStatus: StatusBreakdownItem[]
    topCompanies: TopCompanyItem[]
    topCities: TopCityItem[]
    needsAttention: DashboardNeedsAttention
}

// Company
export interface DashboardCompanyTotals {
    open_jobs: number
    total_applications: number
    pending_applications: number
    followers: number
}

export interface TopJobItem {
    id: number
    title: string
    slug: string
    number_of_recruitment: number
    applications_count: number
    accepted_count: number
}

export interface DashboardCompanyResult {
    totals: DashboardCompanyTotals
    chartApplicationByDay: ChartDatePoint[]
    chartApplicationStatus: StatusBreakdownItem[]
    topJobs: TopJobItem[]
}

// Applicant
export interface DashboardApplicantTotals {
    total_applications: number
    pending: number
    accepted: number
    favorites: number
    follows: number
}

export interface RecentApplicationItem {
    job_id: number
    job_title: string
    company_name: string
    status: number
    created_at: string
}

export interface DashboardApplicantResult {
    totals: DashboardApplicantTotals
    chartApplicationByDay: ChartDatePoint[]
    chartApplicationStatus: StatusBreakdownItem[]
    recentApplications: RecentApplicationItem[]
}

export interface FormSearchDashboard {
    range?: '7d' | 'last_month' | 'month' | 'custom'
    from?: string
    to?: string
}
