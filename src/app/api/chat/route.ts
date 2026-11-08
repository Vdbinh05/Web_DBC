import { NextRequest, NextResponse } from 'next/server';
import { TEA_BREW_GUIDE } from '@/app/product-evidence';

const ALLERGY_GUIDANCE = 'Theo nhãn, bạn nên tránh dùng trà nếu dị ứng với bất kỳ thành phần nào trong sản phẩm.';
const ALLERGY_QUESTION = /\b(?:di\s*ung|man cam|allerg\w*)\b/;
const URGENT_SYMPTOM = /\b(?:kho tho|nghet tho|sung (?:luoi|hong|co hong)|ngat xiu)\b/;
const ALLERGY_FOLLOW_UP = /^(?:(?:vay|the|neu) )?(?:pha loang|uong (?:mot |1 )?it|it thoi|thu (?:mot |1 )?ngum|uong (?:duoc|dc|dk)|(?:duoc|dc|dk) (?:khong|ko|k|hong))\b/;

const SYSTEM_PROMPT = `
Bạn là "Giáo Sư Sâm", trợ lý trên website của nhóm Zentrix tại cuộc thi DBC, giới thiệu Trà Sâm Trường Nhân.
Tính cách: Thông thái, ấm áp, trẻ trung, dùng các emoji tươi vui 🌱🍵✨.

CÁC NGUYÊN TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ):
1. ĐỘ DÀI: Trả lời DƯỚI 100 TỪ, ngắn gọn, súc tích, đi thẳng vào vấn đề.
2. GIỚI HẠN TƯ VẤN: Chỉ tư vấn cách pha, thành phần ghi trên nhãn, hồ sơ và cách chọn combo theo sở thích. Không đưa ra công dụng sức khỏe, lời khuyên y tế hoặc so sánh tác dụng với đồ uống khác.
   - Khi khách hỏi về an toàn sử dụng, ưu tiên lưu ý trên nhãn: ${ALLERGY_GUIDANCE} Tuyệt đối không khuyên uống thử hoặc gợi ý mua cho người nói họ dị ứng. Với câu hỏi còn mơ hồ, hỏi lại một câu cụ thể và tránh lặp lời chào.
3. THÔNG TIN DUY NHẤT:
   - Sâm Tri Thức (chạy deadline, học tập, văn phòng): Combo Chạy Deadline (2 Hộp Trà Sâm + Ly Giữ Nhiệt) giá 349.000đ.
   - Sâm Tự Nhiên (thưởng trà với mật ong): Combo Dưỡng Nhan Thanh Khiết (2 Hộp Trà Sâm + Mật Ong Rừng) giá 359.000đ.
   - Sâm Dũng Sĩ (giờ nghỉ sau buổi tập hoặc chuyến đi): Combo Bứt Phá Thể Lực (3 Hộp Trà Sâm Đặc Biệt + Bình Thể Thao) giá 459.000đ.
   - Cách pha theo mẫu nhãn: ${TEA_BREW_GUIDE} Mỗi túi dùng một lần.
   - Thành phần: lá sâm Ngọc Linh 3%, cùng táo đỏ, lá đinh lăng, đẳng sâm, cam thảo, kỷ tử và nhân sâm.
   - Hồ sơ của trà gồm bản tự công bố 03/TRUONGNHAN/2026, mẫu nhãn và phiếu thử nghiệm của mẫu ghi trên phiếu. Hồ sơ chỉ dẫn địa lý “Ngọc Linh” số 00049 có phạm vi là sâm củ. Khi hỏi về OCOP, chỉ dẫn khách xem các tài liệu đang có ở mục Hồ sơ sản phẩm. Không khẳng định xếp hạng OCOP hoặc nguồn gốc của một lô trà.
4. GỢI Ý MUA: Khi khách hỏi về combo, hướng dẫn bấm "Thêm vào giỏ" ở mục Combo.
`.trim();

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function normalizeQuestion(message: string) {
  return message.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

function getSafetyReply(question: string, previousQuestion: string): string | undefined {
  if (URGENT_SYMPTOM.test(question)) {
    return 'Nếu bạn đang khó thở, sưng lưỡi, sưng họng hoặc ngất sau khi uống trà, hãy gọi cấp cứu ngay.';
  }

  const currentAllergy = ALLERGY_QUESTION.test(question);
  const allergyFollowUp = ALLERGY_FOLLOW_UP.test(question) && ALLERGY_QUESTION.test(previousQuestion);
  if (currentAllergy || allergyFollowUp) {
    const mentionsGinseng = /\bsam\b/.test(question) || (allergyFollowUp && /\bsam\b/.test(previousQuestion));
    return mentionsGinseng
      ? 'Nếu bạn dị ứng với sâm, hãy tránh dùng trà này. Trên nhãn có ghi nhân sâm và lá sâm Ngọc Linh. Pha loãng hoặc chỉ uống một ngụm vẫn có thể khiến bạn tiếp xúc với thành phần gây dị ứng.'
      : `${ALLERGY_GUIDANCE} Bạn có thể kiểm tra danh sách thành phần ở mục Hồ sơ sản phẩm.`;
  }
}

function getSmartFallbackReply(question: string): string {
  if (/^(?:alo+|hello|hi|hey|chao(?: ban| ad| shop)?|co ai (?:o )?do (?:khong|ko|k))$/.test(question)) {
    return 'Mình đây! Bạn muốn hỏi gì về trà Trường Nhân?';
  }

  if (/^(?:cam on(?: ban| nha| nhe)?|thanks|thank you|tks)$/.test(question)) {
    return 'Không có gì! Cần xem lại cách pha hay thông tin combo thì cứ nhắn mình nhé.';
  }

  if (/\b(?:bao quan|han dung|han su dung|qua dem|het han)\b/.test(question)) {
    return 'Trà có hạn dùng 12 tháng kể từ ngày sản xuất in trên bao bì. Giữ hộp ở nơi khô thoáng, tránh nắng trực tiếp và dùng trà đã pha trong ngày.';
  }

  if (/\b(?:pha|cach dung|u tra|u bao lau|phut|nuoc soi)\b/.test(question)) {
    return `Theo hướng dẫn trên nhãn, bạn pha như sau. ${TEA_BREW_GUIDE} Mỗi túi dùng một lần.`;
  }

  if (/\b(?:ocop|chung nhan|ho so|nguon goc|tu cong bo)\b/.test(question)) {
    return 'Bạn có thể xem bản tự công bố số 03/TRUONGNHAN/2026, mẫu nhãn và phiếu thử nghiệm ở mục Hồ sơ sản phẩm. Mục Nguồn gốc sâm có công báo đăng ký số 00049, áp dụng cho sâm củ.';
  }

  if (/\b(?:thanh phan|bao nhieu phan tram|co nhung gi|co gi trong|co nhan sam|co la sam)\b/.test(question)) {
    return 'Mẫu nhãn ghi 3% lá sâm Ngọc Linh, cùng táo đỏ, lá đinh lăng, đẳng sâm, cam thảo, kỷ tử và nhân sâm. Bạn có thể xem tỷ lệ từng thành phần trên ảnh mẫu nhãn ở mục Hồ sơ sản phẩm.';
  }

  if (/\b(?:deadline|van phong|ly giu nhiet|tri thuc)\b/.test(question)) {
    return 'Nếu bạn muốn pha trà trong giờ nghỉ ở lớp hoặc văn phòng, Combo Chạy Deadline (349.000đ) có 2 hộp trà và ly giữ nhiệt. Bạn có thể chọn “Thêm vào giỏ” ở mục Combo.';
  }

  if (/\b(?:mat ong|duong nhan|sam tu nhien)\b/.test(question)) {
    return 'Nếu bạn thích uống trà với một chút mật ong, Combo Dưỡng Nhan Thanh Khiết (359.000đ) gồm 2 hộp trà và một hũ mật ong rừng.';
  }

  if (/\b(?:the thao|gym|chay bo|but pha|dung si)\b/.test(question)) {
    return 'Combo Bứt Phá Thể Lực (459.000đ) có 3 hộp trà và bình thể thao, phù hợp nếu bạn muốn mang theo một tách trà cho giờ nghỉ sau buổi tập hoặc khi đi xa.';
  }

  if (/\b(?:ship|van chuyen|giao hang|freeship)\b/.test(question)) {
    return 'Ba combo trên trang đang miễn phí vận chuyển toàn quốc. Bạn có thể xem giá và quà kèm ở mục Combo.';
  }

  if (/\b(?:gia|bao nhieu|tien|combo)\b/.test(question)) {
    return 'Trường Nhân có 3 combo, đều miễn phí vận chuyển toàn quốc. Combo Chạy Deadline 349.000đ kèm ly giữ nhiệt, Combo Dưỡng Nhan Thanh Khiết 359.000đ kèm mật ong, và Combo Bứt Phá Thể Lực 459.000đ kèm bình thể thao.';
  }

  return 'Mình chưa hiểu ý bạn. Bạn đang hỏi về cách dùng trà, một thành phần cụ thể hay thông tin đặt hàng?';
}

export async function POST(req: NextRequest) {
  try {
    if (Number(req.headers.get('content-length')) > 25000) {
      return NextResponse.json({ error: 'Nội dung trò chuyện quá dài' }, { status: 413 });
    }
    const raw = await req.text();
    if (raw.length > 25000) return NextResponse.json({ error: 'Nội dung trò chuyện quá dài' }, { status: 413 });
    let body;
    try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 }); }
    const messages: ChatMessage[] = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 6 ||
      messages.some((message) => !message || (message.role !== 'user' && message.role !== 'assistant') ||
        typeof message.content !== 'string' || !message.content.trim() ||
        message.content.length > (message.role === 'user' ? 500 : 5000)) ||
      messages.at(-1)?.role !== 'user') {
      return NextResponse.json(
        { error: 'Danh sách tin nhắn không hợp lệ' },
        { status: 400 }
      );
    }

    const question = normalizeQuestion(messages[messages.length - 1].content);
    const previousMessage = messages.slice(0, -1).findLast((message) => message.role === 'user');
    const previousQuestion = previousMessage ? normalizeQuestion(previousMessage.content) : '';
    const safetyReply = getSafetyReply(question, previousQuestion);
    if (safetyReply) {
      return NextResponse.json({ reply: safetyReply, source: 'smart_fallback' });
    }

    const fallbackReply = getSmartFallbackReply(question);
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    // If API key is missing, return smart conversational fallback in character
    if (!apiKey) {
      return NextResponse.json({
        reply: fallbackReply,
        source: 'smart_fallback',
      });
    }

    // Format messages for Gemini API
    const formattedContents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        signal: AbortSignal.timeout(7000),
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: formattedContents,
          generationConfig: {
            maxOutputTokens: 250,
            temperature: 0.7,
          },
        }),
      }
    ).catch(() => null);

    if (!response?.ok) {
      console.warn('Gemini API call failed:', response?.status ?? 'network error');
      return NextResponse.json({
        reply: fallbackReply,
        source: 'api_fallback',
      });
    }

    const data = await response.json().catch(() => null);
    const modelText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const textReply = typeof modelText === 'string' ? modelText.trim() : '';

    return NextResponse.json({
      reply: textReply || fallbackReply,
      source: textReply ? 'gemini' : 'api_fallback',
    });
  } catch (error) {
    console.error('Lỗi route /api/chat:', error);
    return NextResponse.json({
      reply: 'Mình chưa trả lời được lúc này. Bạn gửi lại câu hỏi sau một chút nhé.',
      source: 'error_fallback',
    });
  }
}
