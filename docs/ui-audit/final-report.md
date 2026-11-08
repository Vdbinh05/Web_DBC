# Tổng kết nâng cấp UI/UX · Trà Sâm Trường Nhân

**GĐ0–4 · 08/11/2026**

## Hướng thiết kế

**Từ vùng sâm đến tách trà.** Ảnh bao bì và ảnh vườn trồng trích từ hồ sơ Trường Nhân giúp người đọc nhận ra sản phẩm và ngữ cảnh nguồn gốc. Dải chú thích có vạch vàng nối các hình ảnh với cách pha và hồ sơ. Fraunces tạo điểm nhấn ở tiêu đề, Be Vietnam Pro phục vụ nội dung và thao tác. Nền kem, giấy và xanh lá đậm tạo phân cấp giữa phần đọc, thông tin sản phẩm và nút mua. Ba mascot xuất hiện tập trung ở phần chọn nhân vật và quiz.

[Xem audit và hướng thiết kế GĐ0](ui-audit-and-direction.md) · [Xem design system](../design-system.md)

## Ảnh trước và sau

Chrome chạy ở cùng kích thước viewport cho hai bộ ảnh. Bộ trước chụp từ dev server. Bộ sau chụp từ bản build production qua Chrome DevTools Protocol vì cổng 3000 không có server lắng nghe. Kiểm thử đã phát lại HTML, tài nguyên build và ảnh trong phiên trình duyệt riêng.

| Kích thước | Màn hình đầu trước | Màn hình đầu sau | Toàn trang trước | Toàn trang sau |
| --- | --- | --- | --- | --- |
| 375 × 812 | [Trước](before/home-375-viewport.png) | [Sau](after/home-375-viewport.png) | [12.425 px](before/home-375-full.png) | [10.768 px](after/home-375-full.png) |
| 768 × 1024 | [Trước](before/home-768-viewport.png) | [Sau](after/home-768-viewport.png) | [11.046 px](before/home-768-full.png) | [7.570 px](after/home-768-full.png) |
| 1440 × 1000 | [Trước](before/home-1440-viewport.png) | [Sau](after/home-1440-viewport.png) | [7.071 px](before/home-1440-full.png) | [6.182 px](after/home-1440-full.png) |

Trạng thái ở 375 px: [blog](after/blog-375-viewport.png), [giỏ rỗng](after/cart-empty-375.png), [lỗi form](after/checkout-invalid-375.png), [xác nhận đơn demo](after/checkout-success-demo-375.png), [modal hồ sơ](after/certificate-375.png), [chatbot](after/chat-375.png), [VietQR với dữ liệu thử](after/vietqr-test-375.png).

## Đối chiếu với audit

