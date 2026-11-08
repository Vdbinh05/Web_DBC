'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Button from './Button';

export default function VideoEmbed({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="grid min-w-0 overflow-hidden rounded-sam-lg bg-sam-action text-sam-on-action [--sam-focus-ring:var(--color-sam-yellow)]">
      {playing ? (
        <iframe
          src={url}
          title="Giới thiệu Trà Sâm Trường Nhân"
          className="aspect-video w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="grid min-h-36 place-items-center p-5 sm:aspect-video">
          <Button variant="secondary" onClick={() => setPlaying(true)}>
            <Play className="size-5 shrink-0" aria-hidden="true" /> Phát video giới thiệu
          </Button>
        </div>
      )}
    </div>
  );
}
