<script setup lang="ts">
import { useCompanyStore } from '@/stores/home'
import { Vue3Marquee } from 'vue3-marquee'
import ImgDefault from '@/assets/imgs/img-default.png'

const companyStore = useCompanyStore()
</script>

<template>
    <div class="company-marquee">
        <Vue3Marquee
            :duration="10"
            :gradient="true"
            :pauseOnClick="true"
            :clone="true"
        >
            <img
                v-for="company in companyStore.getCompanies.data"
                :key="company.id"
                :src="company.logo ?? ImgDefault"
                class="marquee-item"
            />
        </Vue3Marquee>
    </div>
</template>
