# Trà Sâm Trường Nhân

Website bán Trà Sâm Ngọc Linh dùng Next.js App Router, TypeScript và Tailwind. Trang chủ giới thiệu sản phẩm và mascot, blog có metadata và JSON-LD. Giỏ hàng dùng Zustand, API xác nhận đơn sau khi Google Sheets ghi nhận và khu vực `/admin` dùng để xử lý đơn.

- [Thiết lập Google Sheets, admin và hosting 0đ](docs/production-setup.md)
- [Design system](docs/design-system.md)
- [Báo cáo nâng cấp UI/UX](docs/ui-audit/final-report.md)

## Chạy và kiểm tra

```sh
npm run dev
npm run lint -- src
npm run build
npm run start
```

Trang chủ ở `http://localhost:3000/`, quản trị ở `http://localhost:3000/admin`. Dùng hướng dẫn thiết lập để kết nối kho đơn và tạo mật khẩu quản trị. Các biến tích hợp nên được thiết lập trong môi trường chạy hoặc dashboard hosting.

## Nội dung

- `src/data/products.ts` chứa danh mục combo và giá. Máy chủ tính tổng theo danh mục này.
- `src/data/mascots.ts` chứa nhân vật và nội dung quiz.
- `src/data/blogPosts.ts` chứa nội dung blog và metadata.
- `integrations/google-sheets/Code.gs` là Apps Script lưu, đọc và cập nhật trạng thái đơn.
