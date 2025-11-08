<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps<{
    routeDetail: string
    id: number
    name: string
}>()
const router = useRouter()

const handleDetailJob = () =>
    router.push({
        name: props.routeDetail,
        params: { id: props.id },
    })
</script>

<template>
    <span class="column-detail-job" @click="handleDetailJob">
        {{ props.name }}
    </span>
</template>

<style scoped lang="scss">
.column-detail-job {
    color: var(--vt-c-blue);
    cursor: pointer;
}
</style>
