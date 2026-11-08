# UI Audit & Direction

**Trà Sâm Trường Nhân · GĐ0 · 08/11/2026**

## Hiện trạng trên trình duyệt

Ảnh chụp từ site local bằng Chrome Headless qua DevTools Protocol, với viewport CSS ở tỉ lệ 1×. Ảnh toàn trang được chụp sau khi cuộn qua các section để nạp ảnh bên dưới.

| Viewport | Màn hình đầu | Toàn trang | `scrollWidth / innerWidth` |
| --- | --- | --- | --- |
| 375 × 812 | [Ảnh](before/home-375-viewport.png) | [Ảnh](before/home-375-full.png) | 365 / 375 |
| 768 × 1024 | [Ảnh](before/home-768-viewport.png) | [Ảnh](before/home-768-full.png) | 767 / 768 |
| 1440 × 1000 | [Ảnh](before/home-1440-viewport.png) | [Ảnh](before/home-1440-full.png) | 1430 / 1440 |

Trạng thái bổ sung ở 375 px: [giỏ rỗng](before/cart-empty-375.png), [form có lỗi](before/checkout-invalid-375.png), [hồ sơ](before/certificate-375.png), [chat](before/chat-375.png), [bài blog](before/blog-375-viewport.png). Các số đo trang chủ không phát hiện cuộn ngang. Một số chữ vẫn bị cắt bên trong phần tử, nên số đo này chưa đủ để kết luận về chồng lấn hoặc tràn nội dung.

## Người dùng và luồng

`src/app/page.tsx` ghép Navbar, hero, mascot và quiz, nguồn gốc và hồ sơ, đánh giá và video, combo, Footer. `src/app/blog/[slug]/page.tsx` là trang đọc. `src/components/features/` chứa giỏ, chat và modal chứng nhận. `src/components/ui/` có Section và SectionHeader để làm nền cho GĐ1. Zustand giữ giỏ. Form và chat lần lượt gọi `/api/order` và `/api/chat`.

**Vào trang → hiểu trà → chọn combo → xem giỏ → điền giao hàng và chọn thanh toán → xác nhận.** Mascot, quiz, hồ sơ, chat và blog là các điểm tham khảo trong luồng này. Nhu cầu dưới đây là giả thuyết từ brief và nội dung hiện có.

| Nhóm | Câu hỏi ưu tiên | Điểm phục vụ |
| --- | --- | --- |
| Gen Z, sinh viên | Trà này là gì, combo nào hợp nhu cầu và ngân sách? | Tên trà dễ thấy, combo có giá và thành phần đi kèm dễ so sánh, quiz dễ tìm. |
| Dân văn phòng | Pha có nhanh không, mua và giao thế nào? | Thông tin pha 3 phút, lối tắt tới combo, tổng tiền và thanh toán rõ. |
| Người quan tâm sức khỏe | Nguồn gốc và hồ sơ của đúng sản phẩm ở đâu? | Chú thích tài liệu có phạm vi rõ, thông tin hỗ trợ và disclaimer dễ đọc. |

## Bảng vấn đề

**Cao** ảnh hưởng trực tiếp đến thao tác, khả năng đọc hoặc độ tin cậy. **Vừa** gây nhầm lẫn hay tốn thời gian. **Thấp** chủ yếu ảnh hưởng nhịp đọc và tính nhất quán.

