"use client";

interface BpmDisplayProps {
  bpm: number;
  tempoName: string;
}

export function BpmDisplay({ bpm, tempoName }: BpmDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <span className="text-8xl font-bold tracking-tight leading-none text-foreground">
        {bpm}
      </span>
      <span className="text-sm text-muted-foreground">{tempoName}</span>
    </div>
  );
}
