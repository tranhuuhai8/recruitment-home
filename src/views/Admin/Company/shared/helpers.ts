import type { ParamsList } from '@/interface'
import { mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const { status, search } = data
    console.log('data :>> ', data)

    return mapFilterQuery(query, search, mapKeyToData({ status }))
}
