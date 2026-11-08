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
      'Hỗ trợ giảm căng thẳng trí não khi làm việc cường độ cao',
      'Hỗ trợ duy trì sự tỉnh táo tự nhiên, không gây cồn cào như cà phê',
      'Tiện lợi pha nhanh túi lọc chỉ trong 3 phút giữa giờ làm',
    ],
    items: [
      '2 Hộp Trà Sâm Ngọc Linh (40 túi lọc)',
      '1 Ly giữ nhiệt inox 304 in logo Sâm Trường Nhân',
      'Thiệp cảm ơn và hướng dẫn pha trà 3 phút chuẩn vị',
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
      'Giàu hoạt chất saponin, hỗ trợ chống oxy hóa và thanh lọc cơ thể',
      'Hỗ trợ nuôi dưỡng làn da tươi tắn, thanh nhiệt giải độc',
      'Hương vị thanh ngọt dịu nhẹ tự nhiên khi kết hợp cùng mật ong rừng',
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
      'Hỗ trợ bồi bổ thể lực và tăng cường sức bền vận động',
      'Hỗ trợ phục hồi nhanh năng lượng sau buổi tập luyện hoặc ngày dài di chuyển',
      'Đậm đà dưỡng chất từ củ và lá sâm Ngọc Linh chuẩn OCOP',
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
