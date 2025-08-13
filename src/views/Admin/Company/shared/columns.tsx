import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import EditColumn from '@/components/common/TableData/EditColumn.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('company.labels.name'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        defaultSortOrder: 'descend',
        align: 'center',
    },
    {
        title: t('company.labels.short_name'),
        dataIndex: 'short_name',
        key: 'short_name',
        align: 'center',
    },
    {
        title: t('company.labels.telephone'),
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
                    name: 'admin-companies-edit',
                    params: { id: record.id },
                }}
            />
        ),
    },
]
