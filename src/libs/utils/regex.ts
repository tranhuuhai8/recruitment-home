export const REGEX_FLOAT = /^-?\d+(\.\d+)?$/
export const REGEX_UNSIGNED_FLOAT = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/
export const REGEX_NUMBER = /^([0-9\s]*)$/
export const REGEX_NUMBER_AND_DASH = /^([0-9\s-]*)$/
export const REGEX_FORMAT_PRICE = /\s\s+|,|[^0-9]/g
export const REGEX_TEL =
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
export const REGEX_TEL_V2 = /^[0-9０-９]+$/
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
