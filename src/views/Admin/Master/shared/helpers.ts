import type { ParamsList } from '@/interface'
import { mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>,
    hasType = false
) => {
    const { status, search } = data

    return mapFilterQuery(
        query,
        search,
        hasType
            ? mapKeyToData({ status, type: data?.type })
            : mapKeyToData({ status })
    )
}
