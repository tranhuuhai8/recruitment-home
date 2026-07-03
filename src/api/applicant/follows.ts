import request from '@/api/config'
import type { ParamsList, ResponseList, ResponseResult } from '@/interface'

export const listFollowedCompanies = () =>
    request<ResponseResult, any>({
        url: 'applicant/follows/companies',
        method: 'GET',
    })

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: 'applicant/follows/companies/detail',
        method: 'GET',
        params: payload,
    })

export const toggleFollowedCompany = (companySlug: string) =>
    request<ResponseResult, any>({
        url: `applicant/follows/companies/${companySlug}/toggle`,
        method: 'POST',
    })

export const toggleNotifyNewJob = (companySlug: string) =>
    request<ResponseResult, any>({
        url: `applicant/follows/companies/${companySlug}/notify/toggle`,
        method: 'POST',
    })
