<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import { useFavoritesStore, useSettingStore } from '@/stores'
import { useFollowedCompaniesStore } from '@/stores/applicant'
import { INITIAL_QUERY, notify } from '@/libs'
import { IconJob, IconLocation } from '@/components/icons'
import ImgDefault from '@/assets/imgs/img-default.png'
import type { FollowedCompany } from '@/interface'

const { t } = useI18n()
const router = useRouter()
const settingStore = useSettingStore()
const favoritesStore = useFavoritesStore()
const companyStore = useFollowedCompaniesStore()

const loading = ref(false)
const search = ref('')
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })
const openDelete = ref(false)
const loadingDelete = ref(false)
const unfollowTarget = ref<FollowedCompany | null>(null)
const notifyLoadingIds = reactive(new Set<number>())

const companies = computed(() => companyStore.getCompanies)

const getData = async () => {
    loading.value = true
    await companyStore.list(query.value)
    loading.value = false
}

const onSearch = () => {
    query.value = { ...query.value, page: 1, search: search.value }
}

const onRefresh = () => {
    search.value = ''
    query.value = { ...INITIAL_QUERY }
}

const onChangePage = (page: number) => (query.value = { ...query.value, page })

const goDetail = (slug?: string) => {
    if (!slug) return
    const { href } = router.resolve({
        name: 'company-home-detail',
        params: { slug },
    })
    window.open(href, '_blank')
}

const onUnfollow = (company: FollowedCompany) => {
    unfollowTarget.value = company
    openDelete.value = true
}

const onToggleNotify = async (company: FollowedCompany) => {
    if (!company.id || notifyLoadingIds.has(company.id)) return
    notifyLoadingIds.add(company.id)
    try {
        company.notify_new_job = await companyStore.toggleNotify(
            company.slug as string
        )
    } catch (e: any) {
        notify(t('notify.error'), e?.message ?? '', 'error')
    } finally {
        notifyLoadingIds.delete(company.id)
    }
}

const handleUnfollow = async () => {
    if (!unfollowTarget.value) return
    loadingDelete.value = true
    try {
        await favoritesStore.toggleCompanyFollowed(
            unfollowTarget.value.id as number,
            unfollowTarget.value.slug as string
        )
        notify(
            t('applicant.followed_companies.notify.unfollowed'),
            '',
            'success'
        )
        await getData()
    } catch (e: any) {
        notify(t('notify.error'), e?.message ?? '', 'error')
    } finally {
        loadingDelete.value = false
        openDelete.value = false
        unfollowTarget.value = null
    }
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('sidebar.followed_companies'))
    await getData()
})

watch(
    () => query.value,
    () => getData(),
    { deep: true }
)
</script>

<template>
    <div class="box box-search">
        <h1 class="title-page">{{ t('sidebar.followed_companies') }}</h1>
        <a-space>
            <a-input
                allowClear
                style="width: 320px"
                v-model:value="search"
                :placeholder="
                    t('applicant.followed_companies.search_placeholder')
                "
                @press-enter="onSearch"
            />
            <a-button type="primary" @click="onSearch">
                {{ t('search') }}
            </a-button>
            <a-button @click="onRefresh">
                {{ t('reset') }}
            </a-button>
        </a-space>
    </div>

    <div class="box">
        <a-spin :spinning="loading">
            <a-empty v-if="!companies.data?.length" />

            <div v-else class="followed-companies">
                <div
                    v-for="company in companies.data"
                    :key="company.id"
                    class="followed-companies__card"
                >
                    <div
                        class="followed-companies__body"
                        @click="goDetail(company.slug)"
                    >
                        <img
                            alt=""
                            class="followed-companies__logo"
                            :src="company.logo ?? ImgDefault"
                        />
                        <a-tooltip>
                            <template #title>{{ company.name }}</template>
                            <p class="followed-companies__name">
                                {{ company.short_name || company.name }}
                            </p>
                        </a-tooltip>
                        <div
                            v-if="company.jobs_count"
                            class="followed-companies__meta"
                        >
                            <IconJob />
                            <span>
                                {{
                                    company.jobs_count +
                                    ' ' +
                                    t('home.company.job')
                                }}
                            </span>
                        </div>
                        <div
                            v-if="company.city_name"
                            class="followed-companies__meta"
                        >
                            <IconLocation />
                            <span>{{ company.city_name }}</span>
                        </div>
                    </div>

                    <div class="followed-companies__notify">
                        <span>
                            {{
                                t('applicant.followed_companies.notify_new_job')
                            }}
                        </span>
                        <a-switch
                            size="small"
                            :checked="!!company.notify_new_job"
                            :loading="
                                !!company.id && notifyLoadingIds.has(company.id)
                            "
                            @change="onToggleNotify(company)"
                        />
                    </div>

                    <a-button danger block @click="onUnfollow(company)">
                        {{ t('applicant.followed_companies.btn.unfollow') }}
                    </a-button>
                </div>
            </div>
        </a-spin>

        <div style="margin-top: 12px; text-align: right" v-if="companies.total">
            <a-pagination
                :current="companies.current_page"
                :pageSize="companies.per_page"
                :total="companies.total"
                @change="onChangePage"
                showLessItems
            />
        </div>
    </div>

    <modal-delete
        :open="openDelete"
        :loading="loadingDelete"
        :title="
            t('applicant.followed_companies.confirm_unfollow', [
                unfollowTarget?.name,
            ])
        "
        @close="
            () => {
                openDelete = false
                unfollowTarget = null
            }
        "
        @on-delete="handleUnfollow"
    />
</template>

<style scoped lang="scss">
.followed-companies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;

    &__card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid var(--vt-c-border);
        border-radius: 12px;
        padding: 16px;
        background: var(--vt-c-white);
    }

    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        text-align: center;
    }

    &__logo {
        width: 72px;
        height: 72px;
        object-fit: contain;
        border: 1px solid var(--vt-c-border);
        border-radius: 8px;
        padding: 4px;
    }

    &__name {
        font-weight: 600;
        margin: 0;
    }

    &__meta {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--vt-c-text-muted);
        font-size: 13px;
    }

    &__notify {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 13px;
        color: var(--vt-c-text-muted);
        border-top: 1px solid var(--vt-c-border);
        padding-top: 10px;
    }
}
</style>
