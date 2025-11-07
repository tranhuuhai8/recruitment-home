<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue3-i18n'
import draggable from 'vuedraggable'
import { useFileUploadStore } from '@/stores/applicant'
import PdfIcon from '@/assets/imgs/pdf-icon.png'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue'
import UploadPdfButton from './components/UploadPdfButton.vue'
import { MAX_FILE_UPLOAD, notify, STATUS_CODE_SUCCESS } from '@/libs'
import { INITIAL_VALUE_FILE, mapDataUpsert } from './shared'

const { t } = useI18n()
const fileUploadStore = useFileUploadStore()
const loading = ref(false)
const loadingBtn = ref(false)
const fileList = ref<any[]>([])

const getData = async () => {
    loading.value = true
    await fileUploadStore.list()
    fileList.value = [...(fileUploadStore.getFiles || [])]
    loading.value = false
}

const handleDelete = (index: number) => fileList.value.splice(index, 1)

const handleAdd = (data: Record<string, any>) => {
    if (fileList.value.length === MAX_FILE_UPLOAD) {
        return notify(
            t('validation.max.total_file', { 0: MAX_FILE_UPLOAD }),
            '',
            'error'
        )
    }

    const { size, name, url } = data
    fileList.value = [
        ...fileList.value,
        {
            ...INITIAL_VALUE_FILE,
            file_path: url,
            file_name: name,
            file_size: size,
            order: fileList.value.length + 1,
        },
    ]
}

const onSubmit = async () => {
    try {
        loadingBtn.value = true
        const { status_code, message } = await fileUploadStore.upsert(
            mapDataUpsert(fileList.value)
        )
        if (status_code === STATUS_CODE_SUCCESS) {
            await getData()
            return notify(message, '', 'success')
        }
        notify(message, '', 'error')
    } catch (error) {
        console.error(error)
    } finally {
        loadingBtn.value = false
    }
}

onMounted(() => getData())
</script>

<template>
    <a-spin :spinning="loading">
        <a-card class="card-file-uploaded">
            <h1 class="title-page">{{ t('applicant.file.title_page') }}</h1>

            <draggable
                v-model="fileList"
                item-key="id"
                handle=".drag-handle"
                animation="200"
                ghost-class="drag-ghost"
                class="file-upload-list"
            >
                <template #item="{ element, index }">
                    <a-card class="file-upload-item">
                        <template #extra>
                            <span class="drag-handle">⠿</span>
                            <a :href="element?.file_path" target="_blank">
                                <EyeOutlined />
                            </a>
                            <a-button danger @click="handleDelete(index)">
                                <DeleteOutlined />
                            </a-button>
                            <img :src="PdfIcon" alt="" class="pdf-icon" />
                            <div class="file-name-box">
                                <template v-if="!element.editing">
                                    <span
                                        @click="element.editing = true"
                                        class="editable-text"
                                        title="Click để đổi tên"
                                    >
                                        {{
                                            element.file_name ||
                                            '(Click để đặt tên file)'
                                        }}
                                    </span>
                                </template>
                                <template v-else>
                                    <a-input
                                        v-model:value="element.file_name"
                                        size="small"
                                        class="file-name-input"
                                        @blur="element.editing = false"
                                        @pressEnter="element.editing = false"
                                    />
                                </template>
                            </div>
                        </template>
                    </a-card>
                </template>
            </draggable>

            <div class="mt-20">
                <div class="note mb-10">
                    Lưu ý:
                    {{ t('validation.max.total_file', { 0: MAX_FILE_UPLOAD }) }}
                </div>
                <UploadPdfButton
                    v-if="fileList.length < MAX_FILE_UPLOAD"
                    @submit="handleAdd"
                />
                <a-button
                    type="primary"
                    class="mr-10"
                    :loading="loadingBtn"
                    @click="onSubmit"
                >
                    {{ t('update') }}
                </a-button>
                <a-button type="default" :loading="loadingBtn" @click="getData">
                    {{ t('reset') }}
                </a-button>
            </div>
        </a-card>
    </a-spin>
</template>