| Vấn đề | Vị trí | Mức độ | Cách sửa |
| --- | --- | --- | --- |
| **Thứ tự chú ý ở hero.** H1 được nhìn thấy trước. CTA vàng đã dễ thấy ở cả ba cỡ, nhưng ở desktop có ba CTA trong cùng khung và ảnh chính là mascot. Ở 375 px, khung ảnh xuống dưới màn hình đầu. | `HeroSection.tsx:30, 59, 125` · ảnh viewport | Vừa | Dồn trọng tâm thị giác vào tên trà, hình bao bì đúng sản phẩm và một nút chính “Xem các combo”. Đưa hành động mascot về link phụ, hợp nhất các lối tới combo trong hero. |
| **Chữ và khoảng trống.** H1 thực tế là 36/41,4 px, 48/55,2 px, 60/69 px. Leading 1,15 đạt mốc brief, nhưng cụm slogan chiếm nhiều dòng và cùng sức nặng với tên trà. Ở 375 px, 5/6 nhãn thông tin dưới CTA bị cắt, ví dụ “Chuẩn OCOP” cần 88 px trong ô 57 px. | `HeroSection.tsx:40, 76–116` · đo DOM | Vừa | Dùng thang `clamp()`, phân cấp tên trà và câu đi kèm bằng cỡ và độ đậm. Cho nhóm thông tin tự xuống dòng, giảm mật độ nhãn 9–11 px. |
| **Màu chữ bị ghi đè.** H3 “Đạt Chuẩn OCOP 4 Sao” render xanh đậm `#1B4D20` trên xanh `#2E7D32`, tương phản **1,92:1**, dưới mốc 3:1 cho chữ lớn. Rule heading ngoài layer ghi đè utility màu. Tiêu đề khung chat cũng tối trên nền xanh trong ảnh 375 px. | `globals.css:45`, `BentoUSP.tsx:85, 96`, `SamAIChatbot.tsx:168, 180` · computed style và ảnh | Cao | Đưa mặc định heading về lớp base và dùng token chữ trên nền tương ứng. Rà cả heading trên ảnh nguồn gốc, CTA bài viết và Footer. |
| **Navbar ở tablet chật.** Tại 768 px, thanh nav desktop rộng 503 px, cao 90 px. Tên thương hiệu và nhiều nhãn bị bẻ thành 2–3 dòng. Ở 375 px, nút menu 42×42 và giỏ 50×38, dưới chuẩn chạm 44×44 của brief. Trang chủ chưa có skip link. | `Navbar.tsx:35, 64, 88–111`, `page.tsx:17` · DOM và Tab | Vừa | Dùng menu thu gọn cho tới khi các nhãn vừa một hàng. Chuẩn hóa vùng chạm, trạng thái focus và neo cuộn. Thêm skip link tới `main`. |
| **Cảm giác mẫu dựng sẵn.** Quầng blur, nhiều lớp nền mờ, chip và bóng nổi tạo nhiều điểm nhấn cùng lúc. Khối mascot, khối lợi ích và combo lặp thẻ bo lớn. Có emoji trong chrome UI và nhiều nhãn viết hoa. Hero desktop hiện căn trái, dùng hai tông xanh cho chữ. | `HeroSection.tsx:23, 129–209`, `Navbar.tsx:64`, `MascotStoryTabs.tsx:160`, `BentoUSP.tsx:120`, `ComboOffer.tsx:86` · ảnh toàn trang | Vừa | Dùng ảnh, đường phân cách và căn lề làm cấu trúc chính. Giữ thẻ cho các combo cần so sánh. Dùng Lucide cho chrome UI, ưu tiên sentence case cho nhãn thao tác. |
| **Bố cục dễ đè khi chữ dài.** Hero có khung vuông chứa chữ và hai badge đặt tuyệt đối. Badge bán chạy của combo dùng `absolute -top-3.5`. Tại 375 px, CTA nhỏ trong khung hero chỉ cao 28 px. | `HeroSection.tsx:129, 141, 162, 207`, `ComboOffer.tsx:98` | Vừa | Đưa nhãn và CTA vào flow. Khung cố định tỉ lệ dành cho media. Canh các hàng giá và nút bằng grid/flex, chiều cao do nội dung quyết định. |
| **Ảnh đang được đọc như hồ sơ chính thức.** Cả ba WebP chứng nhận/vùng trồng có cùng khuôn đồ họa và dấu cách điệu. Tệp `farm-ngoc-linh.webp` hiện là hình dạng giấy, dù dùng cho khối vùng trồng. Modal gắn nhãn “Chứng Thực Nhà Nước” cho cả ba tab. | `BentoUSP.tsx:42–58`, `CertificateModal.tsx:13–52, 190–201` · ảnh nguồn | Cao | Tách ảnh vùng trồng, hồ sơ đúng sản phẩm và chứng nhận đơn vị. Dùng mục hồ sơ sẵn có với tên, đơn vị và phạm vi của từng ảnh đã xác minh. Xem đối chiếu bên dưới. |
| **Mascot và đánh giá.** Bấm được cả thẻ mascot nhưng việc chọn thẻ chưa có tương tác bàn phím tương đương ngay trên thẻ; các nút chọn ở trên là đường thao tác riêng. Review chạy hai hàng 35 giây lặp, chỉ tạm dừng khi hover. Nguồn đánh giá được gắn nhãn demo. | `MascotStoryTabs.tsx:130–173`, `SocialProof.tsx:65–93`, `globals.css:75–95` | Vừa | Dùng một tập nút chọn có trạng thái được thông báo; thẻ mô tả và nút mua có vai trò riêng. Cho review ở dạng đọc tĩnh với nhãn demo cạnh nội dung. |
| **Focus của giỏ và modal.** Enter trên nút giỏ mở drawer, nhưng focus vẫn ở nút mở. Tab chuyển sang nút menu phía sau. Esc đóng drawer. Modal hồ sơ đưa focus vào nút đóng, nhưng sau Esc focus về `BODY`. | `CartDrawer.tsx:53–80, 184`, `CertificateModal.tsx:63–100` · browser 375 | Cao | Dùng chung nền dialog cho hai luồng. Đặt focus ban đầu, giữ Tab trong dialog, phục hồi về đúng nút mở và quản lý scroll khi mở. |
| **Navbar và nút chat đè lên modal hồ sơ.** Ảnh 375 px cho thấy Navbar che một phần tiêu đề, còn nút chat nằm trên góc dưới của nội dung. Modal `z-50` nằm trong container `z-10`, nên cả container được xếp dưới Navbar và chat `z-40`. | `Section.tsx:24`, `BentoUSP.tsx:189–194`, `CertificateModal.tsx:109` · ảnh modal | Cao | Đặt modal ở lớp nổi cấp trang qua portal để z-index có hiệu lực. Xác minh toàn bộ đầu modal, nút đóng và vùng cuộn đều thao tác được ở 375 px. |
| **Form và QR.** Gửi form trống hiện đủ ba lỗi, nhưng bốn trường nhập đều có danh sách label rỗng trong DOM. Trường lỗi thiếu `aria-invalid` và liên kết mô tả. Chọn QR hiện thông báo demo, không có ảnh QR trong lần thử. Trạng thái tải, lỗi gửi và thành công có nhánh render. | `CartDrawer.tsx:94–169, 354–415, 453–524` · browser và code | Cao | Dùng label có liên kết, focus lỗi đầu, `aria-describedby` và vùng thông báo. Nói rõ QR chưa khả dụng trong cấu hình hiện tại, để lựa chọn COD dễ thấy. |
| **Chat.** Esc chưa đóng khung chat ở 375 px. Trường nhập dùng placeholder làm chỉ dẫn. Có lời chào, gợi ý, trạng thái đang gõ, phản hồi lỗi và nút gửi disabled khi trống hoặc đang tải. | `SamAIChatbot.tsx:83–119, 164–205, 223–302` · browser và code | Cao | Chốt hành vi panel theo cách sử dụng ở mỗi viewport, thêm Esc, trả focus, tên cho input và thông báo lịch sự cho trạng thái gửi. Giữ gợi ý hiện có dễ tiếp cận khi chat trống. |
| **Ảnh, chuyển động và màn hình đọc.** Ảnh bìa blog tải ở 375 px và có `sizes`. Chưa thấy giao diện thay thế khi lỗi ảnh ở các vị trí chính. CSS giảm motion chuyển scroll về `auto`; code có nhánh tắt Lenis lúc khởi tạo, nhưng vẫn cần kiểm tra riêng animation JS. Bài viết dùng bóng và thẻ giống landing page. | `HeroSection.tsx:125–190`, `SmoothScroll.tsx:28–43`, `globals.css:95–103`, `blog/[slug]/page.tsx:165–282` | Vừa | Dùng placeholder theo đúng tỷ lệ, ưu tiên media chính và lazy-load phần dưới. Kiểm tra `preload` của Next.js 16 cho ảnh hero. Cho bài viết một cột đọc, điều hướng liên quan nằm sau bài. |
| **Token và trạng thái.** `sam-*` đã có, nhưng màu gốc lặp giữa theme và CSS; bốn kiểu bóng tùy chỉnh cùng nhiều mức bo. Nhiều control dùng `transition-all`, focus theo từng nơi, kiểu disabled và loading thiếu chuẩn chung. | `globals.css:3–47`, `Navbar.tsx:69–111`, `CartDrawer.tsx:514–525` | Thấp | Chuẩn hóa token ngữ nghĩa và primitive. Gắn focus, hover, active và disabled vào từng variant; chỉ animate transform hoặc opacity. |

