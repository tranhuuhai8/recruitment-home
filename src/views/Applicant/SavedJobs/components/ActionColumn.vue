<script lang="ts" setup>
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const props = defineProps<{
    id: number
    slug?: string
}>()
const router = useRouter()
const handleDelete = inject('handleDelete') as (id: number | string) => void

const handleDetail = () => {
    if (!props.slug) return
    const { href } = router.resolve({
        name: 'job-home-detail',
        params: { slug: props.slug },
    })
    window.open(href, '_blank')
}

const onDelete = (event: Event) => {
    event.stopPropagation()
    handleDelete && handleDelete(props.id)
}
</script>

<template>
    <a-row justify="center" class="col-action">
        <div class="icon-operation icon-detail" @click="handleDetail">
            <EyeOutlined />
        </div>
        <div class="icon-operation icon-delete" @click="onDelete">
            <DeleteOutlined />
        </div>
    </a-row>
</template>
