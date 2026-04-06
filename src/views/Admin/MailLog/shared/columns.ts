import { h, markRaw } from 'vue'
import { Tag } from 'ant-design-vue'
import type { ColumnTable } from '@/interface'
import { MAIL_LOG_STATUS_MAP } from './constants'
import ActionColumn from '../components/ActionColumn.vue'
import i18n from '@/lang'

const { t } = i18n
const RawTag = markRaw(Tag)
const RawActionColumn = markRaw(ActionColumn)

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
        title: t('contact.mail_log.contact_id'),
        dataIndex: 'contact_id',
        key: 'contact_id',
        align: 'center',
        width: 90,
    },
    {
        title: t('contact.mail_log.send_to'),
        dataIndex: 'to_email',
        key: 'to_email',
        align: 'left',
        width: 200,
    },
    {
        title: t('contact.sender.subject'),
        dataIndex: 'subject',
        key: 'subject',
        align: 'left',
        ellipsis: true,
        width: 220,
    },
    {
        title: t('status.label'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 110,
        customRender: ({ record }) => {
            const s = MAIL_LOG_STATUS_MAP[record.status]
            return h(
                RawTag,
                { color: s?.color },
                () => s?.label ?? record.status
            )
        },
    },
    {
        title: t('contact.mail_log.sent_time'),
        dataIndex: 'sent_at',
        key: 'sent_at',
        align: 'center',
        width: 160,
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('contact.mail_log.created_at'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        width: 160,
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        className: 'cel-action',
        fixed: 'right',
        width: 110,
        customRender: ({ record }: any) => h(RawActionColumn, { record }),
    },
]
