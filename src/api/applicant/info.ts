import request from '@/api/config'
import type { FormDataApplicant, ResponseList } from '@/interface'

export const update = (payload: FormDataApplicant) =>
    request<ResponseList, ResponseList>({
        url: `applicant/update`,
        method: 'PUT',
        data: payload,
    })
