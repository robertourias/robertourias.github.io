"use client";

interface BeatsControlProps {
  beats: number;
  onChange: (beats: number) => void;
}

export function BeatsControl({ beats, onChange }: BeatsControlProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-foreground cursor-default select-none">Beats</span>
      <div className="flex items-center gap-3">
        <button
          aria-label="Diminuir beats"
          disabled={beats <= 1}
          onClick={() => onChange(beats - 1)}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <span className="text-base leading-none select-none">−</span>
        </button>

        <span className="w-5 text-center text-sm font-semibold tabular-nums">
          {beats}
        </span>

        <button
          aria-label="Aumentar beats"
          disabled={beats >= 12}
          onClick={() => onChange(beats + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <span className="text-base leading-none select-none">+</span>
        </button>
      </div>
    </div>
  );
}
