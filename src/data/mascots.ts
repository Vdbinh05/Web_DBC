import { PRODUCTS, ProductCombo } from './products';

export interface Mascot {
  id: 'tri-thuc' | 'tu-nhien' | 'dung-si';
  name: string;
  role: string;
  tagline: string;
  target: string;
  description: string;
  avatar: string;
  frontImg: string;
  actionImg: string;
  recommendedCombo: ProductCombo;
  traits: string[];
  quote: string;
  badgeText: string;
}

export const MASCOTS: Mascot[] = [
  {
    id: 'tri-thuc',
    name: 'Sâm Tri Thức',
    role: 'Tỉnh Táo & Tập Trung',
    tagline: 'Đồng hành vượt deadline – Giữ trọn sự tỉnh táo',
    target: 'Sinh viên chạy deadline, dân IT & chuyên viên văn phòng',
    description:
      'Hỗ trợ giảm căng thẳng trí não, duy trì sự tỉnh táo và tập trung cao độ suốt ngày dài học tập, làm việc mà không lo cồn ruột.',
    avatar: '/images/mascots/tri-thuc-front.webp',
    frontImg: '/images/mascots/tri-thuc-front.webp',
    actionImg: '/images/mascots/tri-thuc-laptop.webp',
    recommendedCombo: PRODUCTS[0], // combo-tri-thuc
    traits: [
      'Kính tròn thông thái, mũ lá sâm tràn đầy ý tưởng',
      'Luôn mang theo laptop & cuốn sách tri thức',
      'Pha trà trong 3 phút – nạp lại 100% năng lượng tư duy',
    ],
    quote: 'Deadline dù căng, nhấp ngụm sâm ấm, đầu óc tức khắc hanh thông!',
    badgeText: 'Dành Cho Văn Phòng & Học Tập',
  },
  {
    id: 'tu-nhien',
    name: 'Sâm Tự Nhiên',
    role: 'Thanh Lọc & Rạng Rỡ',
    tagline: 'Vẻ đẹp thuần khiết từ thảo dược đại ngàn',
    target: 'Người yêu lối sống lành mạnh, chăm sóc sắc đẹp tự nhiên',
    description:
      'Giàu hoạt chất saponin quý, hỗ trợ chống oxy hóa, hỗ trợ thanh nhiệt giải độc và nuôi dưỡng làn da tươi tắn từ sâu bên trong.',
    avatar: '/images/mascots/tu-nhien-front.webp',
    frontImg: '/images/mascots/tu-nhien-front.webp',
    actionImg: '/images/mascots/tu-nhien-tea.webp',
    recommendedCombo: PRODUCTS[1], // combo-tu-nhien
    traits: [
      'Mái tóc lá sâm bồng bềnh điểm xuyết hoa trắng & quả đỏ mọng',
      'Tách trà ấm thanh ngọt tự nhiên, không hương liệu nhân tạo',
      'Liệu pháp cân bằng thân - tâm - trí mỗi sớm mai',
    ],
    quote: 'Mỗi ngày một tách trà sâm, lắng nghe cơ thể được vỗ về thanh nhẹ.',
    badgeText: 'Lối Sống Lành Mạnh & Dưỡng Nhan',
  },
  {
    id: 'dung-si',
    name: 'Sâm Dũng Sĩ',
    role: 'Bứt Phá Năng Lượng',
    tagline: 'Sức mạnh kiên cường – Chinh phục mọi thử thách',
    target: 'Người chơi thể thao, rèn luyện thể chất & vận động cường độ cao',
    description:
      'Hỗ trợ bồi bổ thể lực, hỗ trợ tăng sức bền, phục hồi năng lượng nhanh chóng sau khi tập luyện hoặc những chuyến đi xa.',
    avatar: '/images/mascots/dung-si-front.webp',
    frontImg: '/images/mascots/dung-si-front.webp',
    actionImg: '/images/mascots/dung-si-energy.webp',
    recommendedCombo: PRODUCTS[2], // combo-dung-si
    traits: [
      'Áo khoác thể thao xanh - vàng cùng áo choàng dũng sĩ kiên định',
      'Đôi mắt sáng ngời ý chí tiên phong bứt phá giới hạn',
      'Dồi dào khoáng chất sâm rừng nguyên chất chuẩn OCOP',
    ],
    quote: 'Chinh phục mọi cung đường và thử thách cùng nguồn sinh lực dồi dào!',
    badgeText: 'Bứt Phá Thể Lực & Thể Thao',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    targetMascot: 'tri-thuc' | 'tu-nhien' | 'dung-si';
    icon: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Thời điểm nào trong ngày bạn cảm thấy cần "nạp năng lượng" nhất?',
    options: [
      {
        text: 'Chiều 2h - 4h khi ngồi trước màn hình máy tính đang dí deadline',
        targetMascot: 'tri-thuc',
        icon: '💻',
      },
      {
        text: 'Buổi sáng thức dậy cần thanh lọc cơ thể và bắt đầu ngày mới nhẹ nhõm',
        targetMascot: 'tu-nhien',
        icon: '🌿',
      },
      {
        text: 'Sau buổi chiều tập gym, chạy bộ hoặc một ngày hoạt động thể chất nhiều',
        targetMascot: 'dung-si',
        icon: '⚡',
      },
    ],
  },
  {
    id: 2,
    question: 'Ưu tiên lớn nhất của bạn cho sức khỏe hiện nay là gì?',
    options: [
      {
        text: 'Giữ đầu óc minh mẫn, không stress, giảm áp lực công việc',
        targetMascot: 'tri-thuc',
        icon: '🧠',
      },
      {
        text: 'Thanh nhiệt, nuôi dưỡng làn da tươi sáng và duy trì vóc dáng tự nhiên',
        targetMascot: 'tu-nhien',
        icon: '✨',
      },
      {
        text: 'Tăng cường sức bền, cải thiện cơ bắp và phục hồi sinh lực dẻo dai',
        targetMascot: 'dung-si',
        icon: '🔥',
      },
    ],
  },
  {
    id: 3,
    question: 'Cách bạn thích tận hưởng một tách trà sâm?',
    options: [
      {
        text: 'Pha nhanh 3 phút trong ly giữ nhiệt đặt cạnh bàn làm việc',
        targetMascot: 'tri-thuc',
        icon: '⏱️',
      },
      {
        text: 'Thong thả ngâm trà với chút mật ong rừng, nhâm nhi thưởng thức',
        targetMascot: 'tu-nhien',
        icon: '🍯',
      },
      {
        text: 'Pha đậm đà mang theo trong bình thể thao sẵn sàng tiếp sức',
        targetMascot: 'dung-si',
        icon: '🏃',
      },
    ],
  },
];
