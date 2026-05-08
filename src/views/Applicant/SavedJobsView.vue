<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import { useSettingStore, useFavoritesStore } from '@/stores'
import * as JobAPI from '@/api/home/job'
import type { Job } from '@/interface'
import { notify } from '@/libs'

const { t } = useI18n()
const router = useRouter()
const settingStore = useSettingStore()
const favoritesStore = useFavoritesStore()

const loading = ref(false)
const jobs = ref<Job[]>([])

const savedIds = computed(() => favoritesStore.state.savedJobIds)

const fetchSavedJobs = async () => {
    loading.value = true
    try {
        await favoritesStore.hydrate()
        const ids = savedIds.value
        if (!ids.length) {
            jobs.value = []
            return
        }
        const results = await Promise.allSettled(ids.map((id) => JobAPI.detail(id)))
        jobs.value = results
            .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
            .map((r) => r.value?.data as Job)
            .filter((j) => !!j && !!j.id)
    } catch (e: any) {
        notify(t('notify.error'), e?.message ?? '', 'error')
    } finally {
        loading.value = false
    }
}

const removeSaved = (jobId: number) => {
    favoritesStore.toggleJobSaved(jobId).finally(fetchSavedJobs)
}

const goDetail = (jobId: number) =>
    router.push({ name: 'job-home-detail', params: { id: jobId } })

onMounted(async () => {
    settingStore.setTitle(t('sidebar.saved_jobs'))
    await fetchSavedJobs()
})
</script>

<template>
    <a-spin :spinning="loading" class="spin-full">
        <div class="box">
            <h1 class="title-page">{{ t('sidebar.saved_jobs') }}</h1>

            <a-empty v-if="!jobs.length" />

            <div v-else class="saved-jobs">
                <a-list :data-source="jobs" item-layout="horizontal">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <template #actions>
                                <a-button danger @click="removeSaved(item.id)">
                                    {{ t('delete') }}
                                </a-button>
                            </template>
                            <a-list-item-meta
                                :title="item.title"
                                :description="item.company_name"
                            />
                            <a-button type="link" @click="goDetail(item.id)">
                                {{ t('detail') }}
                            </a-button>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </div>
    </a-spin>
</template>

<style scoped>
.saved-jobs :deep(.ant-list-item) {
    border: 1px solid var(--vt-c-border);
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 12px;
    background: var(--vt-c-white);
}
</style>

