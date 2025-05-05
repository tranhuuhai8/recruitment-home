<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { PROPS_MODAL } from './constants'

const { t } = useI18n()
const loading = ref<boolean>(false)
const {
    title,
    open,
    width,
    buttonDirection,
    hasFooter,
    centered,
    closable,
    wrapClassName,
    maskClosable,
} = defineProps(PROPS_MODAL)
</script>

<template>
    <div>
        <a-modal
            :wrapClassName="wrapClassName"
            :open="open"
            :title="title"
            :width="width"
            :centered="centered"
            :closable="closable"
            :maskClosable="maskClosable"
            @cancel="$emit('cancel')"
            @ok="$emit('submit')"
        >
            <template #footer>
                <div :class="buttonDirection" v-if="hasFooter">
                    <a-button
                        html-type="submit"
                        key="submit"
                        type="primary"
                        :form="formId"
                        :loading="loading"
                        @click="$emit('submit')"
                    >
                        {{ okText || t('submit') }}
                    </a-button>
                    <a-button key="back" @click="$emit('cancel')">
                        {{ t('cancel') }}
                    </a-button>
                </div>
            </template>
            <slot name="body" />
            <slot name="footer" />
        </a-modal>
    </div>
</template>

<style lang="scss" scoped>
.ant-btn {
    &:nth-child(2) {
        &:hover {
            border-color: var(--vt-c-white-v2);
            color: var(--vt-c-black-bold);
        }
    }
}
</style>
