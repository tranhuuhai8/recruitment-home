<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useContactStore, useMailTemplateStore } from '@/stores/admin'
import { CONTACT_STATUS_MAP, CONTACT_PRIORITY_MAP } from './shared'
import { MAIL_LOG_STATUS_MAP } from '@/views/Admin/MailLog/shared'
import { notify } from '@/libs/utils/helperUI'
import type { IUpdateContactDto, IReplyContactDto } from '@/interface'
import {
    ArrowLeftOutlined,
    MailOutlined,
    EditOutlined,
    UserOutlined,
    PhoneOutlined,
    CalendarOutlined,
    MessageOutlined,
    SendOutlined,
    ClockCircleOutlined,
    TagOutlined,
    FileTextOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const contactStore = useContactStore()
const mailTemplateStore = useMailTemplateStore()

const contactId = computed(() => Number(route.params.id))
const contact = ref<any>(null)
const loading = ref(false)
const isUpdating = ref(false)
const isReplying = ref(false)
const showReplyModal = ref(false)
const showUpdateModal = ref(false)
const templatePreview = ref<any>(null)
const previewLoading = ref(false)
const replyFormRef = ref()

// Form update
const updateForm = reactive<IUpdateContactDto>({
    status: undefined,
    priority: undefined,
    admin_note: '',
})

// Form reply
const replyForm = reactive<IReplyContactDto>({
    mail_template_id: null as any,
    subject: '',
    body: '',
})

const templates = ref<any[]>([])
const templatePage = ref(1)
const templateHasMore = ref(true)
const templateLoading = ref(false)
const mailLogs = computed(() => contact.value?.mail_logs ?? [])
const isSpam = computed(() => contact.value?.status === 5)

const statusOptions = [
    { label: 'Mới', value: 1 },
    { label: 'Đã đọc', value: 2 },
    { label: 'Đang xử lý', value: 3 },
    { label: 'Đã giải quyết', value: 4 },
    { label: 'Spam', value: 5 },
]

const priorityOptions = [
    { label: 'Thấp', value: 1 },
    { label: 'Bình thường', value: 2 },
    { label: 'Cao', value: 3 },
    { label: 'Khẩn cấp', value: 4 },
]

const fetchContact = async () => {
    loading.value = true
    try {
        const data = await contactStore.detail(contactId.value)
        contact.value = data
        updateForm.status = data?.status
        updateForm.priority = data?.priority
        updateForm.admin_note = data?.admin_note ?? ''
    } catch {
        notify('Lỗi', 'Không thể tải chi tiết liên hệ!', 'error')
    } finally {
        loading.value = false
    }
}

const fetchTemplates = async (page = 1) => {
    if (templateLoading.value) return
    templateLoading.value = true
    try {
        const perPage = 10
        const res = await mailTemplateStore.list({
            page,
            per_page: perPage,
            filters: [{ key: 'is_active', data: 1 }],
        })
        const newItems = res?.data ?? []
        if (page === 1) {
            templates.value = newItems
        } else {
            templates.value = [...templates.value, ...newItems]
        }
        templateHasMore.value = newItems.length === perPage
        templatePage.value = page
    } finally {
        templateLoading.value = false
    }
}

const loadMoreTemplates = async (e: UIEvent) => {
    const target = e.target as HTMLElement
    // Cộng thêm khoảng sai số <= 1px để trigger chính xác trên các màn hình zoom
    if (
        Math.ceil(target.scrollTop + target.offsetHeight) >= target.scrollHeight
    ) {
        if (!templateHasMore.value || templateLoading.value) return
        await fetchTemplates(templatePage.value + 1)
    }
}

const handleUpdate = async () => {
    isUpdating.value = true
    try {
        await contactStore.update(contactId.value, {
            status: updateForm.status,
            priority: updateForm.priority,
            admin_note: updateForm.admin_note,
        })
        notify('Thành công', 'Đã cập nhật liên hệ!', 'success')
        showUpdateModal.value = false
        await fetchContact()
    } catch (e: any) {
        notify('Lỗi', e?.message ?? 'Cập nhật thất bại!', 'error')
    } finally {
        isUpdating.value = false
    }
}

const handlePreviewTemplate = async (templateId: number) => {
    if (!templateId) return
    previewLoading.value = true
    try {
        const res = await mailTemplateStore.fetchPreview(templateId)
        templatePreview.value = res
        replyForm.subject = res?.subject ?? ''
        replyForm.body = res?.body ?? ''
    } catch {
        notify('Lỗi', 'Không thể preview template!', 'error')
    } finally {
        previewLoading.value = false
    }
}

const handleReply = async () => {
    try {
        await replyFormRef.value?.validate()
    } catch {
        return
    }
    isReplying.value = true
    try {
        await contactStore.reply(contactId.value, {
            mail_template_id: replyForm.mail_template_id,
            subject: replyForm.subject || undefined,
            body: replyForm.body || undefined,
        })
        notify(
            'Đã gửi vào queue',
            'Email đang được xử lý. Vui lòng kiểm tra Mail Log để xác nhận trạng thái gửi.',
            'success'
        )
        showReplyModal.value = false
        await fetchContact()
    } catch (e: any) {
        notify('Lỗi', e?.message ?? 'Gửi phản hồi thất bại!', 'error')
    } finally {
        isReplying.value = false
    }
}

const openReplyModal = () => {
    replyForm.mail_template_id = null as any
    replyForm.subject = ''
    replyForm.body = ''
    templatePreview.value = null
    showReplyModal.value = true
    replyFormRef.value?.clearValidate()

    // Reset pagination
    templatePage.value = 1
    templateHasMore.value = true
    templates.value = []
    fetchTemplates(1)
}

const templateOptions = computed(() =>
    templates.value.map((t) => ({ label: t.name, value: t.id }))
)

onMounted(async () => {
    await fetchContact()
})
</script>

<template>
    <div class="cd-page">
        <div class="cd-action-bar">
            <a-button @click="router.push({ name: 'admin-contact' })">
                <template #icon><ArrowLeftOutlined /></template>
                {{ t('back') }}
            </a-button>
            <div class="cd-action-bar__right">
                <a-button @click="showUpdateModal = true">
                    <template #icon><EditOutlined /></template>
                    {{ t('update') }}
                </a-button>
                <a-tooltip
                    :title="isSpam ? t('contact.sender.spam_tooltip') : ''"
                >
                    <a-button
                        type="primary"
                        :disabled="isSpam"
                        @click="openReplyModal"
                    >
                        <template #icon><SendOutlined /></template>
                        {{ t('contact.sender.reply_email') }}
                    </a-button>
                </a-tooltip>
            </div>
        </div>

        <a-spin :spinning="loading">
            <!-- Sender card: full width -->
            <div class="cd-sender-card">
                <div class="cd-sender-avatar">
                    <UserOutlined />
                </div>
                <div class="cd-sender-info">
                    <div class="cd-sender-name">
                        {{ contact?.full_name ?? '—' }}
                    </div>
                    <div class="cd-sender-email">
                        {{ contact?.email ?? '—' }}
                    </div>
                </div>
            </div>

            <!-- Info card -->
            <div class="cd-card">
                <div class="cd-card__header">
                    <MessageOutlined class="cd-card__icon" />
                    {{ t('contact.sender.contact_info') }}
                </div>
                <div class="cd-info-grid">
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <PhoneOutlined /> {{ t('contact.sender.phone') }}
                        </div>
                        <div class="cd-info-value">
                            {{ contact?.phone ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <CalendarOutlined />
                            {{ t('contact.sender.sent_date') }}
                        </div>
                        <div class="cd-info-value">
                            {{ contact?.created_at ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            <ClockCircleOutlined />
                            {{ t('contact.sender.replied_at') }}
                        </div>
                        <div class="cd-info-value cd-info-value--muted">
                            {{ contact?.replied_at ?? '—' }}
                        </div>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">{{ t('status.label') }}</div>
                        <a-tag
                            :color="CONTACT_STATUS_MAP[contact?.status]?.color"
                        >
                            {{ CONTACT_STATUS_MAP[contact?.status]?.label }}
                        </a-tag>
                    </div>
                    <div class="cd-info-item">
                        <div class="cd-info-label">
                            {{ t('contact.sender.priority') }}
                        </div>
                        <a-tag
                            :color="
                                CONTACT_PRIORITY_MAP[contact?.priority]?.color
                            "
                        >
                            {{ CONTACT_PRIORITY_MAP[contact?.priority]?.label }}
                        </a-tag>
                    </div>
                </div>

                <div class="cd-divider" />

                <div class="cd-subject">
                    <div class="cd-info-label">
                        <TagOutlined /> {{ t('contact.sender.subject') }}
                    </div>
                    <div class="cd-subject__text">
                        {{ contact?.title ?? '—' }}
                    </div>
                </div>

                <div class="cd-content-block">
                    <div class="cd-info-label">
                        <FileTextOutlined /> {{ t('contact.sender.content') }}
                    </div>
                    <div class="cd-content-box">
                        <span
                            v-if="contact?.content"
                            style="white-space: pre-wrap"
                            >{{ contact?.content }}</span
                        >
                        <span v-else class="cd-info-value--muted">{{
                            t('contact.sender.no_content')
                        }}</span>
                    </div>
                </div>
            </div>

            <!-- Admin note -->
            <div class="cd-card cd-card--note">
                <div class="cd-card__header">
                    📝 {{ t('contact.sender.admin_note') }}
                </div>
                <div class="cd-note-box">
                    <span v-if="contact?.admin_note">{{
                        contact.admin_note
                    }}</span>
                    <span v-else class="cd-info-value--muted">{{
                        t('contact.sender.no_note')
                    }}</span>
                </div>
            </div>

            <!-- Mail log: full width below -->
            <div class="cd-card">
                <div class="cd-card__header">
                    <MailOutlined class="cd-card__icon" />
                    {{ t('contact.mail_log.title') }}
                    <a-badge
                        v-if="mailLogs.length"
                        :count="mailLogs.length"
                        class="cd-log-badge"
                    />
                </div>

                <a-empty
                    v-if="!mailLogs.length"
                    :description="t('contact.mail_log.no_email')"
                    class="cd-empty"
                />

                <a-timeline v-else class="cd-timeline">
                    <a-timeline-item
                        v-for="(item, idx) in mailLogs"
                        :key="idx"
                        :color="
                            MAIL_LOG_STATUS_MAP[item.status]?.color ?? 'gray'
                        "
                    >
                        <div class="cd-log-item">
                            <div class="cd-log-subject">{{ item.subject }}</div>
                            <div class="cd-log-meta">
                                <a-tag
                                    :color="
                                        MAIL_LOG_STATUS_MAP[item.status]?.color
                                    "
                                    style="font-size: 0.72rem"
                                >
                                    {{
                                        MAIL_LOG_STATUS_MAP[item.status]?.label
                                    }}
                                </a-tag>
                                <span class="cd-log-date">{{
                                    item.sent_at ?? item.created_at
                                }}</span>
                            </div>
                        </div>
                    </a-timeline-item>
                </a-timeline>
            </div>
        </a-spin>

        <!-- Update Modal -->
        <a-modal
            v-model:open="showUpdateModal"
            :title="t('update')"
            :ok-text="t('save')"
            :cancel-text="t('cancel')"
            :confirm-loading="isUpdating"
            @ok="handleUpdate"
        >
            <a-form layout="vertical" style="margin-top: 16px">
                <a-form-item :label="t('status.label')">
                    <a-select
                        v-model:value="updateForm.status"
                        style="width: 100%"
                    >
                        <a-select-option
                            v-for="opt in statusOptions"
                            :key="opt.value"
                            :value="opt.value"
                        >
                            {{ opt.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :label="t('contact.sender.priority')">
                    <a-select
                        v-model:value="updateForm.priority"
                        style="width: 100%"
                    >
                        <a-select-option
                            v-for="opt in priorityOptions"
                            :key="opt.value"
                            :value="opt.value"
                        >
                            {{ opt.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :label="t('contact.sender.admin_note')">
                    <a-textarea
                        v-model:value="updateForm.admin_note"
                        :rows="4"
                        :placeholder="t('contact.sender.input_note')"
                    />
                </a-form-item>
            </a-form>
        </a-modal>

        <!-- Reply Modal -->
        <a-modal
            v-model:open="showReplyModal"
            :title="t('contact.reply.title')"
            width="700px"
            :ok-text="t('contact.reply.send')"
            :cancel-text="t('cancel')"
            :confirm-loading="isReplying"
            :body-style="{
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: '24px',
            }"
            @ok="handleReply"
        >
            <a-alert
                type="info"
                show-icon
                :message="t('contact.reply.info_async')"
                style="margin-bottom: 16px"
            />
            <a-form ref="replyFormRef" layout="vertical" :model="replyForm">
                <a-form-item
                    :label="t('contact.reply.select_template')"
                    name="mail_template_id"
                    :rules="[
                        {
                            required: true,
                            message: t('contact.reply.require_template'),
                        },
                    ]"
                >
                    <a-select
                        v-model:value="replyForm.mail_template_id"
                        style="width: 100%"
                        :placeholder="t('contact.reply.placeholder_template')"
                        show-search
                        allow-clear
                        option-filter-prop="label"
                        :options="templateOptions"
                        @change="(val: number) => handlePreviewTemplate(val)"
                        @popupScroll="loadMoreTemplates"
                    />
                </a-form-item>
                <a-spin :spinning="previewLoading">
                    <a-form-item :label="t('contact.reply.subject')">
                        <a-input
                            v-model:value="replyForm.subject"
                            :placeholder="
                                t('contact.reply.subject_placeholder')
                            "
                        />
                    </a-form-item>
                    <a-form-item :label="t('contact.reply.content')">
                        <a-textarea
                            v-model:value="replyForm.body"
                            :rows="8"
                            :placeholder="
                                t('contact.reply.content_placeholder')
                            "
                        />
                    </a-form-item>
                    <a-collapse v-if="templatePreview?.body" ghost>
                        <a-collapse-panel
                            key="preview"
                            :header="t('contact.reply.preview_content')"
                        >
                            <div
                                style="
                                    border: 1px solid #f0f0f0;
                                    border-radius: 8px;
                                    padding: 16px;
                                    background: #fafafa;
                                "
                                v-html="templatePreview.body"
                            />
                        </a-collapse-panel>
                    </a-collapse>
                </a-spin>
            </a-form>
        </a-modal>
    </div>
</template>

<style lang="scss" scoped>
.cd-page {
    padding: 0;
}

/* ─── Action bar: no background, no box ──────────────── */
.cd-action-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;

    &__right {
        display: flex;
        gap: 10px;
        align-items: center;
    }
}

/* ─── Sender card ─────────────────────────────────────── */
.cd-sender-card {
    display: flex;
    align-items: center;
    gap: 16px;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 16px;
}

.cd-sender-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.35);
}

.cd-sender-info {
    flex: 1;
    min-width: 0;
}

.cd-sender-name {
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2px;
}

.cd-sender-email {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.82);
    word-break: break-all;
}

/* ─── Generic card ────────────────────────────────────── */
.cd-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);

    &--note {
        background: #fffbe6;
        border: 1px solid #ffe58f;
    }

    &__header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 18px;
        padding-bottom: 12px;
        border-bottom: 1px solid #f0f0f0;
    }

    &__icon {
        color: #0d9488;
        font-size: 16px;
    }
}