| Vấn đề | Trước | Sau |
| --- | --- | --- |
| Hero và thứ tự đọc | Tiêu đề và slogan cùng sức nặng. Ở 375 px, nút chính bắt đầu tại y=569 và ảnh nằm dưới màn hình đầu. | Tên trà là H1, slogan có cấp chữ riêng. Nút “Xem các combo” bắt đầu tại y=394 và ảnh bao bì xuất hiện trong màn hình đầu. Ở 768 px, nút dịch từ y=618 lên y=500. Ở 1440 px, từ y=659 lên y=440. |
| Navbar và vùng chạm | Menu desktop ở 768 px xuống nhiều dòng. Nút menu ở 375 px là 42×42 px, nút giỏ cao 38 px. | Menu thu gọn ở 768 px. Nút mở menu và nút giỏ cao tối thiểu 44 px. Chọn liên kết neo đưa focus đến section. |
| Kiểu chữ và tương phản | Màu heading toàn cục ghi đè utility. Tiêu đề OCOP đo được 1,92:1. | Phân cấp chữ dùng thang fluid. Tiêu đề OCOP trên nền giấy đo được 8,60:1. |
| Khối nội dung và hiệu ứng | Các thẻ bo lớn, bóng, ảnh mascot ở hero và marquee cùng cạnh tranh chú ý. Một số badge đặt chồng lên hình hoặc thẻ. | Ảnh bao bì và vườn trồng có chú thích. Mascot dùng một khung chọn. Đánh giá đọc tĩnh với nhãn demo. Giá combo cùng hàng được căn theo trục và badge nằm trong luồng bố cục. |
| Hồ sơ chứng nhận | Ảnh mô phỏng dạng giấy mang nhãn chứng thực. Navbar và chat đè lên modal ở 375 px. | Modal native có hai trích đoạn đúng tên sản phẩm. Mục OCOP và chỉ dẫn địa lý có trạng thái chờ ảnh bản cấp. Modal hiển thị phía trên Navbar và chatbot. |
| Giỏ và đặt hàng | Tab thoát khỏi drawer. Lỗi form hiện bằng mắt nhưng trường nhập thiếu label liên kết và mô tả lỗi. | Tab tuần hoàn trong drawer. Các trường có label, trạng thái lỗi và mô tả liên kết. Khi gửi lỗi, giỏ giữ dữ liệu và cho thử lại. |
| VietQR | Thông báo demo xuất hiện cho cả trường hợp chưa cấu hình và chưa nhập số. URL PNG có thể chuyển hướng sang SVG và bị bộ tối ưu ảnh từ chối. | Hai trạng thái có hướng dẫn riêng. Ảnh QR tải trực tiếp từ nhà cung cấp khi đủ cấu hình và số điện thoại hợp lệ. |
| Chat và blog | Esc chưa đóng chat. Bài viết mang nhiều lớp bóng và thẻ. | Esc đóng chat và trả focus về nút mở. Có trạng thái đang trả lời và thử lại. Blog dùng một cột đọc, tiêu đề theo cấp và lối bỏ qua điều hướng. |
| Chuyển động | Parallax, marquee, nhịp nhấp nháy và hiệu ứng khi thành công xuất hiện ở nhiều nơi. | Phản hồi nút và mở dialog dùng transform/opacity. Lenis tắt khi chuyển sang tùy chọn giảm chuyển động. |

## Kiểm thử GĐ4

| Hạng mục | Kết quả | Bằng chứng |
| --- | --- | --- |
| Tràn ngang và giao nhau | Đạt trong các viewport thử | `scrollWidth / innerWidth` lần lượt **365/375**, **758/768**, **1430/1440**. Kiểm tra giao nhau bằng hình chữ nhật chữ trong `main` và thẻ combo, kết hợp đọc ảnh. |
| Navbar và bài viết bằng bàn phím | Đạt trong luồng thử | Tab tới liên kết bỏ qua điều hướng, Enter tới `main`. Menu mở bằng Enter, Esc đóng và trả focus. Chọn combo từ menu đưa focus đến section. Hai bài blog đều được mở trong Chrome. |
| Giỏ, modal và chatbot bằng bàn phím | Đạt trong luồng thử | Tab/Shift+Tab tuần hoàn trong drawer, Esc đóng và trả focus. Modal mở từ nút hồ sơ, chuyển mục và đóng bằng phím. Chatbot nhận phím Enter, đóng bằng Esc và trả focus. |
| Giỏ rỗng, lỗi form và gửi lại | Đạt | Giỏ rỗng dẫn tới combo. Form trống báo ba lỗi và đưa focus về họ tên. Thử phản hồi HTTP 503 mô phỏng, giữ dữ liệu và gửi lại. Đã thử gửi hai lần khi đang xử lý và thêm sản phẩm trong lúc chờ đơn. |
| Đơn demo | Đạt | Browser gọi handler thật của bản build trong môi trường kiểm thử cô lập. API trả `200`, `mode: demo`, mã đơn và tổng **349.000 ₫**. Handler trả `400` khi gửi số điện thoại sai. |
| VietQR | Đạt với cấu hình thử | Đã kiểm trạng thái chưa cấu hình và chờ số điện thoại. Bản build dùng tài khoản và điện thoại giả lập tải ảnh SVG **540 × 640** trực tiếp từ VietQR trong Chrome. Ảnh hiện đúng số tiền **349.000 ₫**. Sau phép thử đã build lại với cấu hình mặc định của workspace. |
| Chatbot | Đạt trong luồng thử | Đã kiểm nút gửi disabled khi rỗng, đang trả lời, lỗi mô phỏng và thử lại. Handler thật trả `smart_fallback` trong phiên kiểm thử. Làm mới cuộc trò chuyện khi có yêu cầu đang chờ loại bỏ phản hồi cũ. |
| Ảnh, font và reduced motion | Đạt trong phạm vi thử | Ảnh hero tải với preload, có khung tỷ lệ và trạng thái lỗi đã thử. Fraunces và Be Vietnam Pro có subset tiếng Việt và `font-display: swap` trong CSS build. Chrome xác nhận Lenis và animation dialog tắt khi bật reduced motion. |
| Tương phản | Đạt với các cặp đo | Chữ chính/kem **14,49:1**, CTA trắng/xanh **9,86:1**, chữ phụ/giấy **5,36:1**, tiêu đề OCOP/giấy **8,60:1**, Footer trắng/xanh **9,86:1**. |
| `npm run build` | Đạt | Next.js 16.4.5 build, chạy TypeScript và sinh hai bài blog. |
| `npm run lint -- src` | Đạt | ESLint qua trên thư mục mã nguồn ứng dụng. |
| `npm run lint` | Không đạt | **15 lỗi và 189 cảnh báo** khi quét cả repo. Các lỗi `no-require-imports` ở script có sẵn trong `.agents/skills/brand` và `.agents/skills/design-system`. |
| Suite test hiện có | Chưa có | Dự án chưa khai báo script test và chưa tìm thấy suite test ứng dụng. Các bước trên dùng Chrome và handler thật hoặc phản hồi mô phỏng theo từng trường hợp. |
| Lighthouse | Chưa kiểm được | Workspace không có Lighthouse CLI và localhost không phục vụ HTTP trong phiên kiểm thử. |
| Tích hợp live | Chưa kiểm | Phép thử VietQR dùng dữ liệu ngân hàng giả lập. Các kênh gửi thông báo đơn hàng, Gemini trực tiếp, phát video đã cấu hình và thiết bị thật nằm ngoài kết quả đo của phiên này. |

