'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronRight, Glasses, Leaf, RotateCcw, ShoppingBag, Zap } from 'lucide-react';
import { MASCOTS, QUIZ_QUESTIONS, type Mascot } from '@/data/mascots';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/format';
import { trackCommerce } from '@/lib/commerce-analytics';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MediaImage from '@/components/ui/MediaImage';
import { MASCOT_PORTRAITS } from '@/components/ui/mascot-portraits';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const MASCOT_ICONS = { 'tri-thuc': Glasses, 'tu-nhien': Leaf, 'dung-si': Zap };

export default function MascotStoryTabs() {
  const [selectedMascotId, setSelectedMascotId] = useState<Mascot['id']>('tri-thuc');
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Mascot['id'][]>([]);
  const [quizResultMascot, setQuizResultMascot] = useState<Mascot['id'] | null>(null);
  const quizHeading = useRef<HTMLHeadingElement>(null);
  const quizTrigger = useRef<HTMLButtonElement>(null);
  const restoreQuizFocus = useRef(false);
  const addItem = useCartStore((state) => state.addItem);
  const mascot = MASCOTS.find((item) => item.id === selectedMascotId) ?? MASCOTS[0];
  const quizResult = MASCOTS.find((item) => item.id === quizResultMascot);
  const question = QUIZ_QUESTIONS[quizStep];

  useEffect(() => {
    if (isQuizActive) {
      quizHeading.current?.focus();
    } else if (restoreQuizFocus.current) {
      restoreQuizFocus.current = false;
      quizTrigger.current?.focus();
    }
  }, [isQuizActive, quizStep]);

  function startQuiz() {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResultMascot(null);
    setIsQuizActive(true);
  }

  function closeQuiz() {
    restoreQuizFocus.current = true;
    setIsQuizActive(false);
  }

  function selectQuizOption(mascotTarget: Mascot['id']) {
    const updatedAnswers = [...quizAnswers, mascotTarget];
    setQuizAnswers(updatedAnswers);

    if (quizStep + 1 < QUIZ_QUESTIONS.length) {
      setQuizStep(quizStep + 1);
      return;
    }

    const counts = { 'tri-thuc': 0, 'tu-nhien': 0, 'dung-si': 0 };
    for (const answer of updatedAnswers) counts[answer]++;
    const bestMatch = MASCOTS.reduce((best, item) => counts[item.id] > counts[best.id] ? item : best);
    setSelectedMascotId(bestMatch.id);
    setQuizResultMascot(bestMatch.id);
    closeQuiz();
  }

  return (
    <Section id="mascots" aria-labelledby="mascot-title" className="bg-sam-paper">
      <SectionHeader
        titleId="mascot-title"
        title="Bạn thích thưởng trà theo cách nào?"
        subtitle="Gặp ba mascot Trường Nhân và tìm một combo cho giờ nghỉ giữa buổi, lúc thưởng trà ở nhà hoặc khi đi xa."
        align="start"
      >
        <div className="max-w-2xl">
          {isQuizActive ? (
            <Card className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sam-label font-semibold text-sam-muted">Câu hỏi {quizStep + 1}/{QUIZ_QUESTIONS.length}</p>
                <Button variant="ghost" size="sm" onClick={closeQuiz}>Hủy trắc nghiệm</Button>
              </div>
              <h3 ref={quizHeading} tabIndex={-1} className="sam-anchor sam-focus font-heading text-sam-subheading font-semibold">
                {question.question}
              </h3>
              <div className="grid gap-2">
                {question.options.map((option) => {
                  const Icon = MASCOT_ICONS[option.targetMascot];
                  return (
                    <Button
                      key={option.targetMascot}
                      variant="secondary"
                      className="w-full justify-start text-start"
                      onClick={() => selectQuizOption(option.targetMascot)}
                    >
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1">{option.text}</span>
                      <ChevronRight className="size-4 shrink-0" aria-hidden="true" />
                    </Button>
                  );
                })}
              </div>
            </Card>
          ) : (
            <Button ref={quizTrigger} variant="secondary" onClick={startQuiz}>
              {quizResult ? <><RotateCcw className="size-4 shrink-0" aria-hidden="true" /> Làm lại trắc nghiệm</> : 'Làm trắc nghiệm 3 câu'}
            </Button>
          )}
          <p aria-live="polite" className="text-sam-label text-sam-action empty:m-0 not-empty:mt-3">
            {quizResult && <>Gợi ý phù hợp nhất với bạn: <strong>{quizResult.name}</strong></>}
          </p>
        </div>
      </SectionHeader>

      <div role="group" aria-label="Chọn mascot" className="mb-5 flex flex-wrap items-center gap-2">
        {MASCOTS.map((item) => {
          const selected = item.id === mascot.id;
          const Icon = MASCOT_ICONS[item.id];
          return (
            <Button
              key={item.id}
              size="sm"
              variant={selected ? 'primary' : 'secondary'}
              aria-pressed={selected}
              aria-controls="mascot-profile"
              onClick={() => setSelectedMascotId(item.id)}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {item.name}
              {selected && <Check className="size-4 shrink-0" aria-hidden="true" />}
            </Button>
          );
        })}
      </div>

      <Card as="article" id="mascot-profile" aria-labelledby="mascot-name" className="grid items-start gap-6 p-4 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] md:gap-8 md:p-7">
        <figure className="min-w-0">
          <div className="relative aspect-[5/4] overflow-hidden rounded-sam-md bg-sam-paper">
            <MediaImage
              src={MASCOT_PORTRAITS[mascot.id]}
              alt={mascot.name}
              sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1100px) 40vw, 450px"
              className="object-contain p-3 sm:p-5"
            />
          </div>
          <figcaption className="sam-caption">{mascot.badgeText}</figcaption>
        </figure>

        <div className="min-w-0">
          <h3 id="mascot-name" className="font-heading text-sam-heading font-semibold">{mascot.name}</h3>
          <p className="mt-1 text-sam-label font-semibold text-sam-action">{mascot.role} · {mascot.tagline}</p>
          <p className="mt-3 max-w-[62ch] text-sam-body text-sam-ink">{mascot.description}</p>
          <p className="mt-3 text-sam-label text-sam-muted"><strong>Phù hợp nhất:</strong> {mascot.target}</p>
          <ul className="mt-4 grid gap-2 text-sam-label text-sam-ink">
            {mascot.traits.map((trait) => (
              <li key={trait} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-sam-action" aria-hidden="true" />
                {trait}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-5 gap-y-3 border-t border-sam-line pt-4">
            <div className="min-w-0">
              <p className="text-sam-label text-sam-muted">Combo đề xuất</p>
              <p className="text-sam-label font-semibold text-sam-action">{mascot.recommendedCombo.name}</p>
              <p className="text-sam-body font-semibold tabular-nums text-sam-action">{formatCurrency(mascot.recommendedCombo.price)}</p>
            </div>
            <Button
              onClick={() => {
                const product = mascot.recommendedCombo;
                addItem(product);
                trackCommerce('add_to_cart', {
                  value: product.price,
                  items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }],
                });
              }}
              aria-label={`Thêm ${mascot.recommendedCombo.name} vào giỏ hàng từ gợi ý`}
            >
              <ShoppingBag className="size-4 shrink-0" aria-hidden="true" /> Thêm combo đề xuất
            </Button>
          </div>
        </div>
      </Card>
    </Section>
  );
}
