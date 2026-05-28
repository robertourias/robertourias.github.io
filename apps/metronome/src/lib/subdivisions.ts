export type SubdivisionId =
  | "none"
  | "duplets"
  | "triplets"
  | "quadruplets"
  | "dotted-long"
  | "dotted-short"
  | "quad-alt"
  | "sextuplets";

export interface SubdivisionPattern {
  id: SubdivisionId;
  /** Unicode musical symbol shown in the picker */
  label: string;
  /**
   * Click offsets as fractions of one beat (0 = on the beat).
   * offset 0 is always the beat itself (handled separately with beat freq).
   */
  offsets: number[];
}

export const SUBDIVISIONS: SubdivisionPattern[] = [
  { id: "none",        label: "♩",      offsets: [0] },
  { id: "duplets",     label: "♪♪",     offsets: [0, 0.5] },
  { id: "triplets",    label: "♪♪♪",    offsets: [0, 1 / 3, 2 / 3] },
  { id: "quadruplets", label: "♬♬",     offsets: [0, 0.25, 0.5, 0.75] },
  { id: "dotted-long", label: "♩.♪",    offsets: [0, 0.75] },
  { id: "dotted-short",label: "♪♩.",    offsets: [0, 0.25] },
  { id: "quad-alt",    label: "♬♬♬♬",   offsets: [0, 0.25, 0.5, 0.75] },
  { id: "sextuplets",  label: "³♬♬",    offsets: [0, 1/6, 2/6, 3/6, 4/6, 5/6] },
];

export function getSubdivisionPattern(id: SubdivisionId): SubdivisionPattern {
  return SUBDIVISIONS.find((s) => s.id === id) ?? SUBDIVISIONS[0];
}
