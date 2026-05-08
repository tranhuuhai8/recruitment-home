<script setup lang="ts">
import {
    TeamOutlined,
    SafetyCertificateOutlined,
    TrophyOutlined,
    BulbOutlined,
    CheckCircleOutlined,
    StarFilled,
} from '@ant-design/icons-vue'

const coreValues = [
    {
        icon: SafetyCertificateOutlined,
        title: 'Uy tín & Minh bạch',
        desc: 'Mọi thông tin về việc làm và ứng viên được kiểm duyệt kỹ lưỡng, đảm bảo môi trường tuyển dụng an toàn và trung thực.',
    },
    {
        icon: TrophyOutlined,
        title: 'Chất lượng hàng đầu',
        desc: 'Không ngừng nâng cao trải nghiệm người dùng với công nghệ hiện đại, giao diện thân thiện và quy trình tối ưu.',
    },
    {
        icon: TeamOutlined,
        title: 'Lấy con người làm gốc',
        desc: 'Đặt quyền lợi của cả ứng viên và nhà tuyển dụng lên hàng đầu, xây dựng cộng đồng nghề nghiệp bền vững.',
    },
]

const team = [
    {
        name: 'Nguyễn Minh Tuấn',
        role: 'CEO & Co-Founder',
        avatar: 'https://i.pravatar.cc/120?img=11',
    },
    {
        name: 'Trần Thị Lan',
        role: 'CTO',
        avatar: 'https://i.pravatar.cc/120?img=5',
    },
    {
        name: 'Lê Văn Hùng',
        role: 'Head of Product',
        avatar: 'https://i.pravatar.cc/120?img=15',
    },
    {
        name: 'Phạm Ngọc Hà',
        role: 'Head of Marketing',
        avatar: 'https://i.pravatar.cc/120?img=9',
    },
]
</script>

