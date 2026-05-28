"use client";

import { Checkbox, Input, Label } from "@nico.dev/ui";

interface TimerControlProps {
  enabled: boolean;
  onEnabledChange: (v: boolean) => void;
  totalSeconds: number;
  onTotalSecondsChange: (s: number) => void;
  remainingSeconds: number;
  isPlaying: boolean;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function parseTime(value: string): number | null {
  const match = value.match(/^(\d+):([0-5]\d)$/);
  if (!match) return null;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

export function TimerControl({
  enabled,
  onEnabledChange,
  totalSeconds,
  onTotalSecondsChange,
  remainingSeconds,
  isPlaying,
}: TimerControlProps) {
  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseTime(e.target.value);
    if (parsed !== null && parsed > 0) onTotalSecondsChange(parsed);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Checkbox
          id="timer"
          checked={enabled}
          onCheckedChange={(v) => onEnabledChange(v === true)}
        />
        <Label htmlFor="timer" className="cursor-pointer select-none">
          Timer
        </Label>
      </div>

      {enabled && (
        <div className="text-sm tabular-nums font-medium">
          {isPlaying ? (
            <span
              className={remainingSeconds <= 10 ? "text-destructive" : "text-foreground"}
            >
              {formatTime(remainingSeconds)}
            </span>
          ) : (
            <Input
              className="w-20 h-7 text-center text-sm px-2"
              defaultValue={formatTime(totalSeconds)}
              onBlur={handleTimeInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              aria-label="Duração do timer"
            />
          )}
        </div>
      )}
    </div>
  );
}