Đánh giá kỹ thuật theo thang 0–4 của Impeccable: accessibility **2**, performance **2**, theme **2**, responsive **2**, tính nhất quán triển khai **2**, tổng **10/20**. Đây là điểm định tính từ phạm vi audit. Detector tĩnh tìm thấy một viền nhấn bên trái ở `CartDrawer.tsx:192`. Các vấn đề chính trong bảng đến từ ảnh chụp, thao tác và đọc code. Trang có `lang="vi"`, landmark chính, giá theo định dạng tiền Việt, form đã có validation và phần nội dung có đường dẫn trực tiếp.

**Chưa kiểm ở GĐ0:** hoàn tất đơn hàng, QR khi đã cấu hình, phản hồi mạng của chat, phát video, kiểm tra bàn phím toàn bộ trang, thiết bị thật, Lighthouse, build/lint/test. Audit dùng giỏ rỗng và thêm combo trong phiên trình duyệt riêng; form trống dừng ở validation phía client. Số đo và ảnh là đường cơ sở cho GĐ4.

## Hướng duy nhất đề xuất · Từ vùng sâm đến tách trà

**Tinh thần.** Mở trang như khi mở một hộp trà. Tên và ảnh bao bì giúp nhận ra sản phẩm. Một dải chú thích mảnh bên dưới ảnh nối thông tin vùng sâm với túi lọc 3 phút. Dùng lại cùng cấu trúc chú thích bên dưới ảnh vùng trồng và khi xem hồ sơ để người đọc biết mình đang xem ảnh gì, của ai, thuộc phần nào của câu chuyện. Dải chú thích là dấu hiệu nhận diện xuyên suốt và mang thông tin thực ở mỗi chỗ.

