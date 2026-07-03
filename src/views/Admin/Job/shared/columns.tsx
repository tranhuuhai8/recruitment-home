import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import DetailColumn from '@/components/common/TableData/DetailColumn.vue'
import {
    StatusColumnJob,
    TypeColumnJob,
    StatusColumnApply,
} from '@/components/common'
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
        defaultSortOrder: 'descend',
    },
    {
        title: t('job.labels.title'),
        dataIndex: 'title',
        key: 'title',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        align: 'center',
        customRender: ({ record }) => (
            <a
                href={
                    router.resolve({
                        name: 'job-home-detail',
                        params: { slug: record.slug },
                    }).href
                }
                target="_blank"
                rel="noopener noreferrer"
            >
                {record.title}
            </a>
        ),
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
        title: t('job.labels.company'),
        dataIndex: 'company_name',
        key: 'company_name',
        align: 'center',
        customRender: ({ record }) => (
            <a
                href={
                    router.resolve({
                        name: 'company-home-detail',
                        params: { slug: record.company?.slug },
                    }).href
                }
                target="_blank"
                rel="noopener noreferrer"
            >
                {record.company?.name}
            </a>
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
        title: t('job.labels.created_at'),
        dataIndex: 'created_at',
        key: 'created_at',
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
                routeEdit={'admin-jobs-edit'}
                routeDetail={'admin-jobs-detail'}
                paramKey={'id'}
                id={record.id}
                isDelete={true}
            />
        ),
    },
]

export const applicationColumns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
    },
    {
        title: t('applicant.labels.name'),
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'center',
    },
    {
        title: t('auth.labels.mail_address'),
        dataIndex: 'email',
        key: 'email',
        align: 'center',
    },
    {
        title: t('applicant.labels.telephone'),
        dataIndex: 'telephone',
        key: 'telephone',
        align: 'center',
    },
    {
        title: t('apply.labels.file'),
        dataIndex: 'file_path',
        key: 'file_path',
        align: 'center',
        customRender: ({ record }) =>
            record.file_path ? (
                <a
                    href={record.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {record.file_name}
                </a>
            ) : (
                <span>-</span>
            ),
    },
    {
        title: t('status.label'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        customRender: ({ record }) => (
            <StatusColumnApply status={record.status} />
        ),
    },
    {
        title: t('job.detail.applied_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
    },
]

export const favoriteColumns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
    },
    {
        title: t('applicant.labels.name'),
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'center',
    },
    {
        title: t('auth.labels.mail_address'),
        dataIndex: 'email',
        key: 'email',
        align: 'center',
    },
    {
        title: t('applicant.labels.telephone'),
        dataIndex: 'telephone',
        key: 'telephone',
        align: 'center',
    },
    {
        title: t('job.detail.saved_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
    },
]
