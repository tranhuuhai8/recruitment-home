<script lang="ts" setup>
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const props = defineProps<{
    url: Record<string, any>
    id: number
}>()
const router = useRouter()
const handleDelete = inject('handleDelete') as (id: number) => void

const handleClick = () => router.push(props.url)

const onDelete = (event: Event) => {
    event.stopPropagation()
    if (handleDelete) {
        handleDelete(props.id)
    }
}
</script>

<template>
    <a-row justify="space-between">
        <div class="icon-operation icon-edit" @click="handleClick">
            <EditOutlined />
        </div>
        <div class="icon-operation icon-delete" @click="onDelete">
            <DeleteOutlined />
        </div>
    </a-row>
</template>
