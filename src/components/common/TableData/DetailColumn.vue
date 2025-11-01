<script lang="ts" setup>
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const props = defineProps<{
    isUpdate?: boolean
    routeEdit?: string | null
    routeDetail?: string | null
    id: number
}>()
const router = useRouter()
const handleDelete = inject('handleDelete') as (id: number) => void
const handleUpdate = inject('handleUpdate') as (id: number) => void

const handleDetail = () =>
    router.push({
        name: props.routeDetail ?? '',
        params: { id: props.id },
    })

const handleEdit = (event: Event) => {
    if (props.isUpdate) {
        return onUpdate(event)
    }

    router.push({
        name: props.routeEdit ?? '',
        params: { id: props.id },
    })
}

const onUpdate = (event: Event) => {
    event.stopPropagation()
    handleUpdate && handleUpdate(props.id)
}

const onDelete = (event: Event) => {
    event.stopPropagation()
    handleDelete && handleDelete(props.id)
}
</script>

<template>
    <a-row justify="space-between">
        <div
            v-if="routeDetail"
            class="icon-operation icon-detail"
            @click="handleDetail"
        >
            <EyeOutlined />
        </div>
        <div
            v-if="routeEdit || isUpdate"
            class="icon-operation icon-edit"
            @click="handleEdit"
        >
            <EditOutlined />
        </div>
        <div class="icon-operation icon-delete" @click="onDelete">
            <DeleteOutlined />
        </div>
    </a-row>
</template>
