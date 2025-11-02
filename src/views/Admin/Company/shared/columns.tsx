import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import EditColumn from '@/components/common/TableData/EditColumn.vue'
import router from '@/router'

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
        title: t('company.labels.logo'),
        dataIndex: 'logo',
        key: 'logo',
        align: 'center',
        className: 'cel-logo',
        customRender: ({ record }) => <img src={record.logo} alt="" />,
    },
    {
        title: t('company.labels.name'),
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend'],
        defaultSortOrder: 'ascend',
        align: 'center',
        customRender: ({ record }) => (
            <a
                href={
                    router.resolve({
                        name: 'company-home-detail',
                        params: { id: record.company_id },
                    }).href
                }
                target="_blank"
                rel="noopener noreferrer"
            >
                {record.name}
            </a>
        ),
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
                    name: 'admin-companies-edit',
                    params: { id: record.id },
                }}
            />
        ),
    },
]
