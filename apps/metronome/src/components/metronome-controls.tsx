"use client";

import { Play, Square, Ear } from "lucide-react";
import { Button } from "@nico.dev/ui";

interface MetronomeControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
  onTap: () => void;
}

export function MetronomeControls({
  isPlaying,
  onToggle,
  onTap,
}: MetronomeControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <Button size="lg" onClick={onToggle} className="min-w-32">
        {isPlaying ? (
          <>
            <Square className="w-4 h-4 fill-current" />
            Stop
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            Start
          </>
        )}
      </Button>

      <Button variant="secondary" size="lg" onClick={onTap} className="min-w-32">
        <Ear className="w-4 h-4" />
        Tap BPM
      </Button>
    </div>
  );
}
