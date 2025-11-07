export const mapDataUpsert = (data: Record<string, any>[]) =>
    data.map((f: any, idx: any) => ({
        ...f,
        order: idx + 1,
    }))
