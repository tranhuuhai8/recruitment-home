import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import { StatusColumnApply } from '@/components/common'
import JobTitleColumn from '../components/JobTitleColumn.vue'
import DetailColumn from '@/components/common/TableData/DetailColumn.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('apply.labels.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
        fixed: 'left',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('apply.labels.full_name'),
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'center',
    },
    {
        title: t('apply.labels.job_title'),
        dataIndex: 'job_title',
        key: 'job_title',
        align: 'center',
        customRender: ({ record }) => (
            <JobTitleColumn
                routeDetail={'company-jobs-detail'}
                slug={record.job_slug}
                name={record.job_title}
            />
        ),
    },
    {
        title: t('apply.labels.file'),
        dataIndex: 'file_path',
        key: 'file_path',
        align: 'center',
        customRender: ({ record }) => (
            <a
                href={record.file_path}
                target="_blank"
                rel="noopener noreferrer"
            >
                {record.file_name}
            </a>
        ),
    },
    {
        title: t('apply.labels.created_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        defaultSortOrder: 'descend',
    },
    {
        title: t('apply.labels.email'),
        dataIndex: 'email',
        key: 'email',
        align: 'center',
    },
    {
        title: t('apply.labels.telephone'),
        dataIndex: 'telephone',
        key: 'telephone',
        align: 'center',
    },
    {
        title: t('apply.labels.status'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        customRender: ({ record }) => (
            <StatusColumnApply status={record.status} />
        ),
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        fixed: 'right',
        className: 'cel-action',
        customRender: ({ record }: any) => (
            <DetailColumn id={record.id} isUpdate={true} />
        ),
    },
]
