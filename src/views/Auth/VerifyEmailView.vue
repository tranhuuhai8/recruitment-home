<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/lang'

const { t } = i18n
const route = useRoute()
const router = useRouter()

const isSuccess = computed(() => route.query.status === 'success')

const countdown = ref(5)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
    if (!isSuccess.value) return

    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer!)
            router.push({ name: 'login' })
        }
    }, 1000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<template>
    <div class="box-auth verify-email">
        <a-result
            v-if="isSuccess"
            status="success"
            :title="t('auth.verify_email.success_title')"
            :sub-title="
                t('auth.verify_email.success_description', {
                    seconds: countdown,
                })
            "
        >
            <template #extra>
                <a-button
                    type="primary"
                    @click="router.push({ name: 'login' })"
                >
                    {{ t('auth.verify_email.btn_login') }}
                </a-button>
            </template>
        </a-result>

        <a-result
            v-else
            status="error"
            :title="t('auth.verify_email.error_title')"
            :sub-title="t('auth.verify_email.error_description')"
        >
            <template #extra>
                <a-button @click="router.push({ name: 'login' })">
                    {{ t('auth.verify_email.btn_login') }}
                </a-button>
                <a-button
                    type="primary"
                    @click="router.push({ name: 'register' })"
                >
                    {{ t('auth.verify_email.btn_register') }}
                </a-button>
            </template>
        </a-result>
    </div>
</template>

<style scoped>
.verify-email {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: none;
    margin-top: 120px;
    margin-bottom: 80px;
}
</style>
