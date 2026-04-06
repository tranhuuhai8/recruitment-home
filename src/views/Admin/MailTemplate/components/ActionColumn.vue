<script setup lang="ts">
import { inject } from 'vue'
import { useI18n } from 'vue3-i18n'
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons-vue'

defineProps<{ record: any }>()

const handlePreview = inject('handlePreview') as (record: any) => void
const handleEdit = inject('handleEdit') as (record: any) => void
const onDelete = inject('onDeleteTemplate') as (id: number) => void
const { t } = useI18n()
</script>

<template>
    <a-row justify="center" class="col-action">
        <a-tooltip :title="t('contact.mail_template.preview')">
            <div
                class="icon-operation icon-detail"
                @click="handlePreview(record)"
            >
                <EyeOutlined />
            </div>
        </a-tooltip>
        <a-tooltip :title="t('update')">
            <div class="icon-operation icon-edit" @click="handleEdit(record)">
                <EditOutlined />
            </div>
        </a-tooltip>
        <a-tooltip :title="t('delete')">
            <div
                class="icon-operation icon-delete"
                @click="onDelete(record.id)"
            >
                <DeleteOutlined />
            </div>
        </a-tooltip>
    </a-row>
</template>

<style scoped lang="scss">
.col-action {
    gap: 10px;
}
</style>
