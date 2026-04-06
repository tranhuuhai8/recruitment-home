import type { ParamsList } from '@/interface'
import { mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const { search, status, priority } = data
    return mapFilterQuery(query, search, mapKeyToData({ status, priority }))
}
