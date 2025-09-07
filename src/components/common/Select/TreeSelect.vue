<script setup lang="ts">
import { filterTreeSelect, getTreeData } from '@/libs'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const props = defineProps({
    modelValue: { type: [Number, Array<Number>], required: false },
    data: { type: Array<any>, required: false, default: [] },
    isMultiple: { type: Boolean, required: false, default: true },
    maxTagCount: { type: Number, required: false, default: 5 },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <a-tree-select
        allow-clear
        show-arrow
        show-search
        tree-default-expand-all
        :value="props.modelValue!"
        :multiple="props.isMultiple"
        :max-tag-count="props.maxTagCount"
        :tree-data="getTreeData(props.data ?? [])"
        :placeholder="t('select.placeholder')"
        :filterTreeNode="filterTreeSelect"
        @update:value="(val: number) => emit('update:modelValue', val)"
    />
</template>
