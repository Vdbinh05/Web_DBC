# Vận hành Trà Sâm Trường Nhân

## Hosting 0đ

Dùng Netlify Free với tên miền phụ `*.netlify.app` và chọn gói Free trong dashboard. Netlify cho phép dự án thương mại trên gói Free. Gói hiện có 300 credits mỗi tháng với giới hạn cứng. Theo dõi mức dùng trong dashboard vì khi chạm giới hạn, website có thể tạm dừng. Netlify tự cấu hình adapter App Router và Route Handlers. Vercel Hobby chỉ dành cho mục đích cá nhân, phi thương mại. [Netlify Free](https://www.netlify.com/blog/introducing-netlify-free-plan/) · [Hạn mức Netlify](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) · [Next.js trên Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) · [Vercel Fair Use](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)

## Tạo Google Sheets và webhook

1. Tạo một spreadsheet **riêng tư**. Mở **Extensions → Apps Script** và dán nội dung [Code.gs](../integrations/google-sheets/Code.gs) vào dự án script.
2. Tạo hai bí mật khác nhau bằng cách chạy lệnh dưới đây hai lần trong máy của bạn. Một giá trị dùng cho webhook, giá trị còn lại dùng làm mật khẩu admin.
3. Trong **Project Settings → Script Properties**, thêm `SPREADSHEET_ID` (phần giữa `/d/` và `/edit` của URL Sheet) và `WEBHOOK_SECRET` (bí mật webhook).
4. Chọn **Deploy → New deployment → Web app**, **Execute as me**, **Who has access: Anyone**. Chia sẻ quyền truy cập web app ở cấp này để máy chủ Next.js gọi được. Spreadsheet vẫn để riêng tư và mỗi request cần bí mật. Sao chép URL kết thúc bằng `/exec`.
5. Webhook tạo tab `WebOrders` khi truy cập hợp lệ lần đầu. Nếu từng dùng webhook cũ, giữ tab cũ riêng để đối chiếu. Tab mới có schema riêng. Cập nhật trạng thái ở [trang quản trị](https://admin.zentrix.id.vn). Giữ thứ tự các dòng trong Sheet vì phân trang dựa trên vị trí dòng. [Hướng dẫn Apps Script Web App](https://developers.google.com/apps-script/guides/web) · [Hạn mức Apps Script](https://developers.google.com/apps-script/guides/services/quotas)

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

## Kết nối GA4 với trang quản trị

1. Trong Google Analytics, tạo thuộc tính GA4 và luồng dữ liệu Web cho `https://zentrix.id.vn`. Lấy **Measurement ID** dạng `G-...` trong luồng dữ liệu và **Property ID** dạng số trong phần thông tin thuộc tính. Website đã có mã đo lường và dùng Measurement ID từ biến môi trường. [Thiết lập Google Analytics](https://support.google.com/analytics/answer/9304153)
2. Trong Google Cloud, tạo hoặc chọn một project, bật **Google Analytics Data API**, rồi tạo một tài khoản dịch vụ. Thêm email của tài khoản dịch vụ vào **Property access management** của thuộc tính GA4 với vai trò **Viewer**. Tạo khóa JSON của tài khoản dịch vụ. [Hướng dẫn Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart) · [Tạo khóa tài khoản dịch vụ](https://cloud.google.com/iam/docs/keys-create-delete)
3. Trong Vercel → **Settings → Environment Variables**, chọn **Production**. Điền Measurement ID vào `NEXT_PUBLIC_GA_ID`, Property ID vào `GA4_PROPERTY_ID` và toàn bộ nội dung tệp khóa vào `GA4_SERVICE_ACCOUNT_JSON` dưới dạng **Secret**. Tạo bản deploy mới để Vercel áp dụng cấu hình. [Biến môi trường trên Vercel](https://vercel.com/docs/environment-variables/managing-environment-variables)
4. Mở trang bán hàng, bấm **Cho phép đo lường truy cập** ở chân trang rồi tải một trang bài viết. Đăng nhập trang quản trị và mở **Thống kê truy cập**. Mục khách trong 30 phút qua lấy từ báo cáo Realtime. Số liệu 7 hoặc 30 ngày lấy từ báo cáo chuẩn của GA4 và có thể cập nhật chậm hơn. [Báo cáo Realtime](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-basics)

## Biến môi trường

Thêm biến trong dashboard hosting hoặc file môi trường local của bạn. Lưu bí mật trong nơi quản lý mật khẩu và dashboard hosting.

| Biến | Dùng để |
| --- | --- |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Bắt buộc cho đặt hàng. URL Apps Script `https://script.google.com/macros/s/.../exec`. |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | Bắt buộc cho đặt hàng. Trùng `WEBHOOK_SECRET` trong Apps Script. |
| `ADMIN_PASSWORD` | Bắt buộc cho admin. Mật khẩu ngẫu nhiên ít nhất 32 ký tự. Đổi mật khẩu sẽ vô hiệu các phiên cũ. |
| `NEXT_PUBLIC_SITE_URL` | URL chính thức, ví dụ `https://ten-shop.netlify.app`, dùng cho SEO và sitemap. |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Tùy chọn. Thông báo có mã đơn và tổng tiền sau khi Sheets xác nhận. Thông tin giao hàng nằm trong admin. |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Tùy chọn. Mặc định model `gemini-2.5-flash`. Dùng dự án Free Tier để tránh chi phí theo lượt gọi. Thiếu khóa hoặc Gemini hết hạn mức sẽ dùng câu trả lời có sẵn. [Giá và hạn mức Gemini](https://ai.google.dev/gemini-api/docs/pricing) |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` | Tùy chọn. Script chỉ tải sau khi khách chọn cho phép đo lường ở Footer. Checkout và chat được đánh dấu che nội dung cho Clarity. |
| `GA4_PROPERTY_ID`, `GA4_SERVICE_ACCOUNT_JSON` | Dùng cho tab Thống kê truy cập. Property ID là mã số. Tệp khóa JSON chỉ dùng ở máy chủ. |
| `NEXT_PUBLIC_INTRO_VIDEO_URL`, `NEXT_PUBLIC_OFFER_ENDS_AT` | Tùy chọn. Dùng URL HTTPS dạng embed và mốc kết thúc có múi giờ ISO 8601 cho chiến dịch thật. Đồng hồ chỉ hiển thị khi còn thời gian. |

Trên Netlify, kết nối repo, dùng `npm run build` và publish directory `.next`. Dùng Node 22 hoặc 24 LTS. Đặt biến server cho Functions và biến `NEXT_PUBLIC_*` cho build. Tạo bản deploy mới sau khi thay biến công khai để giá trị được đưa vào mã trình duyệt.

Trên Vercel, thêm `ADMIN_PASSWORD`, `GOOGLE_SHEETS_WEBHOOK_URL` và `GOOGLE_SHEETS_WEBHOOK_SECRET` vào môi trường **Production**. Đặt mật khẩu và bí mật webhook dưới dạng **Secret**, sau đó redeploy.

## Kiểm tra trước khi nhận đơn

1. Mở `/admin`, đăng nhập. Thử mở trang trong cửa sổ riêng tư để kiểm tra trang quản trị yêu cầu mật khẩu.
2. Dùng thông tin của bạn để tạo một đơn COD thử trên website vừa triển khai. Kiểm tra mã đơn xuất hiện ở `/admin` và tab `WebOrders`. Thử đổi trạng thái và đánh dấu hủy cho đơn kiểm tra.
3. Nếu bật Telegram, kiểm tra nhóm nhận được thông báo. Sheets là nguồn đối chiếu nếu Telegram gửi lỗi.
4. Xác minh các tuyên bố sản phẩm, bản cấp OCOP và chỉ dẫn địa lý, cách pha, giá và chính sách giao hàng trước khi chia sẻ trang bán. Đăng đánh giá khi có nội dung thật. Rà chính sách dữ liệu và quyền truy cập Sheet theo quy trình vận hành của bạn.

Đơn mới thanh toán khi nhận hàng (COD). Nếu đã có đơn chuyển khoản trong Sheet, admin vẫn hiển thị phương thức đã lưu.

Khi Sheets chưa cấu hình hoặc lỗi, API trả lỗi thay cho xác nhận đơn. Nếu mất kết nối trong khi gửi, khách có thể bấm lại với cùng nội dung trong cùng phiên trang để kiểm tra lại cùng mã đơn. Telegram là kênh phụ. Trang quản trị hỗ trợ một mật khẩu quản trị chung, xem các đơn gần nhất, phân trang và cập nhật trạng thái. GA4 `purchase` đếm đơn đã ghi nhận. Đối chiếu trạng thái trong admin khi cần số đơn thực giao.
