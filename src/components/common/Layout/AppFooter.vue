<script setup lang="ts">
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
</script>

<template>
    <a-row class="footer" justify="space-between">
        <a-col :span="7" class="primary">
            <h1 class="logo">Booking Hair</h1>
            <p class="detail">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident rerum necessitatibus tenetur maiores labore, ipsam
                obcaecati velit magni dicta. Aperiam, magni nostrum! Vel atque
                quibusdam inventore animi nulla omnis iste.
            </p>
        </a-col>
        <a-col :span="5">
            <h2 class="title">Service</h2>
            <ul>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
            </ul>
        </a-col>
        <a-col :span="5">
            <h2 class="title">Introduction</h2>
            <ul>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
            </ul>
        </a-col>
        <a-col :span="5">
            <h2 class="title">Contact</h2>
            <ul>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
            </ul>
        </a-col>
    </a-row>
</template>

<style scoped lang="scss"></style>
