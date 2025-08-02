<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { onMounted, reactive, ref } from 'vue'
import { useApplicantStore } from '@/stores'
import type { FormDataApplicant } from '@/interface'
import { useRoute, useRouter } from 'vue-router'
import {
    disabledDateFuture,
    FORMAT_DATE_DASH,
    GENDER_OPTIONS_FORM,
    notify,
    STATUS_CODE_SUCCESS,
    STATUS_OPTIONS_FORM,
    trim,
} from '@/libs'
import {
    INITIAL_FORM_APPLICANT,
    mapDataForm,
    mapDataUpdate,
    rules,
} from './shared'

const { t } = useI18n()
const router = useRouter()
const applicantStore = useApplicantStore()
const formState = reactive<FormDataApplicant>({ ...INITIAL_FORM_APPLICANT })
const loading = ref(false)
const formRef = ref()
const {
    params: { id },
} = useRoute()

const onUpdate = async (values: Record<string, any>) => {
    loading.value = true
    try {
        const { status_code, message } = await applicantStore.update(
            mapDataUpdate(values),
            +id
        )

        if (status_code === STATUS_CODE_SUCCESS) {
            notify(message, '', 'success')
            return backToList()
        }
        notify(message, '', 'error')
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const getData = async () => {
    loading.value = true
    try {
        const data = await applicantStore.detail(+id)
        Object.assign(formState, mapDataForm(data))
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const backToList = () => router.push({ name: 'admin-applicants' })

onMounted(() => getData())
</script>

<template>
    <a-spin :spinning="loading">
        <div class="box">
            <h1 class="title-page">{{ t('applicant.title_page.detail') }}</h1>
            <a-form
                class="form-edit form-applicant"
                ref="formRef"
                layout="vertical"
                :model="formState"
                :rules="rules"
                @finish="onUpdate"
            >
                <a-form-item name="name" :label="t('applicant.labels.name')">
                    <a-input
                        v-model:value="formState.name"
                        :placeholder="t('applicant.labels.name')"
                        @blur="trim('name', formState)"
                    />
                </a-form-item>
                <a-row>
                    <a-col class="mr-20">
                        <a-form-item
                            name="gender"
                            :label="t('applicant.labels.gender')"
                        >
                            <a-select
                                v-model:value="formState.gender"
                                ref="select"
                                :options="GENDER_OPTIONS_FORM"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col>
                        <a-form-item
                            name="birthday"
                            :label="t('applicant.labels.birthday')"
                        >
                            <a-date-picker
                                :format="FORMAT_DATE_DASH"
                                v-model:value="formState.birthday"
                                :disabled-date="disabledDateFuture"
                                :placeholder="t('applicant.labels.birthday')"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-form-item
                    name="telephone"
                    :label="t('applicant.labels.telephone')"
                >
                    <a-input
                        v-model:value="formState.telephone"
                        :placeholder="t('applicant.labels.telephone')"
                        @blur="trim('telephone', formState)"
                    />
                </a-form-item>
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
                <a-form-item
                    name="address"
                    :label="t('applicant.labels.address')"
                >
                    <a-input
                        v-model:value="formState.address"
                        :placeholder="t('applicant.labels.address')"
                        @blur="trim('address', formState)"
                    />
                </a-form-item>
                <a-form-item
                    name="description"
                    :label="t('applicant.labels.description')"
                >
                    <a-textarea
                        v-model:value="formState.description"
                        :placeholder="t('applicant.labels.description')"
                        :autoSize="{ minRows: 4, maxRows: 10 }"
                        @blur="trim('description', formState)"
                    />
                </a-form-item>
                <a-form-item
                    name="status"
                    class="status"
                    :label="t('status.label')"
                >
                    <a-select
                        v-model:value="formState.status"
                        ref="select"
                        style="width: 200px"
                        :options="STATUS_OPTIONS_FORM"
                    />
                </a-form-item>

                <a-space class="space-group-btn">
                    <a-button type="primary" html-type="submit">
                        {{ t('update') }}
                    </a-button>
                    <a-button type="link" @click="backToList">
                        {{ t('back') }}
                    </a-button>
                </a-space>
            </a-form>
        </div>
    </a-spin>
</template>

<style lang="scss" scoped></style>
