<div align="center">
  <h1>🚀 Recruitment Home</h1>
  <p>Hệ thống Giao diện Lõi (Frontend) cho dự án Nền tảng Tuyển dụng & Giới thiệu việc làm</p>
</div>

<br />

## 📖 Giới thiệu (Overview)

**Recruitment Home** là giao diện người dùng chính (Frontend) của hệ thống nền tảng tuyển dụng. Dự án được xây dựng với mục tiêu mang lại trải nghiệm tương tác mượt mà, tốc độ phản hồi cực nhanh và cấu trúc mã nguồn dễ duy trì, mở rộng cho các đội ngũ phát triển.

Dự án áp dụng chặt chẽ các kiến trúc tiên tiến nhất của hệ sinh thái Vue 3, đáp ứng các tiêu chuẩn Single Page Application (SPA) cao cấp.

---

## 🛠 Ngăn xếp Công nghệ (Tech Stack)

Dự án sử dụng các công nghệ, thư viện lõi sau đây:

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) - Trình đóng gói siêu tốc.
- **UI Framework**: [Ant Design Vue 4.x](https://next.antdv.com/) - Hệ thống Component tiêu chuẩn doanh nghiệp.
- **State Management**: [Pinia](https://pinia.vuejs.org/) - Quản lý trạng thái thế hệ mới.
- **Định tuyến (Router)**: [Vue Router 4](https://router.vuejs.org/)
- **HTTP/Networking**: [Axios](https://axios-http.com/) - Xử lý API Requests.
- **Đa ngôn ngữ (i18n)**: [vue3-i18n](https://vue-i18n.intlify.dev/)
- **CSS Preprocessor**: SASS / SCSS
- **Coding Standards**: Prettier & ESLint

---

## 📂 Kiến trúc Thư mục (Project Structure)

```text
recruitment-home/
├── .agents/            # [Quan trọng] Chứa các quy tắc AI (Rules, Skills, Workflows)
├── public/             # Tài nguyên tĩnh không qua Vite build
├── src/
│   ├── api/            # Controller HTTP Request (Axios config & module APIs)
│   ├── assets/         # Tài nguyên tĩnh (Hình ảnh, SCSS toàn cục)
│   ├── components/     # Các UI Component có thể tái sử dụng (Global/Local)
│   ├── interface/      # Định nghĩa TypeScript Interfaces & Types
│   ├── lang/           # Tệp từ điển đa ngôn ngữ (i18n)
│   ├── libs/           # Các hàm tiện ích (Helpers/Composables)
│   ├── router/         # Khởi tạo định tuyến và Route guards
│   ├── stores/         # Pinia Setup Stores quản lý State
│   ├── views/          # Page Components (Layouts & Màn hình chính)
│   ├── App.vue         # Root component
│   └── main.ts         # Điểm vào chính, khởi tạo Vue App & Các Plugins
├── .env                # Biến môi trường
└── package.json        # File danh sách thư viện & scripts
```

---

## ⚙️ Hướng dẫn Khởi chạy (Getting Started)

### Yêu cầu hệ thống (Prerequisites)
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản 20.x trở lên)
- [NPM](https://www.npmjs.com/) (Hoặc Yarn, pnpm).

### Môi trường phát triển (Development)

1. **Cài đặt thư viện**
   ```sh
   npm install
   ```

2. **Cấu hình biến môi trường**
   - Copy file `.env.example` thành `.env` (nếu có).
   - Đảm bảo biến `VITE_PUBLIC_APP_API` trỏ đúng vào Backend (ví dụ: `http://localhost:3000`).

3. **Chạy server dev**
   ```sh
   npm run dev
   ```
   *Vite sẽ khởi chạy server ở địa chỉ `http://localhost:5173`.*

---

## 🧰 Các Lệnh Thường Dùng (Scripts)

| Lệnh | Mô tả |
| :--- | :--- |
| `npm run dev` | Khởi chạy môi trường Dev với tính năng Hot-Reload. |
| `npm run build` | Kiểm tra Types (Type-check) và đóng gói mã nguồn cho Production. |
| `npm run preview` | Khởi chạy server local để test thư mục `dist` sau khi build. |
| `npm run lint` | Chạy công cụ ESLint để cố gắng tự động fixed các lỗi cú pháp. |
| `npm run format` | Chạy Prettier để đồng bộ format code (Thụt lề, cấu trúc) thư mục `src/`. |

---

## 🤖 Hướng dẫn cho Lập trình viên & AI Agents

Dự án này sử dụng hệ thống AI `.agents` để hỗ trợ phát triển. Để AI hiểu đúng ngữ cảnh và code chính xác:

- Phải đọc qua mục **Quy Tắc Lập Trình** tại thư mục `.agents/rules.md`.
- Sử dụng các **Skills** (ví dụ viết Composition API, Pinia, Ant Design) tại `.agents/skills/`.
- Gọi các **Workflows** (tạo Component, tạo Page, map API) tại `.agents/workflows/`.
- Bạn có thể đọc `prompt_guide.md` trong `.agents` để tham khảo cách yêu cầu hệ thống AI code.

---

## 💡 IDE Khuyến Nghị
- Mở và code bằng [VSCode](https://code.visualstudio.com/).
- Bật tiện ích [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) để kích hoạt toàn bộ tính năng gợi ý Typescript thông minh.
- **Tắt** extension `Vetur` nếu trước đó bạn từng code Vue 2.
