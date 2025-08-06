import request from '@/api/config'
import type { FormDataCompany, ResponseList } from '@/interface'

export const update = (payload: FormDataCompany) =>
    request<ResponseList, ResponseList>({
        url: `company/update`,
        method: 'PUT',
        data: payload,
    })
