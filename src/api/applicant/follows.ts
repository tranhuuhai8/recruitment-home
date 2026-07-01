import request from '@/api/config'
import type { ResponseResult } from '@/interface'

export const listFollowedCompanies = () =>
    request<ResponseResult, any>({
        url: 'applicant/follows/companies',
        method: 'GET',
    })

export const toggleFollowedCompany = (companySlug: string) =>
    request<ResponseResult, any>({
        url: `applicant/follows/companies/${companySlug}/toggle`,
        method: 'POST',
    })
