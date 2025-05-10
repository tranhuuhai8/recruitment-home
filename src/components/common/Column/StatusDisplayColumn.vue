<script lang="ts" setup>
import i18n from '@/lang'

const { t } = i18n
const props = defineProps(['status'])
</script>

<template>
    <div
        class="type-status"
        :class="props.status === 1 ? 'active' : 'inactive'"
    >
        {{ props.status === 1 ? t('status.show') : t('status.hide') }}
    </div>
</template>

<style scoped lang="scss">
div {
    padding: 5px 8px;
    max-width: 100px;
    margin: 0 auto;
}
</style>
