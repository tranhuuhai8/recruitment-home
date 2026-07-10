import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import ActionColumn from '../components/ActionColumn.vue'

const { t } = i18n

export const columns: ColumnTable[] = [
    {
        title: t('applicant.saved_jobs.labels.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
        fixed: 'left',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('applicant.saved_jobs.labels.job_title'),
        dataIndex: 'title',
        key: 'title',
        align: 'center',
        customRender: ({ record }) => (
            <a href={`/viec-lam/${record.slug}`} target="_blank">
                {record.title}
            </a>
        ),
    },
    {
        title: t('applicant.saved_jobs.labels.company_name'),
        dataIndex: 'company_name',
        key: 'company_name',
        align: 'center',
        customRender: ({ record }) => (
            <a href={`/cong-ty/${record.company_slug}`} target="_blank">
                {record.company_name}
            </a>
        ),
    },
    {
        title: t('applicant.saved_jobs.labels.is_applied'),
        dataIndex: 'is_applied',
        key: 'is_applied',
        align: 'center',
        customRender: ({ record }) => (
            <a-tag color={record.is_applied ? 'green' : 'default'}>
                {record.is_applied
                    ? t('applicant.saved_jobs.is_applied.yes')
                    : t('applicant.saved_jobs.is_applied.no')}
            </a-tag>
        ),
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        fixed: 'right',
        className: 'cel-action',
        customRender: ({ record }: any) => (
            <ActionColumn id={record.id} slug={record.slug} />
        ),
    },
]
