<script setup lang="ts">
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
</script>

<template>
    <div class="footer">
        <h1 class="footer-logo">{{ t('title') }}</h1>
        <p class="detail">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            rerum necessitatibus tenetur maiores labore, ipsam obcaecati velit
            magni dicta. Aperiam, magni nostrum! Vel atque quibusdam inventore
            animi nulla omnis iste.
        </p>
    </div>
</template>
