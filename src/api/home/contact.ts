import request from '@/api/config'
import type { ResponseResult, IContactFormDto } from '@/interface'

export const submitContact = (payload: IContactFormDto) =>
    request<ResponseResult, any>({
        url: 'home/contact',
        method: 'POST',
        data: payload,
    })
