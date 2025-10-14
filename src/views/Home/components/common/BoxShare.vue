<script lang="ts" setup>
import { useI18n } from 'vue3-i18n'
import { IconCopy } from '@/components/icons'
import { notify } from '@/libs'
const { t } = useI18n()
const currentUrl = window.location.href

const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl)
    notify('Đã sao chép vào bảng nhớ tạm', '', 'success')
}

const shareTo = (platform: 'facebook' | 'linkedin' | 'twitter') => {
    let shareUrl = ''

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
            break
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
            break
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`
            break
    }

    window.open(shareUrl, '_blank')
}
</script>

<template>
    <div class="copy-link">
        <p>
            {{ t('home.company.detail.text_box.copy_link') }}
        </p>
        <div class="path">
            <a-input name="input-copy" :value="currentUrl" readonly />
            <a-button class="btn-copy" @click="handleCopy">
                <IconCopy />
            </a-button>
        </div>
    </div>
    <div class="contact-list">
        <p>{{ t('home.company.detail.text_box.share_sns') }}</p>
        <p class="sns-item facebook" @click="shareTo('facebook')">
            {{ t('home.company.detail.sns.facebook') }}
        </p>
        <p class="sns-item linkedin" @click="shareTo('linkedin')">
            {{ t('home.company.detail.sns.linkedin') }}
        </p>
        <p class="sns-item twitter" @click="shareTo('twitter')">
            {{ t('home.company.detail.sns.twitter') }}
        </p>
    </div>
</template>
