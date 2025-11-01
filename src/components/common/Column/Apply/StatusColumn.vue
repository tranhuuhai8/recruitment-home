<script lang="ts" setup>
import i18n from '@/lang'
import { STATUS_APPLY_MAP } from '@/libs'

const { t } = i18n
const props = defineProps(['status'])
</script>

<template>
    <div :class="`type-status apply ${STATUS_APPLY_MAP[props.status]}`">
        {{ t(`status.${STATUS_APPLY_MAP[props.status]}`) }}
    </div>
</template>

<style scoped lang="scss">
div {
    padding: 5px 8px;
    margin: 0 auto;
}
</style>
