// DEMO DATA - Dữ liệu đánh giá phục vụ mục đích minh họa và thuyết trình demo tại cuộc thi DBC
// Lưu ý: Nội dung mang tính chất trải nghiệm mẫu, không thay thế cho nghiên cứu lâm sàng hay xác nhận thương mại.

export interface ReviewItem {
  id: string;
  authorName: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  tag: string;
  mascotRef: 'tri-thuc' | 'tu-nhien' | 'dung-si';
}

export const REVIEWS_ROW_1: ReviewItem[] = [
  // DEMO DATA
  {
    id: 'rev-1',
    authorName: 'Nguyễn Minh Quân',
    role: 'Lập trình viên Backend (24 tuổi)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    content:
      'Mình hay thức khuya debug hệ thống, uống cà phê nhiều thì cồn ruột. Chuyển sang Trà Sâm túi lọc 3 phút thấy đầu óc nhẹ nhàng, hỗ trợ tỉnh táo rất tự nhiên.',
    tag: 'Đồng hành chạy deadline',
    mascotRef: 'tri-thuc',
  },
  // DEMO DATA
  {
    id: 'rev-2',
    authorName: 'Trần Mai Phương',
    role: 'Content Creator & Youtuber (22 tuổi)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    content:
      'Vị sâm thoang thoảng dịu nhẹ, thêm chút mật ong rừng uống buổi sáng cực kỳ thư thái. Cảm nhận hỗ trợ thanh lọc và nuôi dưỡng làn da khỏe khoắn hơn.',
    tag: 'Chăm sóc sắc đẹp',
    mascotRef: 'tu-nhien',
  },
  // DEMO DATA
  {
    id: 'rev-3',
    authorName: 'Lê Hoàng Nam',
    role: 'Huấn luyện viên Thể hình tự do (27 tuổi)',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    content:
      'Sau mỗi buổi cardio và nâng tạ nặng, mình pha 1 gói trà sâm vào bình giữ nhiệt. Hỗ trợ phục hồi thể lực rất tốt, vị ngọt hậu sâu của sâm Ngọc Linh.',
    tag: 'Phục hồi thể lực',
    mascotRef: 'dung-si',
  },
];

export const REVIEWS_ROW_2: ReviewItem[] = [
  // DEMO DATA
  {
    id: 'rev-4',
    authorName: 'Đặng Thảo Linh',
    role: 'Sinh viên năm cuối ĐH Quốc Gia (21 tuổi)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    content:
      'Kỳ thi tốt nghiệp áp lực vô cùng. Tách trà sâm Trường Nhân giúp mình hỗ trợ giảm bớt cảm giác căng thẳng, ngủ ngon giấc hơn vào ban đêm.',
    tag: 'Tập trung ôn thi',
    mascotRef: 'tri-thuc',
  },
  // DEMO DATA
  {
    id: 'rev-5',
    authorName: 'Phạm Đức Huy',
    role: 'Quản lý dự án Logistics (29 tuổi)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    content:
      'Túi lọc tiện dụng đúng 3 phút là có trà thơm uống, không cần ấm chén cầu kỳ. Thiết kế bao bì trẻ trung, đặt trên bàn làm việc ai cũng hỏi thăm.',
    tag: 'Tiện lợi văn phòng',
    mascotRef: 'tri-thuc',
  },
  // DEMO DATA
  {
    id: 'rev-6',
    authorName: 'Vũ Ngọc Hân',
    role: 'Huấn luyện viên Yoga (26 tuổi)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    content:
      'Học viên lớp mình rất thích hương thơm mộc của trà sâm Ngọc Linh nguyên bản. Uống trước giờ thiền giúp tâm trí lắng dịu, hỗ trợ thanh nhiệt cơ thể.',
    tag: 'Lối sống Organic',
    mascotRef: 'tu-nhien',
  },
];
