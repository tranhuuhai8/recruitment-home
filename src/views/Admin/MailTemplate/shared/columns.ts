import { h, markRaw } from 'vue'
import { Tag } from 'ant-design-vue'
import type { ColumnTable } from '@/interface'
import { MAIL_TEMPLATE_TYPE_MAP } from './constants'
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
        title: t('contact.mail_template.name'),
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        width: 200,
    },
    {
        title: t('contact.mail_template.code'),
        dataIndex: 'code',
        key: 'code',
        align: 'left',
        width: 160,
    },
    {
        title: t('contact.mail_template.subject'),
        dataIndex: 'subject',
        key: 'subject',
        align: 'left',
        ellipsis: true,
        width: 220,
    },
    {
        title: t('type.label'),
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        width: 120,
        customRender: ({ record }) => {
            const t = MAIL_TEMPLATE_TYPE_MAP[record.type]
            return h(RawTag, { color: t?.color }, () => t?.label ?? record.type)
        },
    },
    {
        title: t('contact.mail_template.active'),
        dataIndex: 'is_active',
        key: 'is_active',
        align: 'center',
        width: 110,
        customRender: ({ record }) =>
            h(
                RawTag,
                { color: record.is_active ? 'success' : 'default' },
                () =>
                    record.is_active
                        ? t('contact.mail_template.active')
                        : t('contact.mail_template.inactive')
            ),
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        className: 'cel-action',
        fixed: 'right',
        width: 120,
        customRender: ({ record }: any) => h(RawActionColumn, { record }),
    },
]
