<script lang="ts" setup>
import i18n from '@/lang'
import { TYPE_JOB_MAP } from '@/libs'

const { t } = i18n
const props = defineProps(['type'])
</script>

<template>
    <div :class="`type-status ${TYPE_JOB_MAP[props.type]}`">
        {{ t(`type.${TYPE_JOB_MAP[props.type]}`) }}
    </div>
</template>

<style scoped lang="scss">
div {
    padding: 5px 8px;
    max-width: 100px;
    margin: 0 auto;
}
</style>
