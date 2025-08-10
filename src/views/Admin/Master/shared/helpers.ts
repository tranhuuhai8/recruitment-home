import type { ParamsList } from '@/interface'
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
