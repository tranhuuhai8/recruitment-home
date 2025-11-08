import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import DetailColumn from '@/components/common/TableData/DetailColumn.vue'
import { StatusColumnJob, TypeColumnJob } from '@/components/common'

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
        defaultSortOrder: 'descend',
    },
    {
        title: t('job.labels.title'),
        dataIndex: 'title',
        key: 'title',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
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
        title: t('job.labels.start_date'),
        dataIndex: 'start_date',
        key: 'start_date',
        align: 'center',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('job.labels.end_date'),
        dataIndex: 'end_date',
        key: 'end_date',
        align: 'center',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('job.labels.type'),
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        customRender: ({ record }) => <TypeColumnJob type={record.type} />,
    },
    {
        title: t('job.labels.status'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        customRender: ({ record }) => (
            <StatusColumnJob status={record.status} />
        ),
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        fixed: 'right',
        className: 'cel-action',
        customRender: ({ record }: any) => (
            <DetailColumn
                routeDetail={'company-jobs-detail'}
                routeEdit={'company-jobs-edit'}
                isDelete={true}
                id={record.id}
            />
        ),
    },
]
