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
    isDelete?: boolean
    routeEdit?: string | null
    routeDetail?: string | null
    paramKey?: string
    id: number | string
}>()
const router = useRouter()
const handleDelete = inject('handleDelete') as (id: number | string) => void
const handleUpdate = inject('handleUpdate') as (id: number | string) => void

const handleDetail = () =>
    router.push({
        name: props.routeDetail ?? '',
        params: { [props.paramKey ?? 'id']: props.id },
    })

const handleEdit = (event: Event) => {
    if (props.isUpdate) {
        return onUpdate(event)
    }

    router.push({
        name: props.routeEdit ?? '',
        params: { [props.paramKey ?? 'id']: props.id },
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
    <a-row justify="center" class="col-action">
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
        <div
            v-if="isDelete"
            class="icon-operation icon-delete"
            @click="onDelete"
        >
            <DeleteOutlined />
        </div>
    </a-row>
</template>
