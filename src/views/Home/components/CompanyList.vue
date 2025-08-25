<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useCompanyStore } from '@/stores/home/company'
import { IconLocation, IconJob } from '@/components/icons'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t } = useI18n()
const companyStore = useCompanyStore()
</script>

<template>
    <div class="container company-list">
        <swiper
            :loop="true"
            :pagination="{
                clickable: true,
            }"
            :breakpoints="{
                0: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 30 },
            }"
            :scrollbar="{ draggable: true }"
            :modules="[Pagination]"
            class="mySwiper"
        >
            <swiper-slide
                v-for="company in companyStore.getCompanies.data"
                :key="company.id"
                class="company-item"
            >
                <img :src="company.logo" alt="" class="logo" />
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
