import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/mailTemplate'
import type {
    IMailTemplateItem,
    IMailTemplatePreview,
    IMailTemplateDto,
} from '@/interface'

export const useMailTemplateStore = defineStore('admin-mail-template', () => {
    const templates = ref({} as any)
    const template = ref({} as IMailTemplateItem)
    const preview = ref({} as IMailTemplatePreview)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (templates.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const response = await API.detail(id)
            return (template.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const create = async (payload: IMailTemplateDto) => {
        try {
            return await API.create(payload)
        } catch (error: any) {
            return error
        }
    }

    const update = async (id: number, payload: Partial<IMailTemplateDto>) => {
        try {
            return await API.update(id, payload)
        } catch (error: any) {
            return error
        }
    }

    const remove = async (id: number) => {
        try {
            return await API.remove(id)
        } catch (error: any) {
            return error
        }
    }

    const fetchPreview = async (id: number) => {
        try {
            const response = await API.preview(id)
            return (preview.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const getTemplates = computed(() => templates.value)
    const getTemplate = computed(() => template.value)
    const getPreview = computed(() => preview.value)

    return {
        getTemplates,
        getTemplate,
        getPreview,
        list,
        detail,
        create,
        update,
        remove,
        fetchPreview,
    }
})
