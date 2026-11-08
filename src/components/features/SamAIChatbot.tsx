'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import MediaImage from '@/components/ui/MediaImage';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [{
  id: 'intro',
  role: 'assistant',
  content: 'Chào bạn! Mình là Giáo Sư Sâm Trường Nhân. Bạn muốn hỏi về các combo, ba mascot hay cách pha trà túi lọc trong 3 phút?',
}];

const SUGGESTIONS = [
  'Tôi hay thức khuya chạy deadline',
  'Combo nào hỗ trợ làn da tươi tắn?',
  'Tôi chơi thể thao cần bứt phá thể lực',
  'Pha trà sâm túi lọc thế nào chuẩn vị?',
];
const MESSAGE_LIMIT = 500;
const HISTORY_LIMIT = 6;

export default function SamAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyFailed, setReplyFailed] = useState(false);
  const [inputError, setInputError] = useState('');
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const messageId = useRef(0);
  const id = useId();

  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  useEffect(() => {
    const history = historyRef.current;
    if (isOpen && history && messages.length > 1) history.scrollTop = history.scrollHeight;
  }, [isOpen, messages, isLoading, replyFailed]);

  function closeChat() {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  }

  async function requestReply(history: ChatMessage[]) {
    if (requestRef.current) return;
    const controller = new AbortController();
    requestRef.current = controller;
    setReplyFailed(false);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (controller.signal.aborted) return;
      if (!response.ok || data?.source === 'error_fallback' || typeof data?.reply !== 'string' || !data.reply.trim()) {
        setReplyFailed(true);
        return;
      }
      const reply: ChatMessage = { id: `assistant-${++messageId.current}`, role: 'assistant', content: data.reply };
      setMessages((current) => [...current, reply].slice(-HISTORY_LIMIT));
    } catch {
      if (!controller.signal.aborted) setReplyFailed(true);
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsLoading(false);
      }
    }
  }

  function sendMessage(value: string) {
    const text = value.trim();
    if (!text || requestRef.current) return;
    if (text.length > MESSAGE_LIMIT) {
      setInputError('Rút gọn câu hỏi còn tối đa 500 ký tự.');
      inputRef.current?.focus();
      return;
    }

    const userMessage: ChatMessage = { id: `user-${++messageId.current}`, role: 'user', content: text };
    const history = [...messages, userMessage].slice(-HISTORY_LIMIT);
    setMessages(history);
    setInput('');
    setInputError('');
    void requestReply(history);
  }

  function resetChat() {
    requestRef.current?.abort();
    requestRef.current = null;
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setInputError('');
    setReplyFailed(false);
    setIsLoading(false);
    historyRef.current?.scrollTo({ top: 0 });
  }

  return (
    <div className="fixed end-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-(--sam-z-floating) sm:end-6">
      {isOpen ? (
        <section
          id={`${id}-panel`}
          role="dialog"
          data-clarity-mask="True"
          aria-labelledby={`${id}-title`}
          className="flex max-h-[min(36rem,calc(100dvh-2rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-sam-lg border border-sam-line bg-sam-canvas shadow-sam-overlay"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              closeChat();
            }
          }}
        >
          <header className="flex shrink-0 items-center gap-2 border-b border-sam-line bg-sam-surface px-3 py-2">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-sam-sm bg-sam-paper">
              <MediaImage src="/images/mascots/tri-thuc-front.webp" alt="" sizes="36px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id={`${id}-title`} className="font-heading text-sam-subheading font-semibold">Giáo Sư Sâm AI</h2>
              <p className="text-sam-label text-sam-muted">Hỏi về trà và các combo</p>
            </div>
            <Button size="sm" variant="ghost" className="shrink-0 px-2" onClick={resetChat} aria-label="Làm mới cuộc trò chuyện">
              <RotateCcw className="size-4" aria-hidden="true" />
            </Button>
            <Button ref={closeRef} size="sm" variant="ghost" className="shrink-0 px-2" onClick={closeChat} aria-label="Đóng khung chat">
              <X className="size-5" aria-hidden="true" />
            </Button>
          </header>

          <div ref={historyRef} data-lenis-prevent tabIndex={0} role="region" aria-label="Nội dung trò chuyện" className="sam-focus min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 focus-visible:-outline-offset-2">
            <details className="rounded-sam-sm border border-sam-line bg-sam-surface">
              <summary className="sam-focus min-h-(--spacing-sam-touch) cursor-pointer rounded-sam-sm px-3 py-2.5 text-sam-label font-semibold text-sam-action hover:bg-sam-paper active:bg-sam-disabled">Câu hỏi gợi ý</summary>
              <div className="grid gap-2 px-2 pb-2">
                {SUGGESTIONS.map((suggestion) => (
                  <Button key={suggestion} size="sm" variant="ghost" className="justify-start text-start" disabled={isLoading} onClick={() => { historyRef.current?.focus({ preventScroll: true }); sendMessage(suggestion); }}>
                    {suggestion}
                  </Button>
                ))}
              </div>
            </details>

            <div role="log" aria-label="Tin nhắn trò chuyện" className="grid gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[90%] rounded-sam-md px-3 py-2 text-sam-label ${message.role === 'user' ? 'justify-self-end bg-sam-action text-sam-on-action' : 'justify-self-start border border-sam-line bg-sam-surface text-sam-ink'}`}
                >
                  <p className="mb-1 font-semibold">{message.role === 'user' ? 'Bạn' : 'Giáo Sư Sâm'}</p>
                  <p className="wrap-anywhere whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
            </div>

            <p role="status" className={isLoading ? 'text-sam-label text-sam-muted' : 'sr-only'}>
              {isLoading ? 'Giáo Sư Sâm đang trả lời…' : ''}
            </p>
            <div role="alert" className={replyFailed ? 'space-y-2 rounded-sam-sm bg-sam-error-bg p-3 text-sam-label text-sam-error' : 'sr-only'}>
              {replyFailed && <p>Chưa nhận được phản hồi. Bạn có thể gửi lại câu hỏi.</p>}
            </div>
            {replyFailed && <Button size="sm" variant="secondary" onClick={() => { historyRef.current?.focus({ preventScroll: true }); void requestReply(messages); }}>Thử lại</Button>}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); inputRef.current?.focus({ preventScroll: true }); sendMessage(input); }} className="shrink-0 border-t border-sam-line bg-sam-surface px-3 py-2">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <Input
                  ref={inputRef}
                  label="Câu hỏi của bạn"
                  name="message"
                  autoComplete="off"
                  maxLength={MESSAGE_LIMIT}
                  placeholder="Ví dụ: Pha trà thế nào?"
                  value={input}
                  error={inputError}
                  aria-describedby={`${id}-limit`}
                  onChange={(event) => { setInput(event.target.value); setInputError(''); }}
                />
              </div>
              <Button type="submit" size="sm" className="mt-6 shrink-0 px-2" disabled={isLoading || !input.trim()} aria-label="Gửi tin nhắn">
                <Send className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <p id={`${id}-limit`} className="mt-1 flex flex-wrap justify-between gap-1 text-xs text-sam-muted tabular-nums">
              <span>Tránh nhập thông tin cá nhân.</span><span>{input.length}/{MESSAGE_LIMIT} ký tự</span>
            </p>
          </form>
        </section>
      ) : (
        <Button
          ref={launcherRef}
          className="size-12 rounded-sam-md px-2 shadow-sam-raised"
          aria-label="Mở khung trò chuyện với Giáo Sư Sâm AI"
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="size-5" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
