<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue'

const props = defineProps(['data'])

const handleClick = () => {
    const event = new CustomEvent('editClick', { detail: props.data })
    window.dispatchEvent(event)
}
</script>

<template>
    <div class="icon-operation icon-edit" @click="handleClick">
        <EditOutlined />
    </div>
</template>
