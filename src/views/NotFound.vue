<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
    <div className="page-not-found">
        <div class="stars">
            <div class="central-body">
                <h1 class="text-404">{{ t('page_not_found.status') }}</h1>
                <div
                    class="btn-go-home"
                    @click="() => router.push({ name: 'home' })"
                >
                    {{ t('page_not_found.btn_redirect') }}
                </div>
            </div>
            <div class="objects">
                <img
                    class="object_rocket"
                    src="http://salehriaz.com/404Page/img/rocket.svg"
                    width="40px"
                />
                <img
                    class="object_earth"
                    src="http://salehriaz.com/404Page/img/earth.svg"
                    width="100px"
                />
                <img
                    class="object_moon"
                    src="http://salehriaz.com/404Page/img/moon.svg"
                    width="80px"
                />
                <div class="box_astronaut">
                    <img
                        class="object_astronaut"
                        src="http://salehriaz.com/404Page/img/astronaut.svg"
                        width="140px"
                    />
                </div>
            </div>
            <div class="glowing_stars">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
            </div>
        </div>
    </div>
</template>
