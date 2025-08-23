import request from '@/api/config'
import type { ResponseList } from '@/interface'

export const list = (payload: Record<string, any>) =>
    request<ResponseList, ResponseList>({
        url: `home/company`,
        method: 'GET',
        params: payload,
    })
