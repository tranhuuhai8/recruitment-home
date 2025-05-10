<script setup lang="ts">
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const props = defineProps(['open', 'loading'])
</script>

<template>
    <modal-vue
        :open="props.open"
        wrapClassName="modal-delete"
        :centered="true"
        :width="400"
        :hasFooter="false"
        :closable="false"
        @cancel="$emit('close')"
    >
        <template #body>
            <div class="content mb-20">
                {{ t('modal.delete.confirm') }}
            </div>
            <a-space>
                <a-button type="link" @click="$emit('close')">
                    {{ t('cancel') }}
                </a-button>
                <a-button
                    class="btn-delete"
                    :loading="props.loading"
                    @click="$emit('onDelete')"
                >
                    {{ t('delete') }}
                </a-button>
            </a-space>
        </template>
    </modal-vue>
</template>

<style scoped lang="scss"></style>
