export const REGEX_FLOAT = /^-?\d+(\.\d+)?$/
export const REGEX_UNSIGNED_FLOAT = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/
export const REGEX_NUMBER = /^([0-9\s]*)$/
export const REGEX_NUMBER_AND_DASH = /^([0-9\s-]*)$/
export const REGEX_FORMAT_PRICE = /\s\s+|,|[^0-9]/g
export const REGEX_TEL = /^(?:0|\+84)([35789]\d{8})$/
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const REGEX_ONLY_NUMBER = /[0-9]/
export const REGEX_UPPERCASE = /[A-Z]/
export const REGEX_LOWERCASE = /[a-z]/
export const REGEX_CHARACTER = /[!@#$%^&*()_+{}[\]:<>,.?~\\/-]/

export const REGEX_NO_SPECIAL_CHARS = /^[\p{L}\p{M}0-9\s]+$/u

export const REGEX_NO_SPECIAL_CHARS_DES =
    /^[\p{L}\p{M}0-9 \n\r.,!?:;"'()\-–—_/@&%]+$/u

export const REGEX_WEBSITE =
    /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/
