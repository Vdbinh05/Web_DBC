'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

// Global Lenis instance for pausing/resuming during modal/drawer states
export let globalLenis: Lenis | null = null;

export function pauseLenis(): void {
  if (globalLenis) {
    globalLenis.stop();
  }
}

export function resumeLenis(): void {
  if (globalLenis) {
    globalLenis.start();
  }
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    function syncScrollPreference() {
      globalLenis?.destroy();
      globalLenis = mediaQuery.matches ? null : new Lenis({
        autoRaf: true,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      if (document.querySelector('.sam-dialog[open]')) globalLenis?.stop();
    }

    syncScrollPreference();
    mediaQuery.addEventListener('change', syncScrollPreference);
    return () => {
      mediaQuery.removeEventListener('change', syncScrollPreference);
      globalLenis?.destroy();
      globalLenis = null;
    };
  }, []);

  return <>{children}</>;
}
