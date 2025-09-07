<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { reactive, ref, watch, type UnwrapRef } from 'vue'
import { useCityStore } from '@/stores/admin'
import { useCityStore as useCityStoreHome } from '@/stores/home/city'
import { FORM_CITY, cityRules, INITIAL_QUERY_MST } from '../shared'
import {
    trim,
    notifyStatus,
    notifyDelete,
    STATUS_DISPLAY_OPTIONS_FORM,
    getOptions,
    filterOption,
    QUERY_MST_PARENT,
} from '@/libs'
import { DeleteOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const formRef = ref()
const loading = ref(false)
const openDelete = ref(false)
const cityStore = useCityStore()
const cityStoreHome = useCityStoreHome()

const props = defineProps(['id', 'query'])
const emit = defineEmits(['cancel', 'submit'])

const formState: UnwrapRef<any> = reactive({
    ...FORM_CITY,
})

const onSubmit = async () => {
    try {
        loading.value = true
        const { status_code, message } = props.id
            ? await cityStore.update(formState, +props.id)
            : await cityStore.create(formState)
        notifyStatus(status_code, message)
        emit('submit')
        resetForm(true)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const onDelete = async () => {
    try {
        loading.value = true
        const { message, status_code } = await cityStore.remove(+props.id)

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
    const data = cityStore.getCities.data?.find(
        (item: Record<string, any>) => item.id === id
    )
    if (!data) return resetForm(false)

    Object.assign(formState, data)
}

const resetForm = async (isFetchData: boolean) => {
    formRef.value.resetFields()
    Object.assign(formState, FORM_CITY)
    emit('cancel')
    isFetchData && (await cityStore.list(props.query ?? INITIAL_QUERY_MST))
}

watch(
    () => props.id,
    async (newId) => {
        if (newId) {
            loading.value = true
            await cityStoreHome.listParent(QUERY_MST_PARENT)
            await getData(newId)
            loading.value = false
        }
    },
    { immediate: true }
)
</script>

<template>
    <a-form
        ref="formRef"
        class="form-city"
        :model="formState"
        :rules="cityRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="onSubmit"
    >
        <a-form-item name="name" :label="t('masterData.labels.city_name')">
            <a-input
                v-model:value="formState.name"
                :placeholder="t('masterData.labels.city_name')"
                @blur="trim('name', formState)"
            />
        </a-form-item>

        <a-form-item
            name="parent_id"
            :label="t('masterData.labels.parent_city_name')"
        >
            <a-select
                allow-search
                show-search
                ref="select"
                style="width: 150px"
                :placeholder="t('select.placeholder')"
                v-model:value="formState.parent_id"
                :options="getOptions(cityStoreHome.getCitiesParent?.data ?? [])"
                :filter-option="filterOption"
            />
        </a-form-item>

        <a-form-item
            name="description"
            :label="t('masterData.labels.description')"
        >
            <a-textarea
                v-model:value="formState.description"
                :placeholder="t('masterData.labels.description')"
                :autoSize="{ minRows: 4, maxRows: 10 }"
                @blur="trim('description', formState)"
            />
        </a-form-item>
        <a-form-item name="status" :label="t('status.label')">
            <a-select
                ref="select"
                style="width: 120px"
                v-model:value="formState.status"
                :options="STATUS_DISPLAY_OPTIONS_FORM"
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
                <a-button
                    type="primary"
                    html-type="submit"
                    class="mr-10"
                    :loading="loading"
                >
                    {{ t(`${props.id ? 'update' : 'create'}`) }}
                </a-button>
                <a-button type="link" @click="resetForm(false)">
                    {{ t('cancel') }}
                </a-button>
            </a-col>
        </a-space>
    </a-form>
    <modal-delete
        :open="openDelete"
        :loading="loading"
        @close="openDelete = false"
        @on-delete="onDelete"
    />
</template>

<style scoped lang="scss"></style>
