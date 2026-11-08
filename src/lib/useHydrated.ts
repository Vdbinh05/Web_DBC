import { useSyncExternalStore } from 'react';

function emptySubscribe() {
  return () => {};
}

/**
 * Returns true once hydrated on client, false during SSR
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
