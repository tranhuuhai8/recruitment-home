<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    SendOutlined,
    ClockCircleOutlined,
    QuestionCircleOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
} from '@ant-design/icons-vue'
import { notify } from '@/libs/utils/helperUI'

const formState = reactive({ name: '', email: '', subject: '', message: '' })

const onFinish = (values: any) => {
    console.log('Success:', values)
    notify(
        'Thành công',
        'Tin nhắn của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm!',
        'success'
    )
    formState.name = ''
    formState.email = ''
    formState.subject = ''
    formState.message = ''
}

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
}

const activeKey = ref('1')

const faqs = [
    {
        key: '1',
        question: 'Làm sao để đăng ký tài khoản ứng viên?',
        answer: 'Bạn có thể đăng ký nhanh chóng qua nút "Đăng ký" trên trang chủ. Chỉ cần điền email và mật khẩu là hoàn tất trong vòng 1 phút!',
    },
    {
        key: '2',
        question: 'Tôi là nhà tuyển dụng, làm thế nào để đăng tin?',
        answer: 'Sau khi đăng ký tài khoản công ty và được xác minh, bạn có thể đăng tin tuyển dụng trực tiếp từ trang quản trị của mình.',
    },
    {
        key: '3',
        question: 'Phí dịch vụ được tính như thế nào?',
        answer: 'Hiện tại ứng viên sử dụng miễn phí. Nhà tuyển dụng có thể tham khảo gói dịch vụ tại trang Pricing hoặc liên hệ để được tư vấn.',
    },
    {
        key: '4',
        question: 'Thông tin cá nhân của tôi có được bảo mật không?',
        answer: 'Chúng tôi cam kết bảo mật hoàn toàn thông tin cá nhân theo đúng tiêu chuẩn GDPR và Luật An ninh mạng Việt Nam.',
    },
]

const quickItems = [
    {
        icon: PhoneOutlined,
        label: 'Gọi cho chúng tôi',
        value: '(+84) 123 456 789',
    },
    {
        icon: MailOutlined,
        label: 'Gửi email',
        value: 'support@recruitment.com',
    },
    {
        icon: ClockCircleOutlined,
        label: 'Giờ làm việc',
        value: 'T2–T6: 8:00 – 17:30',
    },
]
const infoItems = [
    {
        icon: EnvironmentOutlined,
        label: 'Văn phòng chính',
        value: 'Tầng 12, Tòa nhà Alpha, 123 Nguyễn Huệ, Quận 1, TP. HCM',
    },
    {
        icon: PhoneOutlined,
        label: 'Đường dây nóng',
        value: '(+84) 123 456 789 &nbsp;|&nbsp; Thứ 2 – Thứ 6 (8:00 – 17:30)',
    },
    {
        icon: MailOutlined,
        label: 'Email hỗ trợ',
        value: 'support@recruitment.com<br/>business@recruitment.com',
    },
]
</script>

