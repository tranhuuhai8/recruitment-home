<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { reactive, ref, watch, type UnwrapRef } from 'vue'
import { useJobCategoryStore } from '@/stores'
import {
    FORM_JOB_CATEGORY,
    notifyDelete,
    categoryRules,
    INITIAL_QUERY_MST,
} from '../shared'
import {
    notifyStatus,
    STATUS_DISPLAY_OPTIONS,
    trim,
    TYPE_OPTIONS,
} from '@/libs'
import { DeleteOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const formRef = ref()
const loading = ref(false)
const openDelete = ref(false)
const jobCategoryStore = useJobCategoryStore()

const props = defineProps(['id'])
const emit = defineEmits(['cancel', 'submit'])

const formState: UnwrapRef<any> = reactive({
    ...FORM_JOB_CATEGORY,
})

const onSubmit = async () => {
    try {
        loading.value = true
        const data = props.id
            ? await jobCategoryStore.update(formState, +props.id)
            : await jobCategoryStore.create(formState)
        notifyStatus(data.status_code, data.message)
        emit('submit')
        resetForm(true)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const resetForm = async (isFetchData: boolean) => {
    formRef.value.resetFields()
    emit('cancel')
    isFetchData && (await jobCategoryStore.list(INITIAL_QUERY_MST))
}

const onSubmitDelete = async () => {
    try {
        loading.value = true
        const { message, status_code } = await jobCategoryStore.remove(
            +props.id
        )

        notifyDelete(status_code, message, t('notify.error'))
        openDelete.value = false
        resetForm(true)
    } catch (error: any) {
        console.log('error :>> ', error)
    } finally {
        loading.value = false
    }
}

const getData = async (id: number) => {
    const data = jobCategoryStore.getJobCategories.data?.find(
        (item: Record<string, any>) => item.id === id
    )
    if (!data) return resetForm(false)

    formState.name = data.name
    formState.description = data.description
    formState.status = data.status
    formState.type = data.type
    formState.parent_id = data.parent_id
}

watch(
    () => props.id,
    async () => await getData(props.id)
)
</script>

<template>
    <a-form
        ref="formRef"
        class="form-city"
        :model="formState"
        :rules="categoryRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
        <a-form-item name="name" :label="t('masterData.labels.name')">
            <a-input
                @blur="trim('name', formState)"
                v-model:value="formState.name"
            />
        </a-form-item>
        <a-form-item
            name="description"
            :label="t('masterData.labels.description')"
        >
            <a-input
                @blur="trim('description', formState)"
                v-model:value="formState.description"
            />
        </a-form-item>
        <a-form-item name="status" :label="t('status.label')">
            <a-select
                ref="select"
                v-model:value="formState.status"
                style="width: 120px"
                :options="STATUS_DISPLAY_OPTIONS"
            />
        </a-form-item>
        <a-form-item name="type" :label="t('type.label')">
            <a-select
                ref="select"
                v-model:value="formState.type"
                style="width: 120px"
                :options="TYPE_OPTIONS"
            />
        </a-form-item>

        <a-space class="space-group-btn">
            <a-button
                v-if="props.id"
                class="btn-delete"
                @click="openDelete = true"
            >
                <DeleteOutlined />
            </a-button>
            <a-col>
                <a-button type="link" class="mr-10" @click="resetForm(false)">
                    {{ t('cancel') }}
                </a-button>
                <a-button type="primary" :loading="loading" @click="onSubmit">
                    {{ t(`${props.id ? 'update' : 'create'}`) }}
                </a-button>
            </a-col>
        </a-space>
    </a-form>
    <modal-delete
        :open="openDelete"
        :loading="loading"
        @close="openDelete = false"
        @on-delete="onSubmitDelete"
    />
</template>

<style scoped lang="scss"></style>
