import { h, markRaw } from 'vue'
import { Tag } from 'ant-design-vue'
import type { ColumnTable } from '@/interface'
import { CONTACT_STATUS_MAP, CONTACT_PRIORITY_MAP } from './constants'
import DetailColumn from '@/components/common/TableData/DetailColumn.vue'
import i18n from '@/lang'

const { t } = i18n
const RawTag = markRaw(Tag)

export const columns: ColumnTable[] = [
    {
        title: t('columns.id'),
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        className: 'cel-id',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('contact.sender.name'),
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'left',
        width: 160,
    },
    {
        title: t('contact.sender.email'),
        dataIndex: 'email',
        key: 'email',
        align: 'left',
        width: 200,
    },
    {
        title: t('contact.sender.subject'),
        dataIndex: 'title',
        key: 'title',
        align: 'left',
        ellipsis: true,
        width: 200,
    },
    {
        title: t('status.label'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 120,
        customRender: ({ record }) => {
            const s = CONTACT_STATUS_MAP[record.status]
            return h(
                RawTag,
                { color: s?.color },
                () => s?.label ?? record.status
            )
        },
    },
    {
        title: t('contact.sender.priority'),
        dataIndex: 'priority',
        key: 'priority',
        align: 'center',
        width: 120,
        customRender: ({ record }) => {
            const p = CONTACT_PRIORITY_MAP[record.priority]
            return h(
                RawTag,
                { color: p?.color },
                () => p?.label ?? record.priority
            )
        },
    },
    {
        title: t('contact.sender.replied_at'),
        dataIndex: 'replied_at',
        key: 'replied_at',
        align: 'center',
        width: 140,
    },
    {
        title: t('contact.mail_log.created_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        width: 140,
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        className: 'cel-action',
        fixed: 'right',
        width: 100,
        customRender: ({ record }: any) =>
            h(DetailColumn, {
                id: record.id,
                routeDetail: 'admin-contact-detail',
            }),
    },
]
