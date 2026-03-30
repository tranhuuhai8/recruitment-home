import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as API from '@/api/admin/contact'
import type {
    IContactItem,
    IUpdateContactDto,
    IReplyContactDto,
} from '@/interface'

export const useContactStore = defineStore('admin-contact', () => {
    const contacts = ref({} as any)
    const contact = ref({} as IContactItem)

    const list = async (payload: Record<string, any>) => {
        try {
            const response = await API.list(payload)
            return (contacts.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const detail = async (id: number) => {
        try {
            const response = await API.detail(id)
            return (contact.value = response.data)
        } catch (error: any) {
            return error
        }
    }

    const update = async (id: number, payload: IUpdateContactDto) => {
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

    const reply = async (id: number, payload: IReplyContactDto) => {
        try {
            return await API.reply(id, payload)
        } catch (error: any) {
            return error
        }
    }

    const getContacts = computed(() => contacts.value)
    const getContact = computed(() => contact.value)

    return {
        getContacts,
        getContact,
        list,
        detail,
        update,
        remove,
        reply,
    }
})
