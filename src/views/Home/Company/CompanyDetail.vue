<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { computed, onMounted, reactive, ref } from 'vue'
import type { Company } from '@/interface'
import { STATUS_CODE_SUCCESS } from '@/libs'
import { useCompanyStore } from '@/stores/home'
import { IconUser, IconJob } from '@/components/icons'
import ImgDefault from '@/assets/imgs/img-default.png'
import { getCompanyName, INITIAL_COMPANY_INFO_NULL } from '../shared'
import { BoxContactCompany, BoxShare, CompanyListJob } from '../components'
import { useFavoritesStore } from '@/stores'

const { t } = useI18n()
const {
    params: { slug },
} = useRoute()
const router = useRouter()
const currentUrl = window.location.href
const companyStore = useCompanyStore()
const favoritesStore = useFavoritesStore()
const loading = ref(false)
const savingFollow = ref(false)
const company = reactive<Company>(INITIAL_COMPANY_INFO_NULL)

const isFollowed = computed(() => favoritesStore.isCompanyFollowed(company.id))
const companyId = computed(() => company.id ?? 0)

const handleFollow = async () => {
    if (savingFollow.value) return
    savingFollow.value = true
    try {
        await favoritesStore.toggleCompanyFollowed(
            company.id as number,
            company.slug as string
        )
    } finally {
        savingFollow.value = false
    }
}

onMounted(async () => {
    loading.value = true
    const data = await companyStore.detail(slug as string)
    if (!data || (!data.id && data.status_code !== STATUS_CODE_SUCCESS)) {
        return router.push({ name: 'not-found' })
    }
    Object.assign(company, data)
    loading.value = false
})

useHead(
    computed(() => ({
        title: company.name,
        meta: [
            { property: 'og:title', content: company.name },
            { property: 'og:description', content: company.description },
            { property: 'og:image', content: company.logo },
            { property: 'og:url', content: currentUrl },
            { property: 'og:type', content: 'website' },
        ],
    }))
)
</script>

<template>
    <a-card :loading="loading" class="card-loading-page">
        <div class="container page-detail company-detail" v-if="company.id">
            <div class="box-cover-img" v-if="company.cover_img">
                <img :src="company.cover_img" alt="" />
            </div>
            <div class="box-header">
                <img :src="company.logo ?? ImgDefault" alt="" class="logo" />
                <div class="info">
                    <h1 class="title" v-if="company.name">
                        {{ getCompanyName(company) }}
                    </h1>
                    <div class="flex-start mt-12">
                        <div class="info-meta mr-20" v-if="company.jobs_count">
                            <IconJob />
                            <span>
                                {{
                                    company.jobs_count +
                                    ' ' +
                                    t('home.company.job')
                                }}
                            </span>
                        </div>
                        <div class="info-meta" v-if="company.followers_count">
                            <IconUser />
                            <span>
                                {{
                                    company.followers_count +
                                    ' ' +
                                    t('home.company.detail.follower')
                                }}
                            </span>
                        </div>
                    </div>
                </div>
                <a-button
                    class="ant-btn-follow"
                    :loading="savingFollow"
                    @click="handleFollow()"
                >
                    {{
                        isFollowed
                            ? t('home.company.detail.btn.followed')
                            : t('home.company.detail.btn.follow')
                    }}
                </a-button>
            </div>

            <div class="box-body">
                <div class="left">
                    <div class="box-body-item description">
                        <h2 class="title">
                            {{ t('home.company.detail.title_box.about_us') }}
                        </h2>
                        <div class="content" v-html="company.description" />
                    </div>
                    <div class="box-body-item recruitment">
                        <h2 class="title">
                            {{ t('home.company.detail.title_box.recruitment') }}
                        </h2>
                        <div class="content box-job">
                            <CompanyListJob :id="companyId" />
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="box-body-item contact-company">
                        <h2 class="title">
                            {{ t('home.company.detail.title_box.contact') }}
                        </h2>
                        <div class="content">
                            <BoxContactCompany :company="company" />
                        </div>
                    </div>

                    <div class="box-body-item share-sns">
                        <h2 class="title">
                            {{ t('home.company.detail.title_box.share') }}
                        </h2>
                        <div class="content">
                            <BoxShare />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-card>
</template>