<template>
    <div class="ph-page contact-page">
        <div class="ph-hero contact-hero">
            <div class="ph-hero__overlay contact-hero__overlay" />
            <div class="ph-hero__content ph-fade-in-up">
                <div class="ph-hero__badge">📬 Hỗ trợ 24/7</div>
                <h1 class="ph-hero__title">Liên Hệ Với Chúng Tôi</h1>
                <p class="ph-hero__subtitle">
                    Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Vui lòng để
                    lại lời nhắn hoặc liên hệ trực tiếp qua thông tin bên dưới.
                </p>
                <div class="ph-hero__stats">
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">24/7</span
                        ><span class="ph-stat-item__label">Hỗ trợ</span>
                    </div>
                    <div class="ph-stat-divider" />
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">&lt;2h</span
                        ><span class="ph-stat-item__label">Phản hồi</span>
                    </div>
                    <div class="ph-stat-divider" />
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">99%</span
                        ><span class="ph-stat-item__label">Hài lòng</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="quick-bar">
            <div class="ph-container">
                <a-row :gutter="[24, 24]" justify="center">
                    <a-col
                        :xs="24"
                        :sm="8"
                        v-for="(q, i) in quickItems"
                        :key="i"
                    >
                        <div
                            class="quick-card ph-slide-up"
                            :style="`animation-delay:${i * 0.1}s`"
                        >
                            <div class="quick-card__icon">
                                <component :is="q.icon" />
                            </div>
                            <div>
                                <div class="quick-card__label">
                                    {{ q.label }}
                                </div>
                                <div class="quick-card__value">
                                    {{ q.value }}
                                </div>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="ph-container ph-section">
            <a-row :gutter="[40, 40]">
                <a-col :xs="24" :lg="10">
                    <div class="ph-fade-in-left">
                        <h2 class="ph-section-title">Thông Tin Liên Hệ</h2>
                        <p class="ph-section-desc">
                            Đội ngũ hỗ trợ của chúng tôi luôn trực tuyến để mang
                            đến dịch vụ tốt nhất cho bạn. Hãy chọn kênh liên lạc
                            phù hợp nhất!
                        </p>
                        <div class="info-list">
                            <div
                                class="info-item"
                                v-for="item in infoItems"
                                :key="item.label"
                            >
                                <div class="info-item__icon">
                                    <component :is="item.icon" />
                                </div>
                                <div>
                                    <h4>{{ item.label }}</h4>
                                    <p v-html="item.value" />
                                </div>
                            </div>
                        </div>
                        <div class="socials">
                            <p class="socials__title">Kết nối với chúng tôi</p>
                            <div class="socials__icons">
                                <a class="social-btn social-btn--fb"
                                    ><FacebookOutlined
                                /></a>
                                <a class="social-btn social-btn--li"
                                    ><LinkedinOutlined
                                /></a>
                                <a class="social-btn social-btn--tw"
                                    ><TwitterOutlined
                                /></a>
                            </div>
                        </div>
                    </div>
                </a-col>

                <a-col :xs="24" :lg="14">
                    <a-card
                        class="form-card ph-fade-in-right"
                        :bordered="false"
                    >
                        <h2 class="form-card__title">Gửi Lời Nhắn</h2>
                        <p class="form-card__sub">
                            Điền vào form bên dưới và chúng tôi sẽ phản hồi
                            trong vòng 2 giờ làm việc.
                        </p>
                        <a-form
                            :model="formState"
                            name="contact_form"
                            layout="vertical"
                            @finish="onFinish"
                            @finishFailed="onFinishFailed"
                        >
                            <a-row :gutter="16">
                                <a-col :xs="24" :sm="12">
                                    <a-form-item
                                        label="Họ và tên"
                                        name="name"
                                        :rules="[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập họ tên!',
                                            },
                                        ]"
                                    >
                                        <a-input
                                            v-model:value="formState.name"
                                            placeholder="Nguyễn Văn A"
                                            size="large"
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12">
                                    <a-form-item
                                        label="Email"
                                        name="email"
                                        :rules="[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Email không hợp lệ!',
                                            },
                                        ]"
                                    >
                                        <a-input
                                            v-model:value="formState.email"
                                            placeholder="example@email.com"
                                            size="large"
                                        />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-form-item
                                label="Chủ đề"
                                name="subject"
                                :rules="[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập chủ đề!',
                                    },
                                ]"
                            >
                                <a-input
                                    v-model:value="formState.subject"
                                    placeholder="Bạn cần hỗ trợ về..."
                                    size="large"
                                />
                            </a-form-item>
                            <a-form-item
                                label="Nội dung"
                                name="message"
                                :rules="[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập nội dung!',
                                    },
                                ]"
                            >
                                <a-textarea
                                    v-model:value="formState.message"
                                    placeholder="Viết tin nhắn cho chúng tôi..."
                                    :rows="6"
                                    size="large"
                                />
                            </a-form-item>
                            <a-form-item>
                                <a-button
                                    type="primary"
                                    html-type="submit"
                                    size="large"
                                    class="submit-btn"
                                >
                                    <template #icon><SendOutlined /></template>
                                    Gửi Tin Nhắn
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </a-card>
                </a-col>
            </a-row>
        </div>

        <div class="faq-section">
            <div class="ph-container">
                <div class="ph-text-center ph-mb-10">
                    <div class="ph-section-badge">
                        <QuestionCircleOutlined /> Câu hỏi thường gặp
                    </div>
                    <h2 class="ph-section-title--center">Bạn Có Thắc Mắc?</h2>
                    <p class="ph-section-subtitle">
                        Tham khảo những câu hỏi phổ biến nhất từ người dùng của
                        chúng tôi.
                    </p>
                </div>
                <a-collapse
                    v-model:activeKey="activeKey"
                    :bordered="false"
                    class="faq-collapse"
                >
                    <a-collapse-panel
                        v-for="faq in faqs"
                        :key="faq.key"
                        :header="faq.question"
                        class="faq-panel"
                    >
                        <p class="faq-answer">{{ faq.answer }}</p>
                    </a-collapse-panel>
                </a-collapse>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contact-hero {
    background-image: url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    min-height: 440px;
}
.contact-hero__overlay {
    background: linear-gradient(
        135deg,
        rgba(0, 80, 179, 0.85) 0%,
        rgba(24, 144, 255, 0.75) 100%
    );
}

