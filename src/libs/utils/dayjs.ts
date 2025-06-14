import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {
    DAY_LIST,
    FORMAT_DATE_DASH,
    FORMAT_DATE_SLASH,
    FORMAT_DATETIME_DASH,
    FORMAT_TIME,
} from '../constants/constants'
import type { Dayjs } from 'dayjs'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Tokyo')

export type unitDayJsType =
    | 'day'
    | 'week'
    | 'month'
    | 'year'
    | 'hour'
    | 'minute'
    | 'second'
    | 'millisecond'

export const formatTimeRange = (event: Record<string, any>) =>
    dayjs(event?.start).format('H:mm') +
    ' ~ ' +
    dayjs(event?.end).format('H:mm')

export const formatDayJS = (day: any, format = FORMAT_DATE_DASH) => {
    if (!day) return null
    return dayjs(day, format)
}

export const startOfMonth = (date?: string | Dayjs) => dayjs(date).startOf('M')

export const endOfMonth = (date?: string | Dayjs) => dayjs(date).endOf('M')

export const getFirstDayTwoAdjacentMonth = (year: number, month: number) => ({
    firstDay: dayjs(year + '-' + month).startOf('M'),
    firstDayNextMonth: dayjs(year + '-' + (month + 1)).startOf('M'),
})

export const convertToDayJs = (data: string | Date) => dayjs(data)

export const formatDate = (
    date: string | Date,
    time: string | Date,
    timeFormat = FORMAT_TIME
) => {
    if (!time) return ''
    const newDate = formatDay(date)
    const newTime = formatDay(time, timeFormat)

    return dayjs(`${newDate} ${newTime}`)
}

export const formatDateJP = (date: Date | string) => {
    const day = dayjs(date).format('D')
    const month = dayjs(date).format('M')
    const dayOfWeek = formatDay(date, 'd')

    return month + '月' + day + '日' + ` (${DAY_LIST[parseInt(dayOfWeek) + 1]})`
}

export const formatRangeDateByMonth = (
    month: string,
    format = 'YYYY年MM月DD日'
) => {
    const start = dayjs(month).startOf('month')
    const end = dayjs(month).endOf('month')

    return formatDay(start, format) + ' ~ ' + formatDay(end, format)
}

export const formatDay = (day: any, format = FORMAT_DATE_DASH) => {
    if (!day) return ''
    return dayjs(day).format(format)
}

export const formatDayOfWeek = (day: any, format = FORMAT_DATE_SLASH) => {
    const formattedDay = DAY_LIST[+formatDay(day, 'd') + 1]
    return formatDay(day, format) + `(${formattedDay})`
}

export const formatDateTime = (date: any, time: any) => {
    if (!date || !time) return ''
    return formatDay(date) + ' ' + formatDay(time, FORMAT_TIME)
}

export const getMonthByNumber = (month: string | Dayjs, number: number) => {
    const monthVal = !month ? dayjs() : dayjs(month)
    return monthVal.add(number, 'month')
}

export const formatDateArr = (dates: string[], format = FORMAT_DATETIME_DASH) =>
    dates.map((item) => formatDay(item, format))

export const disabledDatePast = (currentDate: Dayjs) =>
    currentDate.add(1, 'day').isBefore(dayjs())

export const disabledDateFuture = (currentDate: Dayjs) =>
    currentDate.isAfter(dayjs())

// export const disabledDateFuture = (date: Dayjs) => {
//   return date.isAfter(dayjs(), 'day') // vô hiệu hóa ngày sau hôm nay
// }

export const addTime = (
    date: string | Dayjs,
    number = 1,
    unit: unitDayJsType = 'day'
) => dayjs(date).add(number, unit)

export default dayjs.tz
