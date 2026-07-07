<script setup lang="ts">
withDefaults(
    defineProps<{
        label: string
        value: number | string
        suffix?: string
        clickable?: boolean
    }>(),
    {
        suffix: '',
        clickable: false,
    }
)

const emit = defineEmits<{ click: [] }>()
</script>

<template>
    <div
        class="total-item"
        :class="{ 'total-item-clickable': clickable }"
        @click="clickable && emit('click')"
    >
        <div class="total-label">{{ label }}</div>
        <div class="total-value">
            <p>
                {{ value }}<span v-if="suffix" class="fz-20">{{ suffix }}</span>
            </p>
            <slot name="icon" />
        </div>
    </div>
</template>
