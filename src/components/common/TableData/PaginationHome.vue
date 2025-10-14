<script lang="ts" setup>
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const props = defineProps(['data'])
</script>

<template>
    <a-pagination
        class="tbl-pagination"
        show-less-items
        :total="props.data?.total"
        :page-size="props.data?.per_page"
        :current="props.data?.current_page"
        :show-size-changer="false"
        @change="$emit('changePage', $event)"
    >
        <template #itemRender="{ type, originalElement }">
            <a v-if="type === 'prev'">{{ t('pagination.prev') }}</a>
            <a v-else-if="type === 'next'">{{ t('pagination.next') }}</a>
            <component :is="originalElement" v-else />
        </template>
    </a-pagination>
</template>
