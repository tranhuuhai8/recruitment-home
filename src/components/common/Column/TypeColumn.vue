<script lang="ts" setup>
import i18n from '@/lang'

const { t } = i18n
const props = defineProps(['type'])
</script>

<template>
    <div
        class="type-status"
        :class="props.type === 1 ? 'default' : 'customize'"
    >
        {{ props.type === 1 ? t('type.default') : t('type.customize') }}
    </div>
</template>

<style scoped lang="scss">
div {
    padding: 5px 8px;
    max-width: 100px;
    margin: 0 auto;
}
</style>
