'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Button from './Button';
import MediaImage from './MediaImage';
import farmImage from './media/ngoc-linh-farm.webp';

export default function VideoEmbed({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="grid min-w-0 overflow-hidden rounded-sam-lg bg-sam-action text-sam-on-action [--sam-focus-ring:var(--color-sam-yellow)]">
      {playing ? (
        <iframe
          src={url}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          className="aspect-video w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="relative grid aspect-video place-items-center p-5">
          <MediaImage src={farmImage} alt="" sizes="(max-width: 767px) calc(100vw - 2rem), 46vw" className="object-cover opacity-60" />
          <Button variant="secondary" className="z-10" onClick={() => setPlaying(true)}>
            <Play className="size-5 shrink-0" aria-hidden="true" /> Phát video giới thiệu
          </Button>
        </div>
      )}
    </div>
  );
}
