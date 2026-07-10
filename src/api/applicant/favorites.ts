import request from '@/api/config'
import type { ParamsList, ResponseList, ResponseResult } from '@/interface'

export const listSavedJobs = () =>
    request<ResponseResult, any>({
        url: 'applicant/favorites/jobs',
        method: 'GET',
    })

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: 'applicant/favorites/jobs/detail',
        method: 'GET',
        params: payload,
    })

export const toggleSavedJob = (jobSlug: string) =>
    request<ResponseResult, any>({
        url: `applicant/favorites/jobs/${jobSlug}/toggle`,
        method: 'POST',
    })
