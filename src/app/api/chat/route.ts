import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
Bạn là "Giáo Sư Sâm" – linh hồn thông thái và thân thiện của thương hiệu Trà Sâm Trường Nhân.
Tính cách: Thông thái, ấm áp, trẻ trung, dùng các emoji tươi vui 🌱🍵✨.

CÁC NGUYÊN TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ):
1. ĐỘ DÀI: Trả lời DƯỚI 100 TỪ, ngắn gọn, súc tích, đi thẳng vào vấn đề.
2. TUÂN THỦ Y TẾ: Tuyệt đối dùng từ "HỖ TRỢ" (hỗ trợ tỉnh táo, hỗ trợ giảm căng thẳng, hỗ trợ bồi bổ thể lực, hỗ trợ thanh nhiệt). KHÔNG BAO GIỜ dùng từ "chữa", "trị", "điều trị".
3. THÔNG TIN DUY NHẤT:
   - Sâm Tri Thức (chạy deadline, học tập, văn phòng): Combo Chạy Deadline (2 Hộp Trà Sâm + Ly Giữ Nhiệt) giá 349.000đ.
   - Sâm Tự Nhiên (sống lành mạnh, làm đẹp, thanh nhiệt): Combo Dưỡng Nhan Thanh Khiết (2 Hộp Trà Sâm + Mật Ong Rừng) giá 359.000đ.
   - Sâm Dũng Sĩ (thể thao, vận động, sức bền): Combo Bứt Phá Thể Lực (3 Hộp Trà Sâm Đặc Biệt) giá 459.000đ.
   - Nguồn gốc: Sâm Ngọc Linh đỉnh >1.800m Kon Tum/Quảng Nam, chuẩn OCOP 4 sao, túi lọc pha trong 3 phút, 100% không chất bảo quản.
4. KÊU GỌI HÀNH ĐỘNG: Luôn khuyên người dùng bấm "Thêm vào giỏ" ở mục Combo hoặc để lại SĐT để nhận quà ưu đãi.
`.trim();

function getSmartFallbackReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('deadline') || lower.includes('tập trung') || lower.includes('mệt') || lower.includes('văn phòng') || lower.includes('học') || lower.includes('thức')) {
    return 'Chào bạn! 🌱 Nếu đang chạy deadline căng thẳng, hãy để Sâm Tri Thức đồng hành cùng bạn nhé! Combo Chạy Deadline (349k) gồm 2 hộp trà sâm kèm Ly giữ nhiệt xịn xò, hỗ trợ tỉnh táo bền bỉ chỉ sau 3 phút ủ trà. Bạn bấm "Thêm vào giỏ" ngay để nhận quà nhé! 🍵✨';
  }

  if (lower.includes('da') || lower.includes('đẹp') || lower.includes('mụn') || lower.includes('nóng') || lower.includes('thanh lọc') || lower.includes('tự nhiên')) {
    return 'Chào bạn yêu thiên nhiên! 🌸 Với nhu cầu thanh nhiệt và chăm sóc sắc đẹp, Sâm Tự Nhiên là lựa chọn hoàn hảo! Combo Dưỡng Nhan (359k) tặng kèm Mật ong rừng nguyên chất, giàu saponin hỗ trợ chống oxy hóa và giúp làn da rạng rỡ. Bấm chọn combo ngay nhé! 🍯✨';
  }

  if (lower.includes('thể thao') || lower.includes('gym') || lower.includes('chạy') || lower.includes('sức bền') || lower.includes('năng lượng') || lower.includes('mệt mỏi')) {
    return 'Chào chiến binh! ⚡ Sâm Dũng Sĩ tiếp sức cho bạn đây! Combo Bứt Phá Thể Lực (459k) - Best Seller tặng kèm bình thể thao, hỗ trợ bồi bổ thể lực và phục hồi năng lượng cực nhanh sau tập luyện. Thêm ngay vào giỏ để bứt phá giới hạn nhé! 🔥🍵';
  }

  if (lower.includes('giá') || lower.includes('bao nhiêu') || lower.includes('tiền') || lower.includes('combo')) {
    return 'Trường Nhân đang có 3 Combo OCOP ưu đãi: 🌱 Combo Chạy Deadline 349k (tặng ly), 🌸 Combo Dưỡng Nhan 359k (tặng mật ong), ⚡ Combo Dũng Sĩ 459k (tặng bình thể thao). Miễn phí ship toàn quốc! Bạn muốn Giáo Sư tư vấn combo nào? 🍵✨';
  }

  if (lower.includes('pha') || lower.includes('cách dùng') || lower.includes('dùng') || lower.includes('phút')) {
    return 'Cực kỳ tiện lợi bạn nhé! ⏱️ Chỉ cần đặt 1 túi lọc vào ly, rót 250ml nước ấm 85°C-90°C và đợi đúng 3 phút. Vị ngọt hậu tự nhiên của sâm Ngọc Linh sẽ lan tỏa, hỗ trợ năng lượng suốt cả ngày dài! 🍵🌱';
  }

  return 'Chào bạn! Giáo Sư Sâm rất vui được hỗ trợ bạn. 🌱 Trà Sâm Ngọc Linh Trường Nhân đạt chuẩn OCOP 4 sao, túi lọc 3 phút tiện lợi hỗ trợ tỉnh táo và tăng cường sức khỏe. Bạn đang quan tâm đến học tập, làm đẹp hay rèn luyện thể thao để Giáo Sư gợi ý combo tốt nhất nhé? 🍵✨';
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
    const messages = body?.messages;

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

    const latestUserMessage = messages[messages.length - 1].content;

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    // If API key is missing, return smart conversational fallback in character
    if (!apiKey) {
      const fallbackReply = getSmartFallbackReply(latestUserMessage);
      return NextResponse.json({
        reply: fallbackReply,
        source: 'smart_fallback',
      });
    }

    // Format messages for Gemini API
    const formattedContents = messages.slice(-6).map((m: { role: string; content: string }) => ({
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
    );

    if (!response.ok) {
      console.warn('Gemini API call failed with status:', response.status);
      const fallbackReply = getSmartFallbackReply(latestUserMessage);
      return NextResponse.json({
        reply: fallbackReply,
        source: 'api_fallback',
      });
    }

    const data = await response.json();
    const textReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      getSmartFallbackReply(latestUserMessage);

    return NextResponse.json({
      reply: textReply,
      source: 'gemini',
    });
  } catch (error) {
    console.error('Lỗi route /api/chat:', error);
    return NextResponse.json({
      reply:
        'Giáo Sư Sâm đang kiểm tra vườn sâm trên đỉnh Ngọc Linh một chút 🌱 Bạn hãy nhâm nhi một tách trà ấm và thử lại câu hỏi sau giây lát nhé! 🍵✨',
      source: 'error_fallback',
    });
  }
}
