# Design system · Trà Sâm Trường Nhân

Hướng **Từ vùng sâm đến tách trà** dùng nền kem, xanh lá đậm và vàng làm điểm nhấn. Dải chú thích dưới ảnh giúp nhận diện bao bì, vùng trồng và tài liệu. Dùng mặt phẳng có đường viền cho nội dung đọc và thẻ so sánh, dành bóng rõ nhất cho lớp nổi.

## Token

Khai báo trong `src/app/globals.css` và dùng qua utility Tailwind 4. Các tên `sam-*` gốc làm nền cho token ngữ nghĩa bên dưới.

Trang chủ dùng `sam-container` để căn chung lề, `sam-anchor` để neo tránh Navbar và `sam-caption` để ghi chú ảnh. Ảnh dùng chung nằm cạnh component trong `src/components/ui/media/`. Ảnh bao bì, ảnh vườn trồng và dấu hiệu Trường Nhân lần lượt trích từ trang 10, 12 và 6 của profile thương hiệu gửi kèm.

| Vai trò | Token | Giá trị hoặc cách dùng |
| --- | --- | --- |
| Nền và bề mặt | `sam-canvas`, `sam-paper`, `sam-surface` | Kem `#FAF7F0`, giấy `#F3EFE6`, trắng `#FFFFFF` |
| Chữ | `sam-ink`, `sam-muted` | Nâu `#2C221E`, xanh xám `#5D6454` |
| Thương hiệu | `sam-action`, `sam-yellow` | Xanh lá đậm `#1B4D20`, vàng `#F4D03F` |
| Trạng thái nút chính | `sam-on-action`, `sam-action-hover`, `sam-action-active` | Chữ trắng, nền hover `#24572A`, nền nhấn `#102E13` |
| Vô hiệu hóa | `sam-disabled`, `sam-on-disabled` | Nền `#E7E5DB`, chữ xanh xám |
| Viền | `sam-line`, `sam-control-line` | Viền nhẹ cho nhóm nội dung, viền đậm hơn cho ô nhập và nút phụ |
| Ngữ nghĩa | `sam-success`, `sam-warning`, `sam-error`, `sam-info` | Chữ hoặc icon. Dùng với token cùng tên có hậu tố `-bg` khi cần nền. Kèm chữ mô tả trạng thái. |
| Khoảng cách | Đơn vị Tailwind 4 px | Lề 16/24/40 px, section 64/96 px, vùng chạm tối thiểu 44 px |
| Bo và bóng | `rounded-sam-sm/md/lg`, `shadow-sam-raised`, `shadow-sam-overlay` | Bo 8/12/16 px. Bề mặt thông thường dùng viền. Hai mức bóng dùng cho phần tử nổi. |
| Thứ tự lớp | `--sam-z-background/content/floating/overlay` | 0/10/40/50. Drawer và modal đưa vào top layer bằng `showModal()`. |
| Chuyển động | `--sam-duration-feedback`, `--sam-duration-overlay`, `ease-sam-out` | 160/260 ms. Phản hồi nút dùng transform, mở lớp nổi dùng transform và opacity. Đóng phản hồi tức thì. Tắt động tác này khi giảm chuyển động. |

Tương phản tính từ màu phẳng. Mực/kem **14,49:1**, chữ phụ/kem **5,75:1**, chữ phụ/giấy **5,36:1**, xanh/vàng **6,55:1**. Nút chính mặc định, hover và active lần lượt **9,86:1**, **8,50:1**, **14,77:1**. Chữ trạng thái trên nền tương ứng đạt từ **6,67:1**. Viền control/trắng đạt **3,55:1**. Dùng `sam-focus` trên nền sáng và đặt `--sam-focus-ring` về vàng khi đặt control trên nền xanh đậm.

## Chữ

- `font-heading` dùng Fraunces. Tiêu đề chính `text-sam-display` 34–60 px, leading 1,18. Tiêu đề section `text-sam-heading` 26–40 px, leading 1,2. Tiêu đề nhỏ `text-sam-subheading` 20–26 px, leading 1,25.
- `font-sans` dùng Be Vietnam Pro. Body `text-sam-body` 16–18 px, leading 1,6. Nhãn `text-sam-label` 14 px, leading 1,5. Cả hai họ dùng `next/font`, preload tiếng Việt và Latin, với `display: 'swap'`.
- Khi qua `cn()`, dùng cú pháp ghi rõ kiểu và leading, ví dụ `text-(length:--text-sam-body)/(--text-sam-body--line-height)`. Cách này giúp `tailwind-merge` phân biệt utility cỡ chữ tùy chỉnh với màu chữ.

## Component

| Component | Cách dùng |
| --- | --- |
| `Button` | `primary` cho hành động chính, `secondary` cho hành động phụ, `ghost` cho hành động nhẹ. Chọn `sm/md/lg`. Dùng `loading` và `loadingText` khi gửi. Đặt `type="submit"` cho nút gửi, thêm tên cho nút chỉ có icon. |
| `Card` và `Badge` | `Card as="article"` cho một nội dung độc lập. `Badge tone` dùng cho nhãn ngắn có ý nghĩa. |
| `Input`, `Textarea`, `Select` | Import từ `ui/Field`. Truyền `label`, `name` và `hint` khi cần. Truyền `error` để nối lỗi với ô nhập và thông báo qua vùng live. Dùng `autoComplete` phù hợp trường dữ liệu. |
| `Section`, `SectionHeader` | Dùng `aria-labelledby` khớp với `titleId`; `align="start"` cho tiêu đề căn trái. Dùng heading theo cấp và chú thích gần nội dung liên quan. |
| `MediaImage` | Dùng trong khung ảnh có tỷ lệ, kèm `sizes` và alt. Dùng `preload` cho ảnh chính của hero. Khung giữ tỷ lệ khi ảnh tải lỗi. |
| `Dialog` | Dùng `variant="modal"` hoặc `variant="drawer"`, truyền `open`, `onClose` và `title`. Dùng `footer` cho tổng tiền và nút xác nhận cần nằm ngoài vùng cuộn. Trình duyệt đưa focus vào lớp nổi và chặn tương tác nền. Esc, nút đóng và bấm nền gọi `onClose`; cập nhật `open` trong component gọi. |

Modal hồ sơ dùng hai ảnh trích từ trang 1 của `TCB.pdf` và `PKN.pdf` trong ZIP do người dùng gửi. Chú thích nêu loại tài liệu, phạm vi trích và lối mở ảnh cỡ đầy đủ. Các mục OCOP và chỉ dẫn địa lý có trạng thái chờ ảnh bản cấp riêng.

```tsx
<Section aria-labelledby="delivery-heading">
  <SectionHeader titleId="delivery-heading" title="Thông tin giao hàng" align="start" />
  <Card>
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input name="phone" type="tel" autoComplete="tel" label="Số điện thoại" required />
      <Button type="submit" loading={isSubmitting} loadingText="Đang gửi…">
        Xác nhận đặt hàng
      </Button>
    </form>
  </Card>
</Section>
```
