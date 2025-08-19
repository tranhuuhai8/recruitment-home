import type { ParamsList } from '@/interface'
import { mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const { search, city_id } = data

    return mapFilterQuery(query, search, mapKeyToData({ city_id }))
}
