<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { RouterLink } from 'vue-router'
import { APP_HEADER } from '@/libs'

const { t } = useI18n()

const footerNav = Object.values(APP_HEADER).sort(
    (a: { order: number }, b: { order: number }) => a.order - b.order
) as { name: string; label: string }[]
</script>

<template>
    <footer class="footer">
        <div class="footer-inner">
            <div>
                <h2 class="footer-logo">{{ t('title') }}</h2>
                <p class="footer-tagline">
                    {{ t('home.sub_title') }}
                </p>
            </div>
            <div>
                <p class="footer-col-title">{{ t('header.home') }}</p>
                <ul class="footer-links">
                    <li v-for="item in footerNav" :key="item.name">
                        <RouterLink :to="{ name: item.name }">
                            {{ item.label }}
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div>
                <p class="footer-col-title">{{ t('header.contact') }}</p>
                <p class="detail">
                    <RouterLink :to="{ name: 'contact' }">
                        {{ t('contact.sender.contact_info') }}
                    </RouterLink>
                </p>
            </div>
        </div>
        <div class="footer-bottom">
            © {{ new Date().getFullYear() }} Viet Job
        </div>
    </footer>
</template>