<template>
    <div class="ph-page about-page">
        <div class="ph-hero about-hero">
            <div class="ph-hero__overlay about-hero__overlay" />
            <div class="ph-hero__content ph-fade-in-up">
                <div class="ph-hero__badge">🚀 Về chúng tôi</div>
                <h1 class="ph-hero__title">
                    Kết Nối Nhân Tài —<br />Mở Ra Cơ Hội
                </h1>
                <p class="ph-hero__subtitle">
                    Khởi nguồn từ sứ mệnh kết nối những nhân tài xuất chúng với
                    các cơ hội nghề nghiệp tốt nhất, chúng tôi nỗ lực mỗi ngày
                    để rút ngắn khoảng cách giữa nhà tuyển dụng và ứng viên.
                </p>
                <div class="ph-hero__stats">
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">10K+</span>
                        <span class="ph-stat-item__label">Ứng viên</span>
                    </div>
                    <div class="ph-stat-divider" />
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">500+</span>
                        <span class="ph-stat-item__label">Doanh nghiệp</span>
                    </div>
                    <div class="ph-stat-divider" />
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">98%</span>
                        <span class="ph-stat-item__label">Hài lòng</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="ph-container ph-section">
            <a-row :gutter="[48, 48]" align="middle">
                <a-col :xs="24" :md="12">
                    <div class="image-wrapper ph-fade-in-left">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Our Mission"
                        />
                        <div class="overlay-box">
                            <h3 class="overlay-title">🎯 Tầm Nhìn 2030</h3>
                            <p>
                                Trở thành nền tảng tuyển dụng số 1 Đông Nam Á
                                với hơn 10 triệu người dùng tin tưởng.
                            </p>
                        </div>
                    </div>
                </a-col>
                <a-col :xs="24" :md="12">
                    <div class="ph-fade-in-right">
                        <h2 class="ph-section-title">Sứ Mệnh Của Chúng Tôi</h2>
                        <p class="ph-section-desc">
                            Chúng tôi tin rằng mọi cá nhân đều xứng đáng có một
                            môi trường làm việc phù hợp để phát huy tối đa tiềm
                            năng. Nhiệm vụ của chúng tôi là tạo ra một hệ sinh
                            thái tuyển dụng minh bạch, nhanh chóng và thực sự
                            hiệu quả.
                        </p>
                        <div class="checklist">
                            <div
                                class="checklist-item"
                                v-for="item in [
                                    'Kết nối đúng người, đúng việc',
                                    'Quy trình tuyển dụng nhanh & minh bạch',
                                    'Hỗ trợ ứng viên phát triển toàn diện',
                                    'Đồng hành cùng doanh nghiệp tăng trưởng',
                                ]"
                                :key="item"
                            >
                                <CheckCircleOutlined class="check-icon" />
                                {{ item }}
                            </div>
                        </div>
                        <a-row :gutter="[16, 16]" class="ph-mt-6">
                            <a-col :span="12">
                                <div class="feature-box">
                                    <div class="feature-icon">
                                        <BulbOutlined />
                                    </div>
                                    <h4>Sáng Tạo</h4>
                                    <p>
                                        Không ngừng đổi mới, ứng dụng công nghệ
                                        AI vào quy trình tuyển dụng.
                                    </p>
                                </div>
                            </a-col>
                            <a-col :span="12">
                                <div class="feature-box">
                                    <div class="feature-icon">
                                        <TeamOutlined />
                                    </div>
                                    <h4>Cộng Đồng</h4>
                                    <p>
                                        Xây dựng mạng lưới nghề nghiệp chất
                                        lượng toàn quốc.
                                    </p>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </a-col>
            </a-row>
        </div>

        <div class="stats-banner">
            <div class="ph-container">
                <a-row :gutter="[32, 32]" justify="center">
                    <a-col
                        :xs="12"
                        :sm="6"
                        v-for="stat in [
                            { num: '10,000+', label: 'Ứng viên đăng ký' },
                            { num: '500+', label: 'Doanh nghiệp đối tác' },
                            { num: '15,000+', label: 'Tin tuyển dụng' },
                            { num: '5+', label: 'Năm hoạt động' },
                        ]"
                        :key="stat.label"
                    >
                        <div class="stat-card ph-slide-up">
                            <div class="stat-card__num">{{ stat.num }}</div>
                            <div class="stat-card__label">{{ stat.label }}</div>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="ph-container ph-section">
            <div class="ph-text-center ph-mb-10">
                <div class="ph-section-badge">
                    <StarFilled /> Giá trị cốt lõi
                </div>
                <h2 class="ph-section-title--center">
                    Chúng Tôi Đề Cao Điều Gì?
                </h2>
                <p class="ph-section-subtitle">
                    Ba nền tảng tạo nên bản sắc và sự khác biệt của hệ thống
                    tuyển dụng chúng tôi.
                </p>
            </div>
            <a-row :gutter="[24, 24]">
                <a-col
                    :xs="24"
                    :sm="8"
                    v-for="(val, idx) in coreValues"
                    :key="idx"
                >
                    <div
                        class="value-card ph-slide-up"
                        :style="`animation-delay: ${idx * 0.15}s`"
                    >
                        <div class="value-icon-wrap" :class="`color-${idx}`">
                            <component :is="val.icon" />
                        </div>
                        <h3>{{ val.title }}</h3>
                        <p>{{ val.desc }}</p>
                    </div>
                </a-col>
            </a-row>
        </div>

        <div class="team-section">
            <div class="ph-container">
                <div class="ph-text-center ph-mb-10">
                    <div class="ph-section-badge"><TeamOutlined /> Đội ngũ</div>
                    <h2 class="ph-section-title--center">
                        Những Người Dẫn Dắt
                    </h2>
                    <p class="ph-section-subtitle">
                        Từ nhiều ngành nghề khác nhau, chúng tôi cùng chung một
                        mục tiêu: tạo ra sản phẩm tuyển dụng tốt nhất Việt Nam.
                    </p>
                </div>
                <a-row :gutter="[24, 24]" justify="center">
                    <a-col
                        :xs="24"
                        :sm="12"
                        :md="6"
                        v-for="(member, idx) in team"
                        :key="idx"
                    >
                        <div
                            class="member-card ph-slide-up"
                            :style="`animation-delay: ${idx * 0.1}s`"
                        >
                            <img
                                :src="member.avatar"
                                :alt="member.name"
                                class="member-card__avatar"
                            />
                            <h4 class="member-card__name">{{ member.name }}</h4>
                            <p class="member-card__role">{{ member.role }}</p>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="ph-dark-banner">
            <div class="ph-container ph-text-center">
                <h2 class="ph-dark-banner__title">
                    Sẵn Sàng Bắt Đầu Hành Trình?
                </h2>
                <p class="ph-dark-banner__subtitle">
                    Dù bạn là ứng viên hay nhà tuyển dụng, chúng tôi đều có giải
                    pháp phù hợp dành riêng cho bạn.
                </p>
                <div class="ph-dark-banner__actions">
                    <router-link to="/auth/register">
                        <a-button
                            type="primary"
                            size="large"
                            class="ph-btn-primary-lift cta-btn"
                            >Đăng ký ngay</a-button
                        >
                    </router-link>
                    <router-link to="/contact">
                        <a-button size="large" class="ph-btn-ghost-dark cta-btn"
                            >Liên hệ chúng tôi</a-button
                        >
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about-hero {
    background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    min-height: 520px;
}
.about-hero__overlay {
    background: linear-gradient(105deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 118, 110, 0.55) 45%, rgba(14, 165, 233, 0.35) 100%);
}

