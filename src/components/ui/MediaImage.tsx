'use client';

import { useState } from 'react';
import Image, { type ImageProps, type StaticImageData } from 'next/image';
import { ImageOff } from 'lucide-react';

interface MediaImageProps extends Pick<ImageProps, 'unoptimized' | 'referrerPolicy'> {
  src: string | StaticImageData;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}

export default function MediaImage({ src, alt, sizes, preload, className, unoptimized, referrerPolicy }: MediaImageProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const sourceUrl = typeof src === 'string' ? src : src.src;

  if (failedSrc === sourceUrl) {
    return (
      <div className="flex size-full min-w-0 flex-col items-center justify-center gap-2 p-2 text-center text-sam-label text-sam-muted" aria-hidden={alt === '' || undefined}>
        <ImageOff className="size-5 shrink-0" aria-hidden="true" />
        {alt && <span>{alt} · Ảnh chưa tải được</span>}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      unoptimized={unoptimized}
      referrerPolicy={referrerPolicy}
      className={className}
      onError={() => setFailedSrc(sourceUrl)}
    />
  );
}
