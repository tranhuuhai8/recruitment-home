import { FALSE_VALUE, getUserInformation, TRUE_VALUE } from '@/libs'

export const INITIAL_VALUE_FILE = {
    id: null,
    applicant_id: getUserInformation()?.applicant.id,
    file_type: 'pdf',
    file_path: '',
    file_name: '',
    file_size: FALSE_VALUE,
    order: TRUE_VALUE,
}
