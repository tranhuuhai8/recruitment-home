<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import { TYPE_JOB_MAP } from '@/libs'
import { getSalaryText } from '../shared'
import { useJobStore } from '@/stores/home'
import {
    HeartFilled,
    HeartOutlined,
    LoadingOutlined,
} from '@ant-design/icons-vue'
import { useFavoritesStore } from '@/stores'
import ImgDefault from '@/assets/imgs/img-default.png'
import { IconLocation, IconMoney } from '@/components/icons'

const { t } = useI18n()
const jobStore = useJobStore()
const favoritesStore = useFavoritesStore()
const router = useRouter()
const savingIds = reactive(new Set<number>())

const redirectToDetail = (slug: string) =>
    router.push({ name: 'job-home-detail', params: { slug } })

const toggleSaved = async (e: MouseEvent, id: number, slug: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (savingIds.has(id)) return
    savingIds.add(id)
    try {
        await favoritesStore.toggleJobSaved(id, slug)
    } finally {
        savingIds.delete(id)
    }
}
</script>

<template>
    <a-list
        :grid="{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 3,
        }"
        :data-source="jobStore.getJobs.data"
    >
        <template #renderItem="{ item }">
            <a-list-item @click="redirectToDetail(item.slug)">
                <div class="job-item-header">
                    <div class="company-logo" :title="item.company_name">
                        <img
                            class="avatar"
                            :src="item?.company_logo ?? ImgDefault"
                        />
                    </div>
                    <p class="job-title">{{ item?.title }}</p>
                </div>

                <div class="job-item-body">
                    <span class="meta-item">
                        <IconLocation />
                        {{ item?.city_name }}
                    </span>
                    <span class="meta-item">
                        <IconMoney />
                        {{ getSalaryText(item) }}
                    </span>
                </div>
                <button
                    class="bookmark-btn"
                    :class="{
                        active: favoritesStore.isJobSaved(item.id),
                        saving: savingIds.has(item.id),
                    }"
                    :disabled="savingIds.has(item.id)"
                    @click="(e) => toggleSaved(e, item.id, item.slug)"
                    :title="
                        favoritesStore.isJobSaved(item.id)
                            ? t('saved')
                            : t('save')
                    "
                >
                    <LoadingOutlined v-if="savingIds.has(item.id)" />
                    <HeartFilled
                        v-else-if="favoritesStore.isJobSaved(item.id)"
                    />
                    <HeartOutlined v-else />
                </button>

                <div class="job-item-footer">
                    <a-tag class="job-tag category">
                        {{ item?.category_name }}
                    </a-tag>
                    <a-tag class="job-tag">
                        {{ t(`type.${TYPE_JOB_MAP[item?.type]}`) }}
                    </a-tag>
                </div>
            </a-list-item>
        </template>
    </a-list>
</template>
