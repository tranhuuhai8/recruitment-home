<script setup lang="ts">
const config = {
    token: {
        colorPrimary: '#d98600',
        borderRadius: 5,
    },
}
</script>

<template>
    <a-config-provider :theme="config" :autoInsertSpaceInButton="false">
        <LayoutVue>
            <router-view />
        </LayoutVue>
    </a-config-provider>
</template>
