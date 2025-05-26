import i18n from '@/lang'
import type { ColumnTable } from '@/interface'
import StatusDisplayColumn from '@/components/common/Column/StatusDisplayColumn.vue'
import TypeColumn from '@/components/common/Column/TypeColumn.vue'

const { t } = i18n

export const columnsCity: ColumnTable[] = [
    {
        title: t('masterData.labels.name'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        defaultSortOrder: 'ascend',
        align: 'center',
    },
    {
        title: t('masterData.labels.description'),
        dataIndex: 'description',
        key: 'description',
        align: 'center',
    },
    {
        title: t('masterData.labels.status'),
        dataIndex: 'status',
        key: 'status',
        width: 150,
        align: 'center',
        customRender: ({ record }) => (
            <StatusDisplayColumn status={record.status} />
        ),
    },
]

export const columnsJobCategory: ColumnTable[] = [
    {
        title: t('masterData.labels.name'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
        sorter: true,
        align: 'center',
        sortDirections: ['descend', 'ascend', 'descend'],
        defaultSortOrder: 'ascend',
    },
    {
        title: t('masterData.labels.description'),
        dataIndex: 'description',
        key: 'description',
        align: 'center',
    },
    {
        title: t('masterData.labels.status'),
        dataIndex: 'status',
        key: 'status',
        width: 150,
        align: 'center',
        customRender: ({ record }) => (
            <StatusDisplayColumn status={record.status} />
        ),
    },
    {
        title: t('masterData.labels.type'),
        dataIndex: 'type',
        key: 'type',
        width: 150,
        align: 'center',
        customRender: ({ record }) => <TypeColumn type={record.type} />,
    },
]
