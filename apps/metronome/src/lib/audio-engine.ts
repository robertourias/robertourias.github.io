/**
 * Schedules a short percussive click via Web Audio API.
 * Uses oscillator + gain envelope (ramp up, exponential decay).
 * All timing is in AudioContext seconds to stay drift-free.
 */
export function createClick(
  ctx: AudioContext,
  freq: number,
  duration: number,
  time: number
): void {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.8, time + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + duration + 0.002);
  } catch {
    // AudioContext may be closed/suspended — safe to ignore
  }
}
