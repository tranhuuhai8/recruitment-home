import request from '@/api/config'
import type { ParamsList, ResponseList } from '@/interface'

export const list = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `home/master-data/cities`,
        method: 'GET',
        params: payload,
    })

export const listParent = (payload: ParamsList) =>
    request<ResponseList, ResponseList>({
        url: `home/master-data/cities-parent`,
        method: 'GET',
        params: payload,
    })
