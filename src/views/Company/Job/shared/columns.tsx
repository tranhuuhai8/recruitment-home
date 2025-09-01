import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import EditColumn from '@/components/common/TableData/EditColumn.vue'
import TypeColumn from '../components/TypeColumn.vue'
import StatusColumn from '../components/StatusColumn.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('job.labels.name'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        defaultSortOrder: 'descend',
        align: 'center',
    },
    {
        title: t('job.labels.category'),
        dataIndex: 'job_category_name',
        key: 'job_category_name',
        align: 'center',
        customRender: ({ record }) => (
            <span>
                {record.job_category_name} <br />{' '}
                {record.job_category_parent_name}
            </span>
        ),
    },
    {
        title: t('job.labels.start_date'),
        dataIndex: 'start_date',
        key: 'start_date',
        align: 'center',
    },
    {
        title: t('job.labels.end_date'),
        dataIndex: 'end_date',
        key: 'end_date',
        align: 'center',
    },
    {
        title: t('job.labels.city'),
        dataIndex: 'city_name',
        key: 'city_name',
        align: 'center',
        customRender: ({ record }) => (
            <span>
                {record.city_name} <br /> {record.city_parent_name}
            </span>
        ),
    },
    {
        title: t('job.labels.type'),
        dataIndex: 'type',
        key: 'type',
        width: 150,
        align: 'center',
        customRender: ({ record }) => <TypeColumn type={record.type} />,
    },
    {
        title: t('job.labels.status'),
        dataIndex: 'status',
        key: 'status',
        width: 120,
        align: 'center',
        customRender: ({ record }) => <StatusColumn status={record.status} />,
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        width: 90,
        customRender: ({ record }: any) => (
            <EditColumn
                url={{
                    name: 'company-jobs-edit',
                    params: { id: record.id },
                }}
            />
        ),
    },
]
