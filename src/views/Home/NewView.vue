<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    CalendarOutlined,
    ArrowRightOutlined,
    FireOutlined,
    TagOutlined,
    EyeOutlined,
} from '@ant-design/icons-vue'

const selectedCategory = ref('Tất cả')
const categories = [
    'Tất cả',
    'Thị trường',
    'Mẹo ứng tuyển',
    'Kỹ năng',
    'Công nghệ',
    'Góc tư vấn',
    'Báo cáo',
]
const currentPage = ref(1)

const newsList = ref([
    {
        id: 1,
        title: 'Xu hướng tuyển dụng ngành IT nửa cuối năm 2026',
        date: '12/03/2026',
        description:
            'Ngành Công nghệ thông tin tiếp tục dẫn đầu về nhu cầu nhân sự với mức tăng trưởng 35% so với cùng kỳ. Khám phá các kỹ năng được săn đón nhất.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Thị trường',
        views: '4.2K',
        featured: true,
    },
    {
        id: 2,
        title: 'Bí kíp viết CV chinh phục nhà tuyển dụng khó tính nhất',
        date: '10/03/2026',
        description:
            'Một CV ấn tượng không chỉ liệt kê kinh nghiệm. Bạn cần những con số biết nói, định dạng ATS chuẩn và ngôn ngữ chuyên nghiệp.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Mẹo ứng tuyển',
        views: '6.8K',
        featured: false,
    },
    {
        id: 3,
        title: 'Kỹ năng mềm — Chìa khóa thăng tiến trong công việc',
        date: '08/03/2026',
        description:
            'Bên cạnh chuyên môn, kỹ năng mềm đặc biệt là EQ, lãnh đạo và giao tiếp ngày càng được các nhà tuyển dụng hàng đầu chú trọng.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Kỹ năng',
        views: '3.1K',
        featured: false,
    },
    {
        id: 4,
        title: 'Top 5 công cụ AI hỗ trợ đắc lực cho dân văn phòng 2026',
        date: '05/03/2026',
        description:
            '5 công cụ AI giúp bạn tự động hóa công việc và tăng gấp đôi năng suất mà không cần biết lập trình.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Công nghệ',
        views: '9.4K',
        featured: true,
    },
    {
        id: 5,
        title: 'Chuẩn bị thế nào cho buổi phỏng vấn trực tuyến hoàn hảo?',
        date: '02/03/2026',
        description:
            'Phỏng vấn online là xu hướng tất yếu. Cùng tìm hiểu cách setup ánh sáng, âm thanh và phong thái để tự tin 100% qua màn hình.',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Góc tư vấn',
        views: '5.6K',
        featured: false,
    },
    {
        id: 6,
        title: 'Báo cáo lương ngành Marketing tại Việt Nam 2026',
        date: '28/02/2026',
        description:
            'Báo cáo chi tiết mức lương, thưởng và đãi ngộ cho toàn bộ lộ trình thăng tiến ngành Marketing. Dữ liệu thực tế từ 500+ doanh nghiệp.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Báo cáo',
        views: '7.2K',
        featured: false,
    },
])

const featuredNews = computed(() => newsList.value.find((n) => n.featured))

const filteredNews = computed(() => {
    const excludeFeaturedId = featuredNews.value?.id
    return selectedCategory.value === 'Tất cả'
        ? newsList.value.filter((n) => n.id !== excludeFeaturedId)
        : newsList.value.filter(
              (n) =>
                  n.category === selectedCategory.value &&
                  n.id !== excludeFeaturedId
          )
})
</script>

