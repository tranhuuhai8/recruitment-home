<script setup lang="ts">
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

withDefaults(
    defineProps<{
        modelValue: string
        options?: readonly string[]
        i18nPrefix?: string
    }>(),
    {
        options: () => ['7d', 'last_month', 'month'],
        i18nPrefix: 'dashboard.admin.title.range',
    }
)
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
    <a-radio-group
        class="range-filter"
        button-style="solid"
        :value="modelValue"
        @change="emit('update:modelValue', $event.target.value)"
    >
        <a-radio-button v-for="range in options" :key="range" :value="range">
            {{ t(`${i18nPrefix}.${range}`) }}
        </a-radio-button>
    </a-radio-group>
</template>
