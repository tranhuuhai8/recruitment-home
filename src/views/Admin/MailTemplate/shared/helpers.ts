import type { ParamsList } from '@/interface'
import { mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const { search, type } = data
    // is_active: bỏ qua nếu là '' (Tất cả), vì 0 và 1 là giá trị hợp lệ trong DB
    const is_active = data.is_active === '' ? undefined : data.is_active
    return mapFilterQuery(query, search, mapKeyToData({ is_active, type }))
}
