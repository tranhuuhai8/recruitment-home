export const spliceZipCode: (code?: string) => string = (code = '') => {
    code = String(code)
    return `${code.slice(0, 3)}-${code.slice(3, 7)}`
}

export const clipTitle = (text: string) => {
    let title = text || '...'
    if (text?.length > 12) {
        title = (text || '').substring(0, 12) + '...'
    }
    return title
}
