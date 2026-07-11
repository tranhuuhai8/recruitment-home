import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import { GENDER_OPTIONS_SEARCH, formatBytes } from '@/libs'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import DetailColumn from '@/components/common/TableData/DetailColumn.vue'
import { StatusColumnApply } from '@/components/common'
import { RouterLink } from 'vue-router'

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
            <DetailColumn
                routeEdit={'admin-applicants-edit'}
                routeDetail={'admin-applicants-detail'}
                paramKey={'id'}
                id={record.id}
                isDelete={false}
            />
        ),
    },
]

export const appliedJobColumns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
    },
    {
        title: t('apply.labels.job_title'),
        dataIndex: 'job_title',
        key: 'job_title',
        align: 'center',
        customRender: ({ record }) => (
            <RouterLink
                to={{
                    name: 'admin-jobs-detail',
                    params: { id: record.job_id },
                }}
            >
                {record.job_title}
            </RouterLink>
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

export const savedJobColumns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
    },
    {
        title: t('apply.labels.job_title'),
        dataIndex: 'job_title',
        key: 'job_title',
        align: 'center',
        customRender: ({ record }) => (
            <RouterLink
                to={{
                    name: 'admin-jobs-detail',
                    params: { id: record.job_id },
                }}
            >
                {record.job_title}
            </RouterLink>
        ),
    },
    {
        title: t('apply.labels.company_name'),
        dataIndex: 'company_name',
        key: 'company_name',
        align: 'center',
    },
    {
        title: t('job.detail.saved_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
    },
]

export const fileColumns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
    },
    {
        title: t('applicant.file.title_page'),
        dataIndex: 'file_name',
        key: 'file_name',
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
        title: t('applicant.labels.file_type'),
        dataIndex: 'file_type',
        key: 'file_type',
        align: 'center',
    },
    {
        title: t('applicant.labels.file_size'),
        dataIndex: 'file_size',
        key: 'file_size',
        align: 'center',
        customRender: ({ record }) => (
            <span>{formatBytes(record.file_size)}</span>
        ),
    },
    {
        title: t('job.labels.created_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
    },
]

export const followedCompanyColumns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
    },
    {
        title: t('company.labels.logo'),
        dataIndex: 'company_logo',
        key: 'company_logo',
        align: 'center',
        className: 'cel-logo',
        customRender: ({ record }) => <img src={record.company_logo} alt="" />,
    },
    {
        title: t('company.labels.name'),
        dataIndex: 'company_name',
        key: 'company_name',
        align: 'center',
        customRender: ({ record }) => (
            <RouterLink
                to={{
                    name: 'admin-companies-detail',
                    params: { id: record.company_user_id },
                }}
            >
                {record.company_name}
            </RouterLink>
        ),
    },
    {
        title: t('company.detail.notify_new_job'),
        dataIndex: 'notify_new_job',
        key: 'notify_new_job',
        align: 'center',
        customRender: ({ record }) => (
            <a-tag color={record.notify_new_job ? 'green' : 'default'}>
                {record.notify_new_job ? t('status.on') : t('status.off')}
            </a-tag>
        ),
    },
    {
        title: t('company.detail.followed_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
    },
]
