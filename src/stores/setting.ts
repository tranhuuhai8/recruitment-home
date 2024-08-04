import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useSettingStore = defineStore('setting', () => {
    const title = ref('')

    const getTitle = computed(() => title.value)

    const setTitle = (str: string) => {
        title.value = str
    }

    return {
        getTitle,
        setTitle,
    }
})
