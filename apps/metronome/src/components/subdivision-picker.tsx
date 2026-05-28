"use client";

import { SUBDIVISIONS, type SubdivisionId } from "@/lib/subdivisions";

interface SubdivisionPickerProps {
  selected: SubdivisionId;
  onChange: (id: SubdivisionId) => void;
}

export function SubdivisionPicker({ selected, onChange }: SubdivisionPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">Subdivisions</span>
      <div className="grid grid-cols-4 gap-2">
        {SUBDIVISIONS.map((s) => {
          const isSelected = s.id === selected;
          return (
            <button
              key={s.id}
              aria-label={s.id}
              aria-pressed={isSelected}
              onClick={() => onChange(s.id)}
              className={[
                "h-10 rounded-lg text-xl flex items-center justify-center transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-surface-raised",
              ].join(" ")}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
