"use client";

import { Checkbox, Label } from "@nico.dev/ui";

interface StressFirstBeatProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function StressFirstBeat({ checked, onChange }: StressFirstBeatProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="stress-first-beat"
        checked={checked}
        onCheckedChange={(v) => onChange(v === true)}
      />
      <Label htmlFor="stress-first-beat" className="cursor-pointer select-none">
        Stress first beat
      </Label>
    </div>
  );
}
