export interface ProductCombo {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  mascotId: 'tri-thuc' | 'tu-nhien' | 'dung-si';
  isBestSeller?: boolean;
  benefits: string[];
  items: string[];
}

export const PRODUCTS: ProductCombo[] = [
  {
    id: 'combo-tri-thuc',
    name: 'Combo Chạy Deadline',
    subtitle: '2 Hộp Trà Sâm + Tặng Ly Giữ Nhiệt Cao Cấp',
    price: 349000,
    originalPrice: 429000,
    discountPercent: 19,
    image: '/images/products/combo-1.webp',
    mascotId: 'tri-thuc',
    benefits: [
      'Gọn nhẹ để mang đến lớp hoặc văn phòng',
      'Pha trực tiếp trong ly giữ nhiệt chịu được nước sôi',
      'Đậy nắp và ủ 5–7 phút trong giờ nghỉ',
    ],
    items: [
      '2 Hộp Trà Sâm Ngọc Linh (40 túi lọc)',
      '1 Ly giữ nhiệt inox 304 in logo Sâm Trường Nhân',
      'Thiệp cảm ơn và hướng dẫn pha trà',
    ],
  },
  {
    id: 'combo-tu-nhien',
    name: 'Combo Dưỡng Nhan Thanh Khiết',
    subtitle: '2 Hộp Trà Sâm + Tặng Mật Ong Rừng Tự Nhiên',
    price: 359000,
    originalPrice: 449000,
    discountPercent: 20,
    image: '/images/products/combo-2.webp',
    mascotId: 'tu-nhien',
    benefits: [
      'Thưởng thức trà ấm để cảm nhận hương thảo mộc',
      'Thử thêm một chút mật ong sau khi ủ',
      'Điều chỉnh độ ngọt theo khẩu vị',
    ],
    items: [
      '2 Hộp Trà Sâm Ngọc Linh (40 túi lọc)',
      '1 Hũ Mật ong rừng nguyên chất 100ml',
      'Cẩm nang công thức trà dưỡng nhan thanh mát',
    ],
  },
  {
    id: 'combo-dung-si',
    name: 'Combo Bứt Phá Thể Lực',
    subtitle: '3 Hộp Trà Sâm Ngọc Linh Đặc Biệt',
    price: 459000,
    originalPrice: 580000,
    discountPercent: 21,
    image: '/images/products/combo-3.webp',
    mascotId: 'dung-si',
    isBestSeller: true,
    benefits: [
      'Pha theo hướng dẫn trên nhãn trước khi mang theo',
      'Rót trà đã nguội bớt vào bình phù hợp để dùng trong ngày',
      'Dành cho giờ nghỉ sau buổi vận động hoặc khi đi xa',
    ],
    items: [
      '3 Hộp Trà Sâm Ngọc Linh Đặc Biệt (60 túi lọc)',
      '1 Bình nước thể thao chống tràn dung tích 650ml',
      'Cẩm nang tối ưu thể lực cùng dược liệu sâm',
    ],
  },
];

export function getProductById(id: string): ProductCombo | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function calculateOrderTotal(items: { productId: string; quantity: number }[]): {
  subtotal: number;
  total: number;
  verifiedItems: { product: ProductCombo; quantity: number; itemTotal: number }[];
} {
  const verifiedItems: { product: ProductCombo; quantity: number; itemTotal: number }[] = [];
  let total = 0;

  for (const item of items) {
    const product = getProductById(item.productId);
    if (product && item.quantity > 0) {
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      verifiedItems.push({ product, quantity: item.quantity, itemTotal });
    }
  }

  return { subtotal: total, total, verifiedItems };
}