<template>
    <div class="ph-page news-page">
        <div class="ph-hero news-hero">
            <div class="ph-hero__overlay news-hero__overlay" />
            <div class="ph-hero__content ph-fade-in-up">
                <div class="ph-hero__badge">
                    <FireOutlined /> Tin tức mới nhất
                </div>
                <h1 class="ph-hero__title">Góc Tin Tức & Sự Kiện</h1>
                <p class="ph-hero__subtitle">
                    Cập nhật nhanh nhất xu hướng thị trường lao động, bí quyết
                    nghề nghiệp và các sự kiện tuyển dụng hấp dẫn từ các thương
                    hiệu hàng đầu.
                </p>
            </div>
        </div>

        <div class="ph-container" v-if="featuredNews">
            <div class="featured ph-fade-in-up">
                <div class="featured__label">
                    <FireOutlined /> Bài viết nổi bật
                </div>
                <a-row :gutter="0" class="featured__card">
                    <a-col :xs="24" :lg="14" class="featured__img-col">
                        <img
                            :src="featuredNews.image"
                            :alt="featuredNews.title"
                            class="featured__img"
                        />
                    </a-col>
                    <a-col :xs="24" :lg="10" class="featured__body">
                        <span class="featured__cat ph-section-badge">{{
                            featuredNews.category
                        }}</span>
                        <h2 class="featured__title">
                            {{ featuredNews.title }}
                        </h2>
                        <p class="featured__desc">
                            {{ featuredNews.description }}
                        </p>
                        <div class="featured__meta">
                            <span
                                ><CalendarOutlined />
                                {{ featuredNews.date }}</span
                            >
                            <span
                                ><EyeOutlined /> {{ featuredNews.views }} lượt
                                xem</span
                            >
                        </div>
                        <a class="featured__btn">
                            Đọc bài viết
                            <ArrowRightOutlined class="featured__arrow" />
                        </a>
                    </a-col>
                </a-row>
            </div>
        </div>

        <div class="ph-container ph-section--sm">
            <div class="filter-bar">
                <div class="filter-bar__left">
                    <TagOutlined /> <span>Chủ đề:</span>
                </div>
                <div class="filter-bar__tags">
                    <span
                        v-for="cat in categories"
                        :key="cat"
                        class="filter-tag"
                        :class="{
                            'filter-tag--active': selectedCategory === cat,
                        }"
                        @click="selectedCategory = cat"
                        >{{ cat }}</span
                    >
                </div>
            </div>

            <a-row :gutter="[24, 32]" class="ph-mt-6">
                <a-col
                    v-for="(news, idx) in filteredNews"
                    :key="news.id"
                    :xs="24"
                    :sm="12"
                    :lg="8"
                >
                    <div
                        class="news-card ph-slide-up"
                        :style="`animation-delay:${idx * 0.1}s`"
                    >
                        <div class="news-card__img-wrap">
                            <img :src="news.image" :alt="news.title" />
                            <span class="news-card__cat">{{
                                news.category
                            }}</span>
                        </div>
                        <div class="news-card__body">
                            <div class="news-card__meta">
                                <span
                                    ><CalendarOutlined /> {{ news.date }}</span
                                >
                                <span><EyeOutlined /> {{ news.views }}</span>
                            </div>
                            <h3 class="news-card__title">{{ news.title }}</h3>
                            <p class="news-card__desc">
                                {{ news.description }}
                            </p>
                            <a class="news-card__readmore"
                                >Đọc tiếp <ArrowRightOutlined class="arrow"
                            /></a>
                        </div>
                    </div>
                </a-col>
                <a-col :span="24" v-if="filteredNews.length === 0">
                    <a-empty
                        description="Không có bài viết nào cho chủ đề này"
                    />
                </a-col>
            </a-row>

            <div class="pagination-wrap">
                <a-pagination
                    v-model:current="currentPage"
                    :total="50"
                    :pageSize="6"
                    show-less-items
                />
            </div>
        </div>

        <div class="ph-dark-banner">
            <div class="ph-container ph-text-center">
                <h2 class="ph-dark-banner__title">Đăng Ký Nhận Bản Tin</h2>
                <p class="ph-dark-banner__subtitle">
                    Nhận ngay các bài viết mới nhất và xu hướng thị trường tuyển
                    dụng được gửi thẳng vào hộp thư của bạn mỗi tuần.
                </p>
                <div class="ph-dark-banner__form">
                    <a-input
                        size="large"
                        placeholder="Nhập địa chỉ email của bạn..."
                        class="nl-input"
                    />
                    <a-button type="primary" size="large" class="nl-btn"
                        >Đăng ký ngay</a-button
                    >
                </div>
                <p class="ph-dark-banner__note">
                    🔒 Chúng tôi tôn trọng quyền riêng tư. Bạn có thể hủy đăng
                    ký bất cứ lúc nào.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.news-hero {
    background-image: url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    min-height: 380px;
}
.news-hero__overlay {
    background: linear-gradient(
        135deg,
        rgba(0, 21, 41, 0.85),
        rgba(24, 144, 255, 0.65)
    );
}

.featured {
    padding: 48px 0 0;
}
.featured__label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #fa8c16;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
}
.featured__card {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
    background: #fff;
}
.featured__img-col {
    overflow: hidden;
}
.featured__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.5s;
}
.featured__card:hover .featured__img {
    transform: scale(1.03);
}
.featured__body {
    padding: 40px 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.featured__cat {
    margin-bottom: 16px;
    align-self: flex-start;
}

.featured__title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 12px;
    line-height: 1.35;
}
.featured__desc {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 20px;
}
.featured__meta {
    display: flex;
    gap: 20px;
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 24px;
}

.featured__btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #1890ff;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s;
    width: fit-content;
    text-decoration: none;

    &:hover {
        background: #40a9ff;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(24, 144, 255, 0.35);
        color: #fff;
    }
}
.featured__arrow {
    transition: transform 0.2s;
}
.featured__btn:hover .featured__arrow {
    transform: translateX(5px);
}

.filter-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    flex-wrap: wrap;
}
.filter-bar__left {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #374151;
    font-weight: 600;
}
.filter-bar__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.filter-tag {
    display: inline-block;
    cursor: pointer;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    color: #374151;
    transition: all 0.2s;
    user-select: none;

    &:hover {
        border-color: #1890ff;
        color: #1890ff;
        transform: translateY(-1px);
    }

    &--active {
        background: #1890ff;
        border-color: #1890ff;
        color: #fff;

        &:hover {
            color: #fff;
        }
    }
}

.news-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    height: 100%;
}
.news-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.news-card__img-wrap {
    position: relative;
    height: 210px;
    overflow: hidden;
}
.news-card__img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
    display: block;
}
.news-card:hover .news-card__img-wrap img {
    transform: scale(1.07);
}
.news-card__cat {
    position: absolute;
    bottom: 12px;
    left: 12px;
    background: rgba(24, 144, 255, 0.9);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 3px 12px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
    letter-spacing: 0.3px;
}

.news-card__body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.news-card__meta {
    display: flex;
    justify-content: space-between;
    color: #9ca3af;
    font-size: 0.85rem;
    margin-bottom: 12px;
}
.news-card__title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 10px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.news-card__desc {
    color: #4b5563;
    line-height: 1.6;
    font-size: 0.9rem;
    flex-grow: 1;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.news-card__readmore {
    color: #1890ff;
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: gap 0.2s;
}
.news-card:hover .news-card__readmore {
    gap: 10px;
}
.arrow {
    transition: transform 0.2s;
}
.news-card:hover .arrow {
    transform: translateX(4px);
}

.pagination-wrap {
    margin-top: 48px;
    display: flex;
    justify-content: center;
}

.nl-input {
    border-radius: 8px;
    flex: 1;
    min-width: 240px;
}
.nl-btn {
    border-radius: 8px;
    font-weight: 600;
    white-space: nowrap;
}
</style>
