<script lang="ts" setup>
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import {
    API_URL,
    formatBytes,
    getToken,
    IMAGE_EXTENSIONS,
    MAX_SIZE_IMAGE,
    notify,
} from '@/libs'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const props = defineProps({
    url: { type: String, default: '' },
    hasRadius: { type: Boolean, required: false, default: true },
})
const emit = defineEmits(['update:url'])

const handleChange = (info: Record<string, any>) => {
    const { status, response, error } = info.file
    if (status === 'done') {
        emit('update:url', response.data.url)
    } else if (status === 'error') {
        console.error('Upload failed:', error)
    }
}

const beforeUpload = (info: Record<string, any>) => {
    const isJpgOrPng = IMAGE_EXTENSIONS.includes(info.type)
    if (!isJpgOrPng) {
        notify(t('validation.image.type'), '', 'error')
    }
    const isLetterMaxSize = info.size < MAX_SIZE_IMAGE
    if (!isLetterMaxSize) {
        notify(
            t('validation.image.max', [formatBytes(MAX_SIZE_IMAGE)]),
            '',
            'error'
        )
    }
    return isJpgOrPng && isLetterMaxSize
}

const removeImage = () => emit('update:url', null)
</script>

<template>
    <a-upload
        name="file"
        :class="`upload-image ${hasRadius ? '' : 'no-radius'}`"
        list-type="picture-card"
        :action="API_URL + '/upload/image'"
        :headers="{
            Authorization: `Bearer ${getToken()}`,
            'X-Requested-With': null,
        }"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
    >
        <div v-if="props.url" class="flex-center">
            <img :src="props.url" alt="avatar" class="img-preview" />
            <DeleteOutlined @click.stop="removeImage" />
        </div>
        <div v-else>
            <PlusOutlined />
            <div style="margin-top: 8px">{{ t('upload.image') }}</div>
        </div>
    </a-upload>
</template>
