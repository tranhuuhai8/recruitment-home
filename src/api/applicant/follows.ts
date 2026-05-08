import request from '@/api/config'
import type { ResponseResult } from '@/interface'

export const listFollowedCompanies = () =>
    request<ResponseResult, any>({
        url: 'applicant/follows/companies',
        method: 'GET',
    })

export const toggleFollowedCompany = (companyId: number) =>
    request<ResponseResult, any>({
        url: `applicant/follows/companies/${companyId}/toggle`,
        method: 'POST',
    })

