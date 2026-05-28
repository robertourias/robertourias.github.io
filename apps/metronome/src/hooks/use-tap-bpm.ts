import { useCallback, useRef } from "react";

const MAX_TAPS = 8;
const RESET_THRESHOLD_MS = 3000;
const MIN_BPM = 20;
const MAX_BPM = 300;

export function useTapBpm(onBpmChange: (bpm: number) => void) {
  const tapsRef = useRef<number[]>([]);

  const tap = useCallback(() => {
    const now = performance.now();
    const prev = tapsRef.current;

    // Reset if too much time passed since last tap
    if (prev.length > 0 && now - prev[prev.length - 1] > RESET_THRESHOLD_MS) {
      tapsRef.current = [];
    }

    tapsRef.current = [...tapsRef.current, now].slice(-MAX_TAPS);

    const taps = tapsRef.current;
    if (taps.length < 2) return;

    // Average interval between consecutive taps
    let totalInterval = 0;
    for (let i = 1; i < taps.length; i++) {
      totalInterval += taps[i] - taps[i - 1];
    }
    const avgInterval = totalInterval / (taps.length - 1);
    const bpm = Math.round(60000 / avgInterval);

    onBpmChange(Math.max(MIN_BPM, Math.min(MAX_BPM, bpm)));
  }, [onBpmChange]);

  return { tap };
}
