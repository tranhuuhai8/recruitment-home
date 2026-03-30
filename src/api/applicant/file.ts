import request from '@/api/config'
import type { ParamsList, ResponseList } from '@/interface'

export const list = () =>
    request<ResponseList, ResponseList>({
        url: `applicant/file-upload`,
        method: 'GET',
    })

export const upsert = (payload: ParamsList[]) =>
    request<ResponseList, ResponseList>({
        url: `applicant/file-upload/upsert`,
        method: 'PUT',
        data: payload,
    })
