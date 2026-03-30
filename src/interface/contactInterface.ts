export type ContactStatus = 1 | 2 | 3 | 4 | 5
export type ContactPriority = 1 | 2 | 3 | 4

export interface IContactItem {
    id: number
    full_name: string
    email: string
    phone?: string
    title: string
    content: string
    status: ContactStatus
    priority: ContactPriority
    admin_note?: string
    replied_at?: string
    created_at: string
    updated_at: string
    mail_logs?: IMailLogItem[]
}

export interface IContactListResult {
    data: IContactItem[]
    total: number
    per_page: number
    current_page: number
}

export interface IContactFormDto {
    full_name: string
    email: string
    phone?: string
    title: string
    content: string
}

// PUT /api/admin/contact/:id
export interface IUpdateContactDto {
    status?: ContactStatus
    priority?: ContactPriority
    admin_note?: string
}

// POST /api/admin/contact/:id/reply
export interface IReplyContactDto {
    mail_template_id: number
    subject?: string
    body?: string
}

// ─── Mail Template ────────────────────────────────────────────────────────────

export type MailTemplateType = 1 | 2 | 3

export interface IMailTemplateItem {
    id: number
    name: string
    code: string
    subject: string
    body: string
    variables: string[]
    type: MailTemplateType
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface IMailTemplateDto {
    name: string
    code: string
    subject: string
    body: string
    variables?: string[]
    type: MailTemplateType
    is_active?: boolean
}

export interface IMailTemplatePreview {
    subject: string
    body: string
    variables: string[]
}

// ─── Mail Log ─────────────────────────────────────────────────────────────────

export type MailLogStatus = 1 | 2 | 3 | 4

export interface IMailLogItem {
    id: number
    contact_id: number
    to_email: string
    subject: string
    body?: string
    status: MailLogStatus
    error_message?: string
    sent_at?: string
    created_at: string
    updated_at: string
}
