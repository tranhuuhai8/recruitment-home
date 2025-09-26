import type { CityForm, JobCategoryForm, ParamsList } from '@/interface'
import { mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>,
    hasType = false
) => {
    const { status, search, parent_id } = data

    return mapFilterQuery(
        query,
        search,
        hasType
            ? mapKeyToData({ status, parent_id, type: data?.type })
            : mapKeyToData({ status, parent_id })
    )
}

export const makeDataCity = (data: CityForm) => ({
    name: data.name,
    description: data.description,
    parent_id: data.parent_id ?? null,
    status: data.status,
})

export const makeDataJobCategory = (data: JobCategoryForm) => ({
    name: data.name,
    description: data.description,
    parent_id: data.parent_id ?? null,
    status: data.status,
    type: data.type,
})
