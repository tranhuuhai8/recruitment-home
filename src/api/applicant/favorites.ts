import request from '@/api/config'
import type { ResponseResult } from '@/interface'

export const listSavedJobs = () =>
    request<ResponseResult, any>({
        url: 'applicant/favorites/jobs',
        method: 'GET',
    })

export const toggleSavedJob = (jobId: number) =>
    request<ResponseResult, any>({
        url: `applicant/favorites/jobs/${jobId}/toggle`,
        method: 'POST',
    })

