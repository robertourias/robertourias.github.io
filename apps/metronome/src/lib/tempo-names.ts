const TEMPO_MARKS = [
  { min: 200, name: "Presto" },
  { min: 168, name: "Vivace" },
  { min: 140, name: "Allegro" },
  { min: 120, name: "Allegretto" },
  { min: 108, name: "Moderato" },
  { min: 76,  name: "Andante" },
  { min: 66,  name: "Adagio" },
  { min: 60,  name: "Larghetto" },
  { min: 40,  name: "Largo" },
  { min: 0,   name: "Larghissimo" },
] as const;

export function getTempoName(bpm: number): string {
  return TEMPO_MARKS.find((t) => bpm >= t.min)?.name ?? "Larghissimo";
}
