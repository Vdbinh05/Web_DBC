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
    role: 'Học Tập & Làm Việc',
    tagline: 'Một tách trà giữa giờ chạy deadline',
    target: 'Sinh viên chạy deadline, dân IT & chuyên viên văn phòng',
    description:
      'Sâm Tri Thức mang theo sách, laptop và một ly trà ấm cho giờ nghỉ giữa buổi học hoặc ngày làm việc.',
    avatar: '/images/mascots/tri-thuc-front.webp',
    frontImg: '/images/mascots/tri-thuc-front.webp',
    actionImg: '/images/mascots/tri-thuc-laptop.webp',
    recommendedCombo: PRODUCTS[0], // combo-tri-thuc
    traits: [
      'Kính tròn thông thái, mũ lá sâm tràn đầy ý tưởng',
      'Luôn mang theo laptop & cuốn sách tri thức',
      'Đậy nắp ly và ủ trà 5–7 phút theo nhãn',
    ],
    quote: 'Mình nghỉ tay một chút, pha trà rồi quay lại với bài làm nhé.',
    badgeText: 'Dành Cho Văn Phòng & Học Tập',
  },
  {
    id: 'tu-nhien',
    name: 'Sâm Tự Nhiên',
    role: 'Thảo Mộc & Mật Ong',
    tagline: 'Tách trà ấm cho một buổi sáng thong thả',
    target: 'Người thích trà thảo mộc và vị ngọt nhẹ của mật ong',
    description:
      'Sâm Tự Nhiên thích pha trà theo nhãn rồi thêm chút mật ong tùy khẩu vị.',
    avatar: '/images/mascots/tu-nhien-front.webp',
    frontImg: '/images/mascots/tu-nhien-front.webp',
    actionImg: '/images/mascots/tu-nhien-tea.webp',
    recommendedCombo: PRODUCTS[1], // combo-tu-nhien
    traits: [
      'Mái tóc lá sâm bồng bềnh điểm xuyết hoa trắng & quả đỏ mọng',
      'Tách trà ấm với táo đỏ, kỷ tử và các thảo mộc trong công thức',
      'Thêm mật ong theo khẩu vị sau khi trà đã ủ xong',
    ],
    quote: 'Mỗi ngày một tách trà sâm, lắng nghe cơ thể được vỗ về thanh nhẹ.',
    badgeText: 'Dành Cho Người Thích Trà Thảo Mộc',
  },
  {
    id: 'dung-si',
    name: 'Sâm Dũng Sĩ',
    role: 'Vận Động & Đi Xa',
    tagline: 'Mang theo tách trà cho giờ nghỉ sau buổi tập',
    target: 'Người chơi thể thao, rèn luyện thể chất & vận động cường độ cao',
    description:
      'Sâm Dũng Sĩ mang theo bình cá nhân để có một tách trà trong giờ nghỉ khi đi xa hoặc sau buổi tập.',
    avatar: '/images/mascots/dung-si-front.webp',
    frontImg: '/images/mascots/dung-si-front.webp',
    actionImg: '/images/mascots/dung-si-energy.webp',
    recommendedCombo: PRODUCTS[2], // combo-dung-si
    traits: [
      'Áo khoác thể thao xanh - vàng cùng áo choàng dũng sĩ kiên định',
      'Đôi mắt sáng ngời ý chí tiên phong bứt phá giới hạn',
      'Mang trà túi lọc trong chuyến đi hoặc dùng sau buổi tập',
    ],
    quote: 'Đi một quãng rồi dừng lại nhấp ngụm trà nhé!',
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
    question: 'Bạn thường muốn nghỉ tay thưởng trà vào lúc nào?',
    options: [
      {
        text: 'Chiều 2h - 4h khi ngồi trước màn hình máy tính đang dí deadline',
        targetMascot: 'tri-thuc',
        icon: '💻',
      },
      {
        text: 'Buổi sáng, khi có thời gian ngồi uống trà thong thả',
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
    question: 'Bạn muốn dùng trà trong dịp nào nhất?',
    options: [
      {
        text: 'Nghỉ giữa giờ học hoặc làm việc',
        targetMascot: 'tri-thuc',
        icon: '🧠',
      },
      {
        text: 'Thưởng trà tại nhà với chút mật ong',
        targetMascot: 'tu-nhien',
        icon: '✨',
      },
      {
        text: 'Nghỉ sau buổi tập hoặc trong một chuyến đi',
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
        text: 'Ủ 5–7 phút trong ly giữ nhiệt đặt cạnh bàn làm việc',
        targetMascot: 'tri-thuc',
        icon: '⏱️',
      },
      {
        text: 'Thong thả ngâm trà với chút mật ong rừng, nhâm nhi thưởng thức',
        targetMascot: 'tu-nhien',
        icon: '🍯',
      },
      {
        text: 'Pha theo nhãn rồi mang theo trong bình cá nhân',
        targetMascot: 'dung-si',
        icon: '🏃',
      },
    ],
  },
];
