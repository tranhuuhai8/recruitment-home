import type { ParamsList } from '@/interface'
import { formatMoney, mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>,
    categoryId?: number
) => {
    const { search, city_id, job_category_id } = data

    return mapFilterQuery(
        query,
        search,
        mapKeyToData({
            city_id,
            job_category_id: categoryId ?? job_category_id,
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
