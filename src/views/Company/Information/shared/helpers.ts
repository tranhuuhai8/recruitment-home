import type { Company } from '@/interface'
import { TRUE_VALUE } from '@/libs'

export const mapDataForm = (data: Record<string, any>, company: Company) => ({
    logo: company.logo,
    cover_img: company.cover_img,
    mail_address: data.mail_address,
    name: company?.name,
    short_name: company?.short_name,
    website: company?.website,
    telephone: company?.telephone,
    city_id: company?.city_id ?? TRUE_VALUE,
    address: company?.address,
    description: company?.description,
})
