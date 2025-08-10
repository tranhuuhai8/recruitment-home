export const REGEX_FLOAT = /^-?\d+(\.\d+)?$/
export const REGEX_UNSIGNED_FLOAT = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/
export const REGEX_NUMBER = /^([0-9\s]*)$/
export const REGEX_NUMBER_AND_DASH = /^([0-9\s-]*)$/
export const REGEX_FORMAT_PRICE = /\s\s+|,|[^0-9]/g
export const REGEX_TEL = /^(0|\+84)(3|5|7|8|9)\d{8,9}$/
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const REGEX_UPPERCASE = /[A-Z]/
export const REGEX_LOWERCASE = /[a-z]/
export const REGEX_CHARACTER = /[!@#$%^&*()_+{}[\]:<>,.?~\\/-]/