.quick-bar {
    background: #fff;
    padding: 28px 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
.quick-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    border-radius: 12px;
    border: 1px solid #e8f4ff;
    background: #f0f7ff;
    transition: all 0.3s;
    cursor: pointer;
}
.quick-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(24, 144, 255, 0.15);
    background: #1890ff;
}
.quick-card:hover .quick-card__icon,
.quick-card:hover .quick-card__label,
.quick-card:hover .quick-card__value {
    color: #fff;
}
.quick-card__icon {
    font-size: 28px;
    color: #1890ff;
    flex-shrink: 0;
    transition: color 0.3s;
}
.quick-card__label {
    font-size: 0.85rem;
    color: #6b7280;
    transition: color 0.3s;
}
.quick-card__value {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    transition: color 0.3s;
}

.info-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 28px;
}
.info-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    transition: all 0.3s;
}
.info-item:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 16px rgba(24, 144, 255, 0.1);
    transform: translateX(6px);
}
.info-item__icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #e6f7ff;
    color: #1890ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
}
.info-item h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
    color: #111;
}
.info-item p {
    color: #6b7280;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
}

.socials {
    margin-top: 8px;
}
.socials__title {
    font-weight: 600;
    color: #374151;
    margin-bottom: 12px;
}
.socials__icons {
    display: flex;
    gap: 12px;
}
.social-btn {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #fff;
    transition: all 0.3s;
    cursor: pointer;
}
.social-btn:hover {
    transform: translateY(-4px);
    opacity: 0.85;
}
.social-btn--fb {
    background: #1877f2;
}
.social-btn--li {
    background: #0a66c2;
}
.social-btn--tw {
    background: #1da1f2;
}

.form-card {
    border-radius: 20px !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08) !important;
}
.form-card :deep(.ant-card-body) {
    padding: 40px;
}
.form-card__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
}
.form-card__sub {
    color: #6b7280;
    margin-bottom: 28px;
}

.submit-btn {
    width: 100%;
    height: 52px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;
}
.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(24, 144, 255, 0.35);
}

.faq-section {
    background: #fff;
    padding: 80px 0;
}
.faq-collapse {
    max-width: 860px;
    margin: 0 auto;
}
.faq-panel {
    margin-bottom: 12px;
    border-radius: 12px !important;
    overflow: hidden;
    border: 1px solid #f0f0f0 !important;
}
.faq-panel :deep(.ant-collapse-header) {
    font-weight: 600;
    font-size: 1.05rem;
    padding: 20px 24px !important;
}
.faq-answer {
    color: #4b5563;
    line-height: 1.7;
    margin: 0;
}
</style>