**Bố cục.** Desktop đặt tên trà, mô tả hiện có và CTA combo bên trái, ảnh bao bì và dải chú thích bên phải. Mobile đọc theo thứ tự tên trà, mô tả, CTA, ảnh và chú thích. Gộp các thông tin ngắn về cách pha và nguồn gốc thành hàng linh hoạt, tự xuống dòng. Section mascot dùng cụm chọn và nội dung có trọng tâm. Nguồn gốc dùng ảnh có chú thích và lối mở hồ sơ. Combo dùng thẻ so sánh theo cùng trục ảnh, tên, giá và nút thêm. Bài blog dùng một cột đọc khoảng 60–70 ký tự mỗi dòng. Giỏ và chat ưu tiên thao tác và phản hồi trạng thái.

| Màu lõi | Hex | Vai trò |
| --- | --- | --- |
| Kem | `#FAF7F0` | Nền chính và nền đọc |
| Giấy | `#F3EFE6` | Bề mặt hồ sơ, nhãn, phân nhóm |
| Xanh lá đậm | `#1B4D20` | Tiêu đề, nút chính và focus ring trên nền sáng |
| Vàng | `#F4D03F` | Dấu nhỏ trên dải chú thích, điểm nhấn có chọn lọc |
| Nâu mực | `#2C221E` | Văn bản chính |
| Xanh xám | `#5D6454` | Chú thích và văn bản phụ |

Các cặp màu đề xuất đã tính từ màu phẳng: xanh đậm/kem **9,22:1**, xanh đậm/vàng **6,55:1**, nâu mực/kem **14,49:1**, xanh xám/kem **5,75:1**, xanh xám/giấy **5,36:1**. GĐ1 sẽ thêm màu ngữ nghĩa và kiểm các cặp màu theo trạng thái.

**Chữ.** Fraunces 500–650 cho tên trà và tiêu đề lớn, gợi chữ in trên hộp trà. Be Vietnam Pro 400–700 cho nội dung, điều hướng, giá và form, với dáng chữ quen thuộc trên giao diện hiện tại. Bản Next.js cài tại dự án khai báo subset `vietnamese` cho cả hai họ. GĐ1 kiểm font khi build với `display: "swap"` và thử mẫu “Trà Sâm Ngọc Linh · Trường Nhân”. Hướng thang chữ là body 16–18 px với leading 1,6, H2 26–40 px và H1 34–60 px với leading 1,16–1,2.

**Hình khối.** Lề 16 px ở mobile, 24 px ở tablet và 40 px ở desktop, theo nhịp 4/8 px. Ba mức bo dự kiến 8/12/16 px. Mặt giấy phẳng với đường viền mảnh cho nội dung thường. Đổ bóng nhẹ ở lớp nổi như drawer và modal để tách khỏi trang. Dải chú thích nằm trong flow với ảnh. Mỗi nhãn vừa phục vụ nhận diện tài liệu vừa giúp đọc nhanh.

**Mascot.** Sâm Tri Thức, Sâm Tự Nhiên và Sâm Dũng Sĩ dẫn qua các lựa chọn hiện có trong quiz và gợi ý combo. Ưu tiên một nhân vật đang được chọn trong mỗi cụm nội dung. Ở chat dùng một avatar để nhận ra Giáo Sư Sâm. Dành diện tích chính của hero cho bao bì đúng sản phẩm; ảnh nguồn gốc và giấy tờ giữ hình ảnh riêng.

