import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'
import { notify, ROLE_APPLICANT } from '@/libs'
import * as FavoriteAPI from '@/api/applicant/favorites'
import * as FollowAPI from '@/api/applicant/follows'

type FavoritesState = {
    savedJobIds: number[]
    followedCompanyIds: number[]
}

const emptyState = (): FavoritesState => ({
    savedJobIds: [],
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
                FavoriteAPI.listSavedJobs(),
                FollowAPI.listFollowedCompanies(),
            ])
            state.value.savedJobIds = (jobsRes?.data?.job_ids ?? []) as number[]
            state.value.followedCompanyIds = (companiesRes?.data?.company_ids ??
                []) as number[]
        } catch {
            // ignore: interceptor already handles toast
        }
    }

    const toggleJobSaved = async (jobId: number) => {
        if (!requireApplicantAuth()) return false
        const res = await FavoriteAPI.toggleSavedJob(jobId)
        const saved = !!res?.data?.saved
        const set = new Set(state.value.savedJobIds)
        if (saved) set.add(jobId)
        else set.delete(jobId)
        state.value.savedJobIds = Array.from(set)
        return saved
    }

    const toggleCompanyFollowed = async (companyId: number) => {
        if (!requireApplicantAuth()) return false
        const res = await FollowAPI.toggleFollowedCompany(companyId)
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
        !!companyId && state.value.followedCompanyIds.includes(Number(companyId))

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

