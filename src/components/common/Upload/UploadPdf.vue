<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { Upload } from 'ant-design-vue'
import {
    UploadOutlined,
    DeleteOutlined,
    FilePdfOutlined,
    EyeOutlined,
} from '@ant-design/icons-vue'
import {
    ALLOWED_TYPE_PDF,
    API_URL,
    FALSE_VALUE,
    formatBytes,
    getToken,
    MAX_SIZE_PDF,
    notify,
} from '@/libs'

const { t } = useI18n()
const props = defineProps(['url', 'name'])
const emit = defineEmits(['update:url', 'update:name', 'update:size'])
const uploading = ref(false)
const progress = ref(FALSE_VALUE)

const beforeUpload = (file: File) => {
    if (file.type !== ALLOWED_TYPE_PDF) {
        notify(t('validation.pdf.type'), '', 'error')
        return Upload.LIST_IGNORE
    }
    if (file.size > MAX_SIZE_PDF) {
        notify(
            t('validation.pdf.max', [formatBytes(MAX_SIZE_PDF)]),
            '',
            'error'
        )
        return Upload.LIST_IGNORE
    }
    uploading.value = true
    emit('update:size', file.size)
    progress.value = FALSE_VALUE
    return true
}

const handleChange = (info: Record<string, any>) => {
    const { status, response, percent, error } = info.file
    if (status === 'uploading') {
        progress.value = Math.round(percent)
    } else if (status === 'done') {
        uploading.value = false
        emit('update:url', response.data.url)
        emit('update:name', response.data.name)
    } else if (status === 'error') {
        uploading.value = false
        console.error('Upload failed:', error)
        notify(t('upload.failed'), '', 'error')
    }
}

const removeFile = () => {
    emit('update:url', '')
    emit('update:name', '')
    emit('update:size', FALSE_VALUE)
    uploading.value = false
    progress.value = FALSE_VALUE
}

const previewFile = () => {
    if (props.url) window.open(props.url, '_blank')
}
</script>

<template>
    <a-upload
        class="upload-pdf"
        :action="API_URL + '/upload/pdf'"
        :headers="{
            Authorization: `Bearer ${getToken()}`,
            'X-Requested-With': null,
        }"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
    >
        <div v-if="props.url && !uploading" class="uploaded-box">
            <div class="uploaded-info">
                <FilePdfOutlined class="pdf-icon" />
                <span class="file-name">{{ props.name }}</span>
            </div>
            <div class="uploaded-actions">
                <EyeOutlined class="preview-icon" @click.stop="previewFile" />
                <DeleteOutlined class="delete-icon" @click.stop="removeFile" />
            </div>
        </div>

        <div v-else-if="uploading" class="upload-progress-box">
            <p class="progress-text">
                {{ t('home.job.modal.upload.uploading') }}
            </p>
            <div class="progress-bar">
                <div
                    class="progress-inner"
                    :style="{ width: progress + '%' }"
                ></div>
            </div>
            <p class="progress-percent">{{ progress }}%</p>
        </div>

        <div v-else class="upload-box">
            <div class="upload-cloud">
                <UploadOutlined />
            </div>
            <p class="upload-title">
                {{ t('home.job.modal.upload.title') }}
            </p>
            <p class="upload-sub">
                {{
                    t(
                        'home.job.modal.upload.subtitle',
                        formatBytes(MAX_SIZE_PDF)
                    )
                }}
            </p>
            <a-button type="primary" class="btn-upload">
                {{ t('upload.btn') }}
            </a-button>
        </div>
    </a-upload>
</template>
