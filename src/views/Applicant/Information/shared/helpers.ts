import type { Applicant, FormDataApplicant } from '@/interface'
import { formatDay, GENDER_MALE } from '@/libs'
import dayjs from 'dayjs'

export const mapDataUpdate = (data: FormDataApplicant) => ({
    ...data,
    birthday: formatDay(data.birthday),
})

export const mapDataForm = (
    data: Record<string, any>,
    applicant: Applicant
) => ({
    mail_address: data.mail_address,
    birthday: applicant?.birthday ? dayjs(applicant.birthday) : '',
    gender: applicant?.gender ?? GENDER_MALE,
    name: applicant?.name,
    telephone: applicant?.telephone,
    address: applicant?.address,
    description: applicant?.description,
    avatar: applicant?.avatar,
})
