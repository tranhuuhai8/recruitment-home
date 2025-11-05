import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import { GENDER_OPTIONS_SEARCH } from '@/libs'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import EditColumn from '@/components/common/TableData/EditColumn.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
        fixed: 'left',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('applicant.labels.avatar'),
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'center',
        className: 'cel-avatar',
        customRender: ({ record }) => <img src={record.avatar} alt="" />,
    },
    {
        title: t('applicant.labels.name'),
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        align: 'center',
        defaultSortOrder: 'ascend',
    },
    {
        title: t('applicant.labels.gender'),
        dataIndex: 'gender',
        key: 'gender',
        align: 'center',
        customRender: ({ record }) => (
            <span>{GENDER_OPTIONS_SEARCH[record.gender]}</span>
        ),
    },
    {
        title: t('applicant.labels.birthday'),
        dataIndex: 'birthday',
        key: 'birthday',
        align: 'center',
    },
    {
        title: t('applicant.labels.telephone'),
        dataIndex: 'telephone',
        key: 'telephone',
        align: 'center',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('auth.labels.mail_address'),
        dataIndex: 'mail_address',
        key: 'mail_address',
        align: 'center',
    },
    {
        title: t('applicant.labels.address'),
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
    {
        title: t('status.label'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        customRender: ({ record }) => <StatusColumn status={record.status} />,
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        fixed: 'right',
        className: 'cel-action',
        customRender: ({ record }: any) => (
            <EditColumn
                url={{
                    name: 'admin-applicants-edit',
                    params: { id: record.id },
                }}
            />
        ),
    },
]
