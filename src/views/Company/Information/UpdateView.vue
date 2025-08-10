<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores'
import { useInfoStore } from '@/stores/company'
import { useCityStore } from '@/stores/home'
import type { FormDataCompany } from '@/interface'
import {
    filterTreeSelect,
    getTreeData,
    GUARD_COMPANY,
    INITIAL_QUERY,
    notify,
    PAYLOAD_ALL,
    STATUS_CODE_SUCCESS,
    trim,
} from '@/libs'
import { INITIAL_FORM_COMPANY, mapDataForm, rules } from './shared'

const { t } = useI18n()
const authStore = useAuthStore()
const cityStore = useCityStore()
const infoStore = useInfoStore()
const formState = reactive<FormDataCompany>({ ...INITIAL_FORM_COMPANY })
const loading = ref(false)
const formRef = ref()

const onUpdate = async (values: Record<string, any>) => {
    loading.value = true
    try {
        const { status_code, message } = await infoStore.update(values)

        if (status_code === STATUS_CODE_SUCCESS) {
            return notify(message, '', 'success')
        }
        notify(message, '', 'error')
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const getData = async () => {
    try {
        const data = await authStore.getMe(GUARD_COMPANY)
        Object.assign(formState, mapDataForm(data, data.company))
    } catch (error) {
        console.error(error)
    }
}

onMounted(async () => {
    loading.value = true
    await getData()
    await cityStore.list({ ...INITIAL_QUERY, ...PAYLOAD_ALL })
    loading.value = false
})
</script>

<template>
    <a-spin :spinning="loading">
        <div class="box">
            <h1 class="title-page">{{ t('company.title_page.detail') }}</h1>
            <a-form
                class="form-edit form-company"
                ref="formRef"
                layout="vertical"
                :model="formState"
                :rules="rules"
                @finish="onUpdate"
            >
                <a-form-item name="name" :label="t('company.labels.name')">
                    <a-input
                        v-model:value="formState.name"
                        :placeholder="t('company.labels.name')"
                        @blur="trim('name', formState)"
                    />
                </a-form-item>
                <a-row justify="space-between">
                    <a-col>
                        <a-form-item
                            name="short_name"
                            :label="t('company.labels.short_name')"
                        >
                            <a-input
                                v-model:value="formState.short_name"
                                :placeholder="t('company.labels.short_name')"
                                @blur="trim('short_name', formState)"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col>
                        <a-form-item
                            name="telephone"
                            :label="t('company.labels.telephone')"
                        >
                            <a-input
                                v-model:value="formState.telephone"
                                :placeholder="t('company.labels.telephone')"
                                @blur="trim('telephone', formState)"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-form-item
                    name="mail_address"
                    :label="t('auth.labels.mail_address')"
                >
                    <a-input
                        v-model:value="formState.mail_address"
                        :placeholder="t('auth.labels.mail_address')"
                        @blur="trim('mail_address', formState)"
                    />
                </a-form-item>

                <a-form-item name="city_id" :label="t('company.labels.city')">
                    <a-tree-select
                        allow-clear
                        show-search
                        tree-default-expand-all
                        v-model:value="formState.city_id"
                        :tree-data="getTreeData(cityStore.getCities.data)"
                        :placeholder="t('company.labels.city')"
                        :filterTreeNode="filterTreeSelect"
                    />
                </a-form-item>
                <a-form-item
                    name="address"
                    :label="t('company.labels.address')"
                >
                    <a-input
                        v-model:value="formState.address"
                        :placeholder="t('company.labels.address')"
                        @blur="trim('address', formState)"
                    />
                </a-form-item>
                <a-form-item
                    name="website"
                    :label="t('company.labels.website')"
                >
                    <a-input
                        v-model:value="formState.website"
                        :placeholder="t('company.labels.website')"
                        @blur="trim('website', formState)"
                    />
                </a-form-item>
                <a-form-item
                    name="description"
                    :label="t('company.labels.description')"
                >
                    <a-textarea
                        v-model:value="formState.description"
                        :placeholder="t('company.labels.description')"
                        :autoSize="{ minRows: 4, maxRows: 10 }"
                        @blur="trim('description', formState)"
                    />
                </a-form-item>

                <a-space class="space-group-btn">
                    <a-button type="primary" html-type="submit">
                        {{ t('update') }}
                    </a-button>
                </a-space>
            </a-form>
        </div>
    </a-spin>
</template>
