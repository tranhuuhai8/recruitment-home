<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useCompanyStore } from '@/stores/home'
import ImgDefault from '@/assets/imgs/img-default.png'
import { IconLocation, IconJob } from '@/components/icons'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t } = useI18n()
const router = useRouter()
const companyStore = useCompanyStore()

const handleDetail = (slug?: string) =>
    router.push({ name: 'company-home-detail', params: { slug } })
</script>

<template>
    <div class="container company-list">
        <swiper
            :pagination="{
                clickable: true,
            }"
            :loop="true"
            :breakpoints="{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                990: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }"
            :scrollbar="{ draggable: true }"
            :modules="[Pagination]"
        >
            <swiper-slide
                v-for="company in companyStore.getCompanies.data"
                class="company-item"
                :key="company.id"
                @click="handleDetail(company.slug)"
            >
                <img :src="company.logo ?? ImgDefault" alt="" class="logo" />
                <a-tooltip>
                    <template #title>{{ company.name }}</template>
                    <p class="name">{{ company.short_name }}</p>
                </a-tooltip>
                <a-row v-if="company.jobs_count">
                    <IconJob />
                    <span>
                        {{ company.jobs_count + ' ' + t('home.company.job') }}
                    </span>
                </a-row>
                <a-row class="location">
                    <IconLocation />
                    <span>{{ company.city_name }}</span>
                </a-row>
            </swiper-slide>
        </swiper>
    </div>
</template>
