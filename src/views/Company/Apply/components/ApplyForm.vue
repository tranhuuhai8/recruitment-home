<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import {
    notifyStatus,
    STATUS_CODE_SUCCESS,
    STATUS_APPLY_FORM,
    STATUS_PENDING,
} from '@/libs'
import { useJobApplyStore } from '@/stores/company'

const { t } = useI18n()
const formRef = ref()
const loading = ref(false)
const formState = ref({ status: STATUS_PENDING })
const jobApplyStore = useJobApplyStore()
const props = defineProps(['id', 'query', 'open'])
const emit = defineEmits(['cancel', 'submit', 'resetData'])

const onSubmit = async () => {
    try {
        loading.value = true
        const { status_code, message } = await jobApplyStore.update(
            formState.value,
            +props.id
        )
        notifyStatus(status_code, message)
        if (status_code === STATUS_CODE_SUCCESS) {
            emit('submit')
            resetForm(true)
        }
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const getData = async (id: number) => {
    const data = jobApplyStore.getJobApplications.data?.find(
        (item: Record<string, any>) => item.id === id
    )
    if (!data) return resetForm(false)

    Object.assign(formState.value, data)
}

const resetForm = (isFetchData: boolean) => {
    formRef.value.resetFields()
    Object.assign(formState, { status: STATUS_PENDING })
    isFetchData && emit('resetData')
    emit('cancel')
}

watch(
    () => props.id,
    async (newId) => {
        loading.value = true
        newId && (await getData(newId))
        loading.value = false
    },
    { immediate: true }
)
</script>

<template>
    <a-form
        ref="formRef"
        class="form-apply"
        :model="formState"
        @finish="onSubmit"
    >
        <a-form-item name="status" :label="t('status.label')">
            <a-select
                ref="select"
                v-model:value="formState.status"
                :options="STATUS_APPLY_FORM"
            />
        </a-form-item>

        <a-space class="space-group-btn">
            <a-button type="primary" html-type="submit" :loading="loading">
                {{ t('update') }}
            </a-button>
            <a-button type="link" @click="resetForm(false)">
                {{ t('cancel') }}
            </a-button>
        </a-space>
    </a-form>
</template>
