<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useI18n } from 'vue3-i18n'
import { getRuleJob } from '../shared'
import {
    FORMAT_DATE_DASH,
    formatter,
    getObjOptions,
    parser,
    STATUS_JOB_OPTIONS_SEARCH,
    trim,
    TYPE_JOB_OPTIONS_SEARCH,
} from '@/libs'
import { useCityStore, useJobCategoryStore } from '@/stores/home'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const props = defineProps({
    data: { type: Object, required: true },
    id: { type: Number, required: false },
})
const emits = defineEmits(['submit', 'delete'])
const { data, id } = toRefs(props)

const formRef = ref()
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()

const backToList = () => router.push({ name: 'company-jobs' })
</script>

<template>
    <a-form
        class="form-edit form-job"
        ref="formRef"
        layout="vertical"
        :model="data"
        :rules="getRuleJob(data)"
        @finish="emits('submit', data)"
    >
        <a-form-item name="banner" :label="t('job.labels.banner')" class="mb-5">
            <UploadImg v-model:url="data.banner" />
        </a-form-item>

        <a-form-item name="title" :label="t('job.labels.title')">
            <a-input
                v-model:value="data.title"
                :placeholder="t('job.labels.title')"
                @blur="trim('title', data)"
            />
        </a-form-item>

        <a-row justify="space-between">
            <a-col>
                <a-form-item
                    name="number_of_recruitment"
                    :label="t('job.labels.number_of_recruitment')"
                >
                    <a-input-number
                        :min="1"
                        v-model:value="data.number_of_recruitment"
                        :placeholder="t('placeholder.number')"
                    />
                </a-form-item>
            </a-col>
        </a-row>

        <a-row justify="space-between">
            <a-col>
                <a-form-item
                    name="start_date"
                    :label="t('job.labels.start_date')"
                >
                    <a-date-picker
                        v-model:value="data.start_date"
                        :format="FORMAT_DATE_DASH"
                        :placeholder="t('placeholder.date')"
                    />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item name="end_date" :label="t('job.labels.end_date')">
                    <a-date-picker
                        v-model:value="data.end_date"
                        :format="FORMAT_DATE_DASH"
                        :placeholder="t('placeholder.date')"
                    />
                </a-form-item>
            </a-col>
        </a-row>

        <a-row justify="space-between">
            <a-col>
                <a-form-item
                    name="salary_min"
                    :label="t('job.labels.salary_min')"
                >
                    <a-input-number
                        v-model:value="data.salary_min"
                        :formatter="formatter"
                        :parser="parser"
                        :placeholder="t('placeholder.salary')"
                    />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item
                    name="salary_max"
                    :label="t('job.labels.salary_max')"
                >
                    <a-input-number
                        v-model:value="data.salary_max"
                        :formatter="formatter"
                        :parser="parser"
                        :placeholder="t('placeholder.salary')"
                    />
                </a-form-item>
            </a-col>
        </a-row>

        <a-row justify="space-between">
            <a-col>
                <a-form-item name="city_id" :label="t('job.labels.city')">
                    <TreeSelect
                        v-model="data.city_id"
                        :is-multiple="false"
                        :data="cityStore.getCities?.data"
                    />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item
                    name="job_category_id"
                    :label="t('job.labels.category')"
                >
                    <TreeSelect
                        v-model="data.job_category_id"
                        :is-multiple="false"
                        :data="jobCategoryStore.getJobCategories?.data"
                    />
                </a-form-item>
            </a-col>
        </a-row>

        <a-form-item name="description" :label="t('job.labels.description')">
            <QuillEditor
                v-model:content="data.description"
                contentType="html"
                theme="snow"
            />
        </a-form-item>

        <a-row justify="space-between">
            <a-col>
                <a-form-item name="type" :label="t('job.labels.type')">
                    <a-select
                        :options="getObjOptions(TYPE_JOB_OPTIONS_SEARCH, false)"
                        v-model:value="data.type"
                    />
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item name="status" :label="t('status.label')">
                    <a-select
                        :options="
                            getObjOptions(STATUS_JOB_OPTIONS_SEARCH, false)
                        "
                        v-model:value="data.status"
                    />
                </a-form-item>
            </a-col>
        </a-row>

        <a-space class="space-group-btn">
            <a-button type="primary" html-type="submit">
                {{ t(`${id ? 'update' : 'create'}`) }}
            </a-button>
            <a-button v-if="id" class="btn-delete" @click="emits('delete')">
                {{ t('delete') }}
            </a-button>
            <a-button type="link" @click="backToList">
                {{ t('back') }}
            </a-button>
        </a-space>
    </a-form>
</template>
