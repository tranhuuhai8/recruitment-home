import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import StatusColumn from '@/components/common/Column/StatusColumn.vue'
import DetailColumn from '@/components/common/TableData/DetailColumn.vue'
import { TypeColumnJob, StatusColumnJob } from '@/components/common'
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
        customRender: ({ record }) =>
            record.slug ? (
                <a
                    href={
                        router.resolve({
                            name: 'company-home-detail',
                            params: { slug: record.slug },
                        }).href
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {record.name}
                </a>
            ) : (
                <span>{record.name}</span>
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
            <DetailColumn
                routeEdit={'admin-companies-edit'}
                routeDetail={'admin-companies-detail'}
                paramKey={'id'}
                id={record.id}
                isDelete={false}
            />
        ),
    },
]

export const jobColumns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
    },
    {
        title: t('job.labels.title'),
        dataIndex: 'title',
        key: 'title',
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
        title: t('job.labels.created_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        fixed: 'right',
        className: 'cel-action',
        customRender: ({ record }: any) => (
            <DetailColumn
                routeDetail={'admin-jobs-detail'}
                paramKey={'id'}
                id={record.id}
            />
        ),
    },
]

export const followerColumns: ColumnTable[] = [
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
        title: t('company.detail.notify_new_job'),
        dataIndex: 'notify_new_job',
        key: 'notify_new_job',
        align: 'center',
        customRender: ({ record }) => (
            <a-tag color={record.notify_new_job ? 'green' : 'default'}>
                {record.notify_new_job
                    ? t('status.active')
                    : t('status.unverified')}
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
