import type { ParamsList } from '@/interface'
import { formatMoney, mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>,
    categoryIds?: Array<number>
) => {
    const { search, city_id, job_category_id } = data

    return mapFilterQuery(
        query,
        search,
        mapKeyToData({
            city_id,
            job_category_id: categoryIds ?? job_category_id,
        })
    )
}

export const getQuerySearchJob = (
    query: ParamsList,
    data: Record<string, any>,
    company_id?: number
) => {
    const { search, type, job_category_id } = data

    return mapFilterQuery(
        query,
        search,
        mapKeyToData({
            type,
            job_category_id,
            company_id,
        })
    )
}

export const getSalaryText = ({
    salary_min,
    salary_max,
}: Record<string, any>) => {
    const min = formatMoney(salary_min)
    const max = formatMoney(salary_max)

    if (!salary_min && salary_max) return `<= ${max}`
    if (salary_min && !salary_max) return `>= ${min}`
    if (salary_min && salary_max) return `${min} ~ ${max}`
    return 'Thỏa thuận'
}
