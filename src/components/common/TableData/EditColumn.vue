<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const props = defineProps(['url'])
const router = useRouter()

const handleClick = () => router.push(props.url)
</script>

<template>
    <div class="icon-operation icon-edit" @click="handleClick">
        <EditOutlined />
    </div>
</template>
