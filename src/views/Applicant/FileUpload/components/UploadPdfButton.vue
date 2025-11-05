<script lang="ts" setup>
import { useI18n } from 'vue3-i18n'
import { Upload } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import {
    ALLOWED_TYPE_PDF,
    API_URL,
    formatBytes,
    getToken,
    MAX_SIZE_PDF,
    notify,
} from '@/libs'

const { t } = useI18n()
const emit = defineEmits(['submit'])

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
    return true
}

const handleChange = (info: Record<string, any>) => {
    const { status, response } = info.file
    if (status === 'done') {
        emit('submit', response.data)
    } else if (status === 'error') {
        notify(t('upload.failed'), '', 'error')
    }
}
</script>

<template>
    <a-upload
        class="upload-pdf-btn"
        :action="API_URL + '/upload/pdf'"
        :headers="{
            Authorization: `Bearer ${getToken()}`,
            'X-Requested-With': null,
        }"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
    >
        <a-button type="default" class="btn-upload">
            <UploadOutlined />{{ t('upload.btn') }}
        </a-button>
    </a-upload>
</template>

<style scoped lang="scss">
.upload-pdf-btn {
    margin-right: 10px;

    .btn-upload {
        color: var(--vt-c-white);
        border-color: var(--vt-c-blue);
        background-color: var(--vt-c-blue);
    }
}
</style>
