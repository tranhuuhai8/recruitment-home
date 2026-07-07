<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string
        items: {
            key: string | number
            label: string
            meta: string
            clickable?: boolean
        }[]
        emptyText?: string
    }>(),
    {
        emptyText: '--',
    }
)

const emit = defineEmits<{ itemClick: [key: string | number] }>()
</script>

<template>
    <div class="box-widget">
        <div class="widget-header">
            <h3>{{ title }}</h3>
        </div>
        <ul class="widget-list">
            <li
                v-for="item in items"
                :key="item.key"
                :class="{ clickable: item.clickable }"
                @click="item.clickable && emit('itemClick', item.key)"
            >
                <span class="widget-list-label">{{ item.label }}</span>
                <span class="widget-list-meta">{{ item.meta }}</span>
            </li>
            <li v-if="!items.length" class="widget-empty">{{ emptyText }}</li>
        </ul>
    </div>
</template>
