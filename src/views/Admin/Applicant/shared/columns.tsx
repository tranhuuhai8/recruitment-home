import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import { GENDER_OPTIONS_SEARCH } from '@/libs'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import EditColumn from '@/components/common/TableData/EditColumn.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('applicant.labels.name'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        defaultSortOrder: 'descend',
        align: 'center',
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
        title: t('applicant.labels.telephone'),
        dataIndex: 'telephone',
        key: 'telephone',
        align: 'center',
    },
    {
        title: t('auth.labels.mail_address'),
        dataIndex: 'mail_address',
        key: 'mail_address',
        align: 'center',
    },
    {
        title: t('masterData.labels.status'),
        dataIndex: 'status',
        key: 'status',
        width: 150,
        align: 'center',
        customRender: ({ record }) => <StatusColumn status={record.status} />,
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        width: 100,
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
