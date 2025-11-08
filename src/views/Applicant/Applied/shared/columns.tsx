import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import { StatusColumnApply } from '@/components/common'
import JobTitleColumn from '../components/JobTitleColumn.vue'

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
        title: t('apply.labels.job_title'),
        dataIndex: 'job_title',
        key: 'job_title',
        align: 'center',
        customRender: ({ record }) => (
            <JobTitleColumn
                routeDetail={'job-home-detail'}
                id={record.job_id}
                name={record.job_title}
            />
        ),
    },
    {
        title: t('apply.labels.company_name'),
        dataIndex: 'company_name',
        key: 'company_name',
        align: 'center',
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
        title: t('apply.labels.cover_letter'),
        dataIndex: 'cover_letter',
        key: 'cover_letter',
        align: 'center',
    },
    {
        title: t('apply.labels.status'),
        dataIndex: 'status',
        key: 'status',
        fixed: 'right',
        align: 'center',
        customRender: ({ record }) => (
            <StatusColumnApply status={record.status} />
        ),
    },
]