.image-wrapper {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
}
.image-wrapper img {
    width: 100%;
    height: 420px;
    object-fit: cover;
    display: block;
}
.overlay-box {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.96);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
}
.overlay-title {
    color: #0d9488;
    font-weight: 700;
    margin-bottom: 6px;
}

.checklist {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.checklist-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #374151;
    font-size: 0.97rem;
}
.check-icon {
    color: #52c41a;
    font-size: 18px;
    flex-shrink: 0;
}

.feature-box {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s;
}
.feature-box:hover {
    border-color: #0d9488;
    box-shadow: 0 6px 20px rgba(24, 144, 255, 0.1);
    transform: translateY(-4px);
}
.feature-icon {
    font-size: 28px;
    color: #0d9488;
    margin-bottom: 10px;
}
.feature-box h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 4px;
}
.feature-box p {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0;
}

.stats-banner {
    background: linear-gradient(105deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 118, 110, 0.55) 45%, rgba(14, 165, 233, 0.35) 100%);
    padding: 60px 0;
}
.stat-card {
    text-align: center;
    padding: 20px;
}
.stat-card__num {
    font-size: 2.8rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
}
.stat-card__label {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.75);
    margin-top: 8px;
}

.value-card {
    background: #fff;
    border-radius: 16px;
    padding: 32px 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
    text-align: center;
    transition: all 0.3s;
    height: 100%;
}
.value-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
.value-icon-wrap {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    margin: 0 auto 20px;
}
.color-0 {
    background: #e6f7ff;
    color: #0d9488;
}
.color-1 {
    background: #fff7e6;
    color: #fa8c16;
}
.color-2 {
    background: #f6ffed;
    color: #52c41a;
}
.value-card h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 12px;
}
.value-card p {
    color: #6b7280;
    line-height: 1.7;
    font-size: 0.95rem;
    margin: 0;
}

.team-section {
    background: #f9fafb;
    padding: 80px 0;
}
.member-card {
    background: #fff;
    border-radius: 16px;
    padding: 32px 20px;
    text-align: center;
    border: 1px solid #f0f0f0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    transition: all 0.3s;
}
.member-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.09);
}
.member-card__avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 16px;
    border: 3px solid #e6f7ff;
}
.member-card__name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 4px;
}
.member-card__role {
    font-size: 0.9rem;
    color: #0d9488;
    margin: 0;
}

.cta-btn {
    height: 52px;
    padding: 0 36px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
}
</style>