/* ─── Info grid ───────────────────────────────────────── */
.cd-info-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    margin-bottom: 18px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 560px) {
        grid-template-columns: repeat(2, 1fr);
    }
}

.cd-info-item {
    background: #f8fafc;
    border-radius: 8px;
    padding: 12px 14px;
    border: 1px solid #f0f0f0;
}

.cd-info-label {
    font-size: 0.72rem;
    color: #6b7280;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    gap: 5px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.cd-info-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1f2937;

    &--muted {
        font-weight: 400;
        color: #9ca3af;
        font-style: italic;
    }
}

/* ─── Subject & Content ───────────────────────────────── */
.cd-divider {
    height: 1px;
    background: #f0f0f0;
    margin: 16px 0;
}

.cd-subject {
    margin-bottom: 16px;

    &__text {
        font-size: 1.05rem;
        font-weight: 700;
        color: #111827;
        margin-top: 6px;
    }
}

.cd-content-block {
    .cd-info-label {
        margin-bottom: 10px;
    }
}

.cd-content-box {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 0.92rem;
    color: #374151;
    line-height: 1.7;
    min-height: 80px;
    white-space: pre-wrap;
}

/* ─── Note box ────────────────────────────────────────── */
.cd-note-box {
    font-size: 0.92rem;
    color: #78350f;
    line-height: 1.7;
    min-height: 40px;
}

/* ─── Timeline / Mail log ─────────────────────────────── */
.cd-log-badge {
    margin-left: auto;
}

.cd-empty {
    padding: 20px 0;
}

.cd-timeline {
    padding-top: 4px;
}

.cd-log-item {
    padding: 2px 0 8px;
}

.cd-log-subject {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 6px;
    line-height: 1.4;
}

.cd-log-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.cd-log-date {
    font-size: 0.78rem;
    color: #6b7280;
}
</style>
