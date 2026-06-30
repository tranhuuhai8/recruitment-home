<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
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
const removingIds = reactive(new Set<number>())
const jobs = ref<Job[]>([])

const savedSlugs = computed(() => favoritesStore.state.savedJobSlugs)

const fetchSavedJobs = async () => {
    loading.value = true
    try {
        await favoritesStore.hydrate()
        const slugs = savedSlugs.value
        if (!slugs.length) {
            jobs.value = []
            return
        }
        const results = await Promise.allSettled(
            slugs.map((slug: string) => JobAPI.detail(slug))
        )
        jobs.value = results
            .filter(
                (r): r is PromiseFulfilledResult<any> =>
                    r.status === 'fulfilled'
            )
            .map((r) => r.value?.data as Job)
            .filter((j) => !!j && !!j.id)
    } catch (e: any) {
        notify(t('notify.error'), e?.message ?? '', 'error')
    } finally {
        loading.value = false
    }
}

const removeSaved = async (jobId: number, jobSlug: string) => {
    if (removingIds.has(jobId)) return
    removingIds.add(jobId)
    try {
        await favoritesStore.toggleJobSaved(jobId, jobSlug)
        await fetchSavedJobs()
    } finally {
        removingIds.delete(jobId)
    }
}

const goDetail = (jobSlug: string) =>
    router.push({ name: 'job-home-detail', params: { slug: jobSlug } })

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
                                <a-button
                                    danger
                                    :loading="removingIds.has(item.id)"
                                    @click="removeSaved(item.id, item.slug)"
                                >
                                    {{ t('delete') }}
                                </a-button>
                            </template>
                            <a-list-item-meta
                                :title="item.title"
                                :description="item.company_name"
                            />
                            <a-button type="link" @click="goDetail(item.slug)">
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