## Tệp đã sửa và tạo

- Sửa giao diện ứng dụng trong `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx` và `src/app/blog/[slug]/page.tsx`.
- Sửa `Navbar.tsx`, `Footer.tsx`, `SmoothScroll.tsx` trong `src/components/layout/`.
- Sửa `HeroSection.tsx`, `MascotStoryTabs.tsx`, `BentoUSP.tsx`, `SocialProof.tsx`, `ComboOffer.tsx` trong `src/components/sections/`.
- Sửa `CartDrawer.tsx`, `SamAIChatbot.tsx`, `CertificateModal.tsx` trong `src/components/features/`.
- Sửa `Section.tsx` và `SectionHeader.tsx`. Tạo `Badge.tsx`, `Button.tsx`, `Card.tsx`, `Dialog.tsx`, `Field.tsx`, `MediaImage.tsx` và `SkipLink.tsx` trong `src/components/ui/`.
- Tạo năm ảnh trong `src/components/ui/media/`: `tea-package.webp`, `ngoc-linh-farm.webp`, `truong-nhan-mark.webp`, `tea-self-declaration.webp`, `tea-test-report.webp`.
- Tạo `docs/design-system.md`, `docs/ui-audit/ui-audit-and-direction.md`, báo cáo này, 11 ảnh `before` và 13 ảnh `after`.

## Các điểm cần xử lý tiếp

- Bổ sung bản cấp OCOP 4 sao và chỉ dẫn địa lý đúng sản phẩm trước khi thay trạng thái chờ bằng ảnh chứng nhận. Hai tài liệu đã chèn là bản tự công bố và kết quả thử nghiệm theo mẫu ghi trên phiếu.
- Đối chiếu hướng dẫn lượng nước pha giữa hai bài blog, chatbot và hồ sơ. Nội dung hiện ghi các lượng khác nhau từ 200 đến 300 ml.
- Rà nhánh `fallback_success` trong API đặt hàng. API vẫn báo thành công khi các kênh thông báo được cấu hình đều thất bại.
- Xử lý phạm vi quét lint của các script skill và đo Lighthouse khi có môi trường HTTP để đo.
