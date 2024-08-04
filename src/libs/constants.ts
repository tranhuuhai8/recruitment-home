export const START_YEAR = 1920
export const STATUS_CODE_SUCCESS = 200
export const STATUS_CODE_BAD_REQUEST = 400
export const STATUS_CODE_UNAUTHORIZED = 401
export const STATUS_CODE_FORBIDDEN = 403
export const STATUS_CODE_NOT_FOUND = 404
export const STATUS_CODE_VALIDATE_ERROR = 422
export const STATUS_CODE_SERVER_ERROR = 500
export const HTTP_TOO_MANY_REQUESTS = 429

export const PAGE_FIRST = 1
export const PER_PAGE = 10
export const MAX_STRING = 255
export const MIN_STRING = 6
export const MAX_SIZE_CSV = 10485760

export const INITIAL_PAGINATE = {
    page: PAGE_FIRST,
    lastPage: 0,
    perPage: PER_PAGE,
    data: [],
    total: 0,
}

export const INITIAL_QUERY = {
    page: PAGE_FIRST,
    search: '',
    per_page: PER_PAGE,
    orders: [{ key: 'id', dir: 'descending' }],
    filters: [],
}

export const PAYLOAD_ALL = {
    all: 1,
}

export const REGEX_NUMBER = /^([0-9\s]*)$/
export const REGEX_FORMAT_SALARY = /\s\s+|,|[^0-9]/g
export const REGEX_TEL =
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
export const REGEX_EMAIL =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export const ROLE_ADMIN = 1
export const ROLE_EMPLOYER = 2
export const ROLE_CANDIDATE = 3