**Chuyển động.** Hero và review đọc được ngay khi xuất hiện. Dùng khoảng 160 ms cho phản hồi thao tác và 260 ms cho mở/đóng lớp nổi, với transform/opacity và easing nhất quán. Tắt cuộn Lenis và motion trang trí khi hệ thống yêu cầu giảm chuyển động. Dấu chọn, thông báo và focus vẫn thể hiện trạng thái.

## Đặt ảnh hồ sơ ở đâu

Đã xem trang đầu của 14 PDF và rà đủ 20 trang profile. Đối chiếu dựa trên giấy tờ được cung cấp. Nội dung trong hồ sơ được dùng làm dữ liệu tham chiếu. Các đề xuất dưới đây chỉ chọn ảnh và vị trí cho giai đoạn triển khai.

| Tài liệu | Kết quả đối chiếu | Vị trí và cách dùng |
| --- | --- | --- |
| `TCB.pdf` và `PKN.pdf` | Bản tự công bố số 03/TRUONGNHAN/2026 và kết quả thử nghiệm Việt Tín đều ghi **Trà Sâm Trường Nhân**. Kết quả thử nghiệm áp dụng cho mẫu ghi trên phiếu. | Hai ảnh xem trước ưu tiên trong modal hồ sơ mở từ section nguồn gốc. Mỗi mục có tên tài liệu riêng; đọc bản rõ đủ trang từ cùng modal sau khi chốt bản công khai. |
| `PROFILE Trường Nhân 2026.pdf`, tr. 10 và 12; `Bao bì.pdf` | Trang 10 có hình trà và bao bì, trang 12 có ảnh vùng trồng và nhà máy. Tệp bao bì có bản dàn in. | Dùng ảnh bao bì từ profile khi xác nhận đúng mẫu bán và đủ nét; dùng ảnh vùng trồng có chú thích cho section nguồn gốc. Bản dàn in dùng để đối chiếu nhận diện. |
| `GCN.pdf` và `TL Truongnhan. ISO 22000 TS.pdf` | Hai bản ISO 22000:2018 đứng tên **Trường Sinh**. `GCN.pdf` có phạm vi gồm trà túi lọc; bản còn lại ghi nước và nước thảo dược. Cả hai ghi hiệu lực đến **07/11/2026**, đã qua tại ngày audit. | Chờ bản cập nhật có đúng phạm vi trước khi đặt ảnh trong mục tài liệu cơ sở sản xuất. |
| GMP 2024–2027 và ISO 9001 | Đứng tên **Trường Sinh**. GMP ghi dạng **cao lỏng và dung dịch**; phạm vi ISO 9001 ở bản gửi không nêu trà túi lọc. | Dành riêng cho hồ sơ của cơ sở hoặc dòng sản phẩm tương ứng nếu có nhu cầu công bố và đã xác nhận phạm vi. |
| `PKN(1).pdf` và `TruongNhan.Công bố.pdf` | Thuộc hồ sơ **Dịch chiết sâm Ngọc Linh Trường Tâm**, dòng khác với trà. | Dành cho dòng dịch chiết. |
| OCOP 4 sao và chỉ dẫn địa lý đang nêu trên website | Chưa tìm được bản cấp tương ứng trong ZIP. Ba WebP đang hiển thị là đồ họa dạng giấy. Cụm “100% Sâm Ngọc Linh Thật” cạnh hồ sơ cũng dễ bị đọc như tỷ lệ thành phần, trong khi bản tự công bố ghi 3% lá sâm Ngọc Linh. | Cần chủ thương hiệu cung cấp bản chứng nhận và xác nhận cách diễn đạt hiện có. Tách vị trí của chứng nhận và hồ sơ trà, tránh gắn chéo ảnh hoặc diễn giải thành phần. |
| Đăng ký doanh nghiệp, hợp đồng gia công, giấy ủy quyền | Có thông tin định danh, liên hệ hoặc điều khoản giao dịch. | Giữ làm nguồn đối chiếu nội bộ. Ưu tiên hai tài liệu của trà ở đầu bảng và chốt bản dùng công khai trước khi xuất ảnh. |

Vị trí ảnh đề xuất dùng section nguồn gốc và modal hiện có. GĐ0 tạo báo cáo và 11 ảnh trạng thái website trong `docs/ui-audit/`. GĐ1 bắt đầu sau khi duyệt hướng.

[Web Interface Guidelines của Vercel](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)
