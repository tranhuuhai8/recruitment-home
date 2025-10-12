<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { onMounted, reactive, ref, watch } from 'vue'
import type { Company } from '@/interface'
import { useCompanyStore } from '@/stores/home'
import { IconUser, IconJob } from '@/components/icons'
import BoxContact from '../common/BoxContact.vue'
import BoxShare from '../common/BoxShare.vue'
import CompanyListJob from '../common/CompanyListJob.vue'

const { t } = useI18n()
const {
    params: { id },
} = useRoute()
const currentUrl = window.location.href
const companyStore = useCompanyStore()
const loading = ref(false)
const company = reactive<Company | Record<string, any>>({})

const handleFollow = (id: number) => {
    console.log('Follow company id:', id)
}

onMounted(async () => {
    loading.value = true
    const data = await companyStore.detail(+id)
    Object.assign(company, data)
    loading.value = false
})

watch(
    () => company.name,
    (newName) => {
        if (!newName) return
        useHead({
            title: company.name,
            meta: [
                { property: 'og:title', content: company.name },
                { property: 'og:description', content: company.description },
                { property: 'og:image', content: company.logo },
                { property: 'og:url', content: currentUrl },
                { property: 'og:type', content: 'website' },
            ],
        })
    },
    { immediate: false }
)
</script>

<template>
    <a-spin :spinning="loading" size="large">
        <div v-if="company.id" class="container detail company-detail">
            <div class="box-cover-img" v-if="company.cover_img">
                <img :src="company.cover_img" alt="" />
            </div>
            <div class="box-header">
                <img :src="company.logo" alt="" class="logo" />
                <div class="info">
                    <h1 class="company-name">
                        {{ company.name + ' (' + company.short_name + ')' }}
                    </h1>
                    <div class="flex-start mt-12">
                        <div class="company-meta mr-20">
                            <IconJob />
                            <span>
                                {{
                                    company.jobs_count +
                                    ' ' +
                                    t('home.company.job')
                                }}
                            </span>
                        </div>
                        <div class="company-meta">
                            <IconUser />
                            <span>
                                {{
                                    9999 +
                                    ' ' +
                                    t('home.company.detail.follower')
                                }}
                            </span>
                        </div>
                    </div>
                </div>
                <a-button
                    class="ant-btn-follow"
                    @click="handleFollow(company.id)"
                >
                    {{ t('home.company.detail.btn.follow') }}
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
                            <CompanyListJob :id="+id" />
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="box-body-item contact">
                        <h2 class="title">
                            {{ t('home.company.detail.title_box.contact') }}
                        </h2>
                        <div class="content">
                            <BoxContact :company="company" />
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
    </a-spin>
</template>
