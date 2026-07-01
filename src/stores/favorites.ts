import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'
import { notify, ROLE_APPLICANT } from '@/libs'
import * as favoriteAPI from '@/api/applicant/favorites'
import * as followAPI from '@/api/applicant/follows'

type FavoritesState = {
    savedJobIds: number[]
    savedJobSlugs: string[]
    followedCompanyIds: number[]
}

const emptyState = (): FavoritesState => ({
    savedJobIds: [],
    savedJobSlugs: [],
    followedCompanyIds: [],
})

export const useFavoritesStore = defineStore('favorites', () => {
    const state = ref<FavoritesState>(emptyState())

    const requireApplicantAuth = () => {
        const authStore = useAuthStore()
        if (!authStore.isAuthenticated) {
            notify('Vui lòng đăng nhập để sử dụng chức năng này', '', 'warning')
            return false
        }
        if (!authStore.isApplicant) {
            notify('Chức năng này chỉ dành cho Ứng viên', '', 'warning')
            return false
        }
        return true
    }

    const hydrate = async () => {
        const authStore = useAuthStore()
        if (!authStore.isAuthenticated || authStore.role !== ROLE_APPLICANT) {
            state.value = emptyState()
            return
        }
        try {
            const [jobsRes, companiesRes] = await Promise.all([
                favoriteAPI.listSavedJobs(),
                followAPI.listFollowedCompanies(),
            ])
            state.value.savedJobIds = (jobsRes?.data?.job_ids ?? []) as number[]
            state.value.savedJobSlugs = (jobsRes?.data?.job_slugs ??
                []) as string[]
            state.value.followedCompanyIds = (companiesRes?.data?.company_ids ??
                []) as number[]
        } catch {
            // ignore: interceptor already handles toast
        }
    }

    const toggleJobSaved = async (jobId: number, jobSlug: string) => {
        if (!requireApplicantAuth()) return false
        const res = await favoriteAPI.toggleSavedJob(jobSlug)
        const saved = !!res?.data?.saved
        const idSet = new Set(state.value.savedJobIds)
        const slugSet = new Set(state.value.savedJobSlugs)
        if (saved) {
            idSet.add(jobId)
            slugSet.add(jobSlug)
        } else {
            idSet.delete(jobId)
            slugSet.delete(jobSlug)
        }
        state.value.savedJobIds = Array.from(idSet)
        state.value.savedJobSlugs = Array.from(slugSet)
        return saved
    }

    const toggleCompanyFollowed = async (
        companyId: number,
        companySlug: string
    ) => {
        if (!requireApplicantAuth()) return false
        const res = await followAPI.toggleFollowedCompany(companySlug)
        const followed = !!res?.data?.followed
        const set = new Set(state.value.followedCompanyIds)
        if (followed) set.add(companyId)
        else set.delete(companyId)
        state.value.followedCompanyIds = Array.from(set)
        return followed
    }

    const isJobSaved = (jobId: number | null | undefined) =>
        !!jobId && state.value.savedJobIds.includes(Number(jobId))

    const isCompanyFollowed = (companyId: number | null | undefined) =>
        !!companyId &&
        state.value.followedCompanyIds.includes(Number(companyId))

    const savedJobsCount = computed(() => state.value.savedJobIds.length)
    const followedCompaniesCount = computed(
        () => state.value.followedCompanyIds.length
    )

    return {
        state,
        hydrate,
        toggleJobSaved,
        toggleCompanyFollowed,
        isJobSaved,
        isCompanyFollowed,
        savedJobsCount,
        followedCompaniesCount,
    }
})
