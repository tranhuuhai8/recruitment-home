import type { ParamsList } from '@/interface'
import { formatDay, mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const { search, status, created_at } = data

    return mapFilterQuery(
        query,
        search,
        mapKeyToData({
            status,
            created_at: formatDay(created_at),
        })
    )
}
