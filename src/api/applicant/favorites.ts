import request from '@/api/config'
import type { ResponseResult } from '@/interface'

export const listSavedJobs = () =>
    request<ResponseResult, any>({
        url: 'applicant/favorites/jobs',
        method: 'GET',
    })

export const toggleSavedJob = (jobSlug: string) =>
    request<ResponseResult, any>({
        url: `applicant/favorites/jobs/${jobSlug}/toggle`,
        method: 'POST',
    })
