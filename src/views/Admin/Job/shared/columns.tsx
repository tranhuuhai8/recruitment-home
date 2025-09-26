import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import DetailColumn from '@/components/common/TableData/DetailColumn.vue'
import { StatusColumnJob, TypeColumnJob } from '@/components/common'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('job.labels.id'),
        dataIndex: 'id',
        key: 'id',
        width: 50,
        align: 'center',
    },
    {
        title: t('job.labels.title'),
        dataIndex: 'title',
        key: 'title',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        defaultSortOrder: 'descend',
        align: 'center',
    },
    {
        title: t('job.labels.company'),
        dataIndex: 'company_name',
        key: 'company_name',
        align: 'center',
        width: 250,
        customRender: ({ record }) => <span>{record.company?.name}</span>,
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
        title: t('job.labels.type'),
        dataIndex: 'type',
        key: 'type',
        width: 150,
        align: 'center',
        customRender: ({ record }) => <TypeColumnJob type={record.type} />,
    },
    {
        title: t('job.labels.status'),
        dataIndex: 'status',
        key: 'status',
        width: 120,
        align: 'center',
        customRender: ({ record }) => <StatusColumnJob status={record.status} />,
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        width: 90,
        customRender: ({ record }: any) => (
            <DetailColumn
                url={{
                    name: 'admin-jobs-edit',
                    params: { id: record.id },
                }}
                id={record.id}
            />
        ),
    },
]
