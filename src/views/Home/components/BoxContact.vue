<script lang="ts" setup>
import { useI18n } from 'vue3-i18n'
import { IconLocation } from '@/components/icons'
import {
    LinkOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons-vue'
const { t } = useI18n()
const props = defineProps(['company'])
</script>

<template>
    <div class="contact-item" v-if="props.company.address">
        <p class="label">
            {{ t('home.company.detail.contact.address') }}
        </p>
        <p class="value"><IconLocation />{{ props.company.address }}</p>
    </div>
    <div class="contact-item" v-if="props.company.user?.mail_address">
        <p class="label">
            {{ t('home.company.detail.contact.email') }}
        </p>
        <p class="value">
            <MailOutlined />
            {{ props.company.user?.mail_address }}
        </p>
    </div>
    <div class="contact-item" v-if="props.company.telephone">
        <p class="label">
            {{ t('home.company.detail.contact.phone') }}
        </p>
        <p class="value"><PhoneOutlined />{{ props.company.telephone }}</p>
    </div>
    <div class="contact-item" v-if="props.company.website">
        <p class="label">
            {{ t('home.company.detail.contact.website') }}
        </p>
        <p class="value"><LinkOutlined />{{ props.company.website }}</p>
    </div>
</template>
