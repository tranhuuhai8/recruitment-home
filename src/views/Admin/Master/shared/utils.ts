import { notifyStatus, STATUS_CODE_SUCCESS } from '@/libs'

export const notifyDelete = (
    status: number,
    msgSuccess: string,
    msgError: string
) => {
    notifyStatus(status, status === STATUS_CODE_SUCCESS ? msgSuccess : msgError)
}
