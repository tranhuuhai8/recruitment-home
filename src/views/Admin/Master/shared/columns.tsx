import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import StatusDisplayColumn from '@/components/common/Column/StatusDisplayColumn.vue'
import TypeColumn from '@/components/common/Column/TypeColumn.vue'
import EditByModal from '@/components/common/TableData/EditByModal.vue'

const { t } = i18n

export const columnsCity: ColumnTable[] = [
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
        title: t('masterData.labels.city_name'),
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend'],
        defaultSortOrder: 'ascend',
        align: 'center',
    },
    {
        title: t('masterData.labels.parent_city_name'),
        dataIndex: 'parent_name',
        key: 'parent_name',
        align: 'center',
        customRender: ({ record }) => <span>{record.parent?.name}</span>,
    },
    {
        title: t('masterData.labels.description'),
        dataIndex: 'description',
        key: 'description',
        className: 'description',
        align: 'center',
    },
    {
        title: t('masterData.labels.status'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        customRender: ({ record }) => (
            <StatusDisplayColumn status={record.status} />
        ),
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        fixed: 'right',
        className: 'cel-action',
        customRender: ({ record }: any) => <EditByModal data={record} />,
    },
]

export const columnsJobCategory: ColumnTable[] = [
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
        title: t('masterData.labels.category_name'),
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        align: 'center',
        sortDirections: ['ascend', 'descend', 'ascend'],
        defaultSortOrder: 'ascend',
    },
    {
        title: t('masterData.labels.parent_category_name'),
        dataIndex: 'parent_name',
        key: 'parent_name',
        align: 'center',
        customRender: ({ record }) => <span>{record.parent?.name}</span>,
    },
    {
        title: t('masterData.labels.description'),
        dataIndex: 'description',
        key: 'description',
        className: 'description',
        align: 'center',
    },
    {
        title: t('masterData.labels.status'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        customRender: ({ record }) => (
            <StatusDisplayColumn status={record.status} />
        ),
    },
    {
        title: t('masterData.labels.type'),
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        customRender: ({ record }) => <TypeColumn type={record.type} />,
    },
    {
        title: t('operation'),
        key: 'action',
        align: 'center',
        fixed: 'right',
        className: 'cel-action',
        customRender: ({ record }: any) => <EditByModal data={record} />,
    },
]
