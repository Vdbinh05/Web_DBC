export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  tags: string[];
  content: string; // HTML or Markdown formatted content
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'vi-sao-gen-z-chon-tra-sam-ngoc-linh',
    title: 'Vì sao Gen Z và giới văn phòng chọn Trà Sâm Ngọc Linh thay thế cà phê mỗi ngày?',
    description:
      'Khám phá xu hướng sống lành mạnh mới của giới trẻ: Thưởng thức vị ngọt hậu tinh túy từ trà sâm Ngọc Linh chuẩn OCOP, hỗ trợ tỉnh táo bền vững mà không lo cồn cào ruột.',
    publishedAt: '2026-03-15',
    readingTime: '5 phút đọc',
    author: 'Trường Nhân R&D',
    authorRole: 'Đội ngũ Nghiên cứu & Phát triển',
    coverImage: '/images/products/combo-1.webp',
    tags: ['Gen Z Lifestyle', 'Sống Lành Mạnh', 'Sâm Ngọc Linh', 'Năng Lượng Bền Vững'],
    content: `
      <h2>Khi thói quen uống cà phê liên tục bắt đầu bộc lộ giới hạn</h2>
      <p>Với nhịp sống hối hả của thế hệ trẻ hiện đại — từ các buổi chạy đồ án thâu đêm của sinh viên đến những chuỗi ngày "chạy deadline" căng thẳng nơi công sở — cà phê từ lâu đã trở thành thức uống bất ly thân. Tuy nhiên, việc nạp quá nhiều caffeine trong ngày thường đi kèm với những phản ứng phụ không mong muốn: tim đập nhanh, cảm giác cồn cào bao tử và đặc biệt là hiện tượng "energy crash" — tụt dốc năng lượng đột ngột sau khi cơn hưng phấn caffeine qua đi.</p>
      <p>Chính vì vậy, một làn sóng chuyển dịch mạnh mẽ sang các thức uống thảo mộc tự nhiên giàu dưỡng chất đang được đón nhận nồng nhiệt, trong đó nổi bật là dòng sản phẩm <strong>Trà Sâm Ngọc Linh túi lọc Trường Nhân</strong>.</p>

      <h2>Sâm Ngọc Linh – "Quốc bảo" thảo dược Việt Nam dưới góc nhìn trẻ trung</h2>
      <p>Được mệnh danh là loài sâm quý hàng đầu thế giới với hàm lượng saponin phong phú (hơn 52 hợp chất saponin đa dạng), sâm Ngọc Linh sinh trưởng tự nhiên dưới tán rừng nguyên sinh vùng núi cao trên 1.500m. Trước đây, nhiều người trẻ thường nghĩ sâm là thứ gì đó xa xỉ, chỉ dành cho người cao tuổi hoặc dùng trong những dịp trang trọng.</p>
      <p>Thương hiệu <strong>Trà Sâm Trường Nhân</strong> đã thay đổi hoàn toàn định kiến đó bằng cách đưa tinh hoa dược liệu vào dạng túi lọc tiện dụng, đạt tiêu chuẩn chất lượng OCOP, giữ trọn hương vị mộc mạc và dưỡng chất mà bất kỳ ai cũng có thể thưởng thức chỉ sau 3 phút ủ nước ấm.</p>

      <h2>Sự tỉnh táo tự nhiên: Hỗ trợ năng lượng dẻo dai thay vì kích thích tức thời</h2>
      <p>Khác biệt cốt lõi giữa trà sâm và cà phê nằm ở cơ chế tương tác với cơ thể:</p>
      <ul>
        <li><strong>Không gây kích ứng niêm mạc dạ dày:</strong> Nước trà sâm tính bình, dịu nhẹ, thích hợp uống cả khi đang tập trung làm việc lúc xế chiều.</li>
        <li><strong>Hỗ trợ duy trì sự tập trung dài lâu:</strong> Các hoạt chất saponin tự nhiên hỗ trợ tăng cường lưu thông máu não, hỗ trợ giảm bớt cảm giác căng thẳng thần kinh do áp lực công việc liên tục.</li>
        <li><strong>Hỗ trợ thanh lọc và nuôi dưỡng cơ thể:</strong> Bên cạnh việc giữ đầu óc minh mẫn, trà sâm còn hỗ trợ chống oxy hóa và bồi bổ thể lực, giúp cơ thể phục hồi sau những ngày làm việc cường độ cao.</li>
      </ul>

      <h2>Tiện lợi chuẩn "On-The-Go" cho cuộc sống bận rộn</h2>
      <p>Chỉ cần một ly giữ nhiệt cá nhân, một gói trà túi lọc và 200ml nước ấm 85°C – 90°C. Sau đúng 3 phút, hương thơm thảo mộc dịu mát lan tỏa, vị tiền chát nhẹ chuyển hóa thành vị ngọt hậu sâu lắng đặc trưng của sâm rừng Ngọc Linh. Một trải nghiệm thưởng trà vừa tinh tế, vừa hiện đại, phản ánh lối sống cân bằng và văn minh của thế hệ trẻ hôm nay.</p>
    `,
  },
  {
    slug: 'bi-quyet-pha-tra-sam-tui-loc-3-phut-chuan-vi',
    title: 'Bí quyết pha trà sâm túi lọc chuẩn vị trong 3 phút: Tối ưu hoạt chất quý và vị ngọt hậu',
    description:
      'Hướng dẫn từng bước cách ủ trà sâm túi lọc Trường Nhân để giải phóng trọn vẹn hoạt chất saponin, cảm nhận trọn vẹn hương vị thảo mộc thiên nhiên vùng núi cao.',
    publishedAt: '2026-03-20',
    readingTime: '4 phút đọc',
    author: 'Dược sĩ Hương Giang',
    authorRole: 'Cố vấn Dược liệu Thảo mộc',
    coverImage: '/images/products/combo-2.webp',
    tags: ['Nghệ Thuật Trà', 'Cẩm Nang Pha Trà', 'Sức Khỏe Gia Đình', 'Trà Sâm Túi Lọc'],
    content: `
      <h2>Tại sao nhiệt độ và thời gian lại quyết định chất lượng tách trà sâm?</h2>
      <p>Trà sâm túi lọc không đơn thuần là một túi trà thảo mộc thông thường. Bên trong mỗi túi lọc là sự kết hợp cân chỉnh tỉ mỉ giữa lá sâm Ngọc Linh sấy thăng hoa và củ sâm thái lát chuẩn quy trình OCOP. Để giải phóng tối đa hoạt chất quý như saponin, axit amin và khoáng vi lượng mà không làm mất đi hương thơm tinh tế, nhiệt độ nước ủ là yếu tố mang tính quyết định.</p>

      <h2>3 bước ủ trà chuẩn vị núi rừng trong 3 phút</h2>
      <ol>
        <li><strong>Bước 1 - Chuẩn bị nước ấm lý tưởng (85°C – 90°C):</strong> Không nên dùng nước sôi sùng sục 100°C trực tiếp vì nhiệt độ quá cao có thể làm biến tính một số thành phần hương thảo mộc mỏng manh. Nước sôi để lắng khoảng 1–2 phút là đạt nhiệt độ tối ưu.</li>
        <li><strong>Bước 2 - Tráng ấm và ủ túi lọc:</strong> Đặt 1 túi lọc Trà Sâm Trường Nhân vào tách hoặc ly giữ nhiệt 250ml - 300ml. Rót nước ấm ngập túi lọc, đậy nắp nhẹ để hương thơm không bị bay hơi.</li>
        <li><strong>Bước 3 - Đúng 3 phút bấm giờ và nhấc nhẹ:</strong> Nhúng nhẹ túi lọc 3 đến 5 lần để dịch chiết hòa quyện đều trong nước trà. Lúc này nước trà chuyển sang màu vàng mật ong ánh xanh tuyệt đẹp.</li>
      </ol>

      <h2>Thưởng thức đa phong cách cùng 3 Mascot Trường Nhân</h2>
      <p>Tùy theo sở thích và nhu cầu năng lượng trong ngày, bạn có thể biến tấu tách trà sâm theo phong cách riêng:</p>
      <ul>
        <li><strong>Phong cách Sâm Tri Thức:</strong> Uống ấm nguyên bản trong ly giữ nhiệt, đặt cạnh máy tính để nhâm nhi từng ngụm nhỏ suốt buổi làm việc, hỗ trợ tinh thần luôn tỉnh táo.</li>
        <li><strong>Phong cách Sâm Tự Nhiên:</strong> Thêm 1 thìa mật ong rừng tự nhiên và vài lát chanh tươi hoặc vài cánh hoa hồng sấy, hỗ trợ thanh nhiệt và mang lại làn da tươi tắn.</li>
        <li><strong>Phong cách Sâm Dũng Sĩ:</strong> Ủ đậm 2 túi lọc với 400ml nước, để nguội và thêm đá viên mang theo khi chạy bộ hay tập gym, hỗ trợ phục hồi sức bền cơ thể nhanh chóng.</li>
      </ul>

      <p>Hãy biến mỗi tách trà sâm thành một khoảnh khắc dừng lại, hít thở sâu và cảm nhận sự hòa quyện giữa thiên nhiên đại ngàn và nhịp sống tươi trẻ hiện đại.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
