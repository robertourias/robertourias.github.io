import * as React from "react";
import { cn } from "../lib/utils";

export interface HeatmapEntry {
  /** Data no formato `"YYYY-MM-DD"`. */
  date: string;
  /** Valor numérico da atividade. Zero representa ausência de atividade. */
  value: number;
}

export interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array de entradas de atividade. Cada entrada representa um dia. */
  data: HeatmapEntry[];
  /** Título exibido acima do heatmap. Padrão: `"Contribution Activity"`. */
  title?: string;
  /** Exibe legenda "Less/More" abaixo do heatmap. Padrão: `true`. */
  showLegend?: boolean;
  /**
   * Escala de 5 cores CSS para os níveis de intensidade (0=sem atividade, 4=máximo).
   * Padrão: gradiente do token `primary` com transparência.
   */
  colorScale?: [string, string, string, string, string];
}

const DEFAULT_SCALE: [string, string, string, string, string] = [
  "var(--muted)",
  "color-mix(in srgb, var(--primary) 30%, transparent)",
  "color-mix(in srgb, var(--primary) 50%, transparent)",
  "color-mix(in srgb, var(--primary) 70%, transparent)",
  "var(--primary)",
];

function getLevel(value: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (value === 0 || max === 0) return 0;
  const ratio = value / max;
  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;
  return 4;
}

function buildWeekColumns(data: HeatmapEntry[]): HeatmapEntry[][] {
  if (data.length === 0) return [];
  const columns: HeatmapEntry[][] = [];
  let col: HeatmapEntry[] = [];
  data.forEach((entry, i) => {
    col.push(entry);
    if (col.length === 7 || i === data.length - 1) {
      columns.push(col);
      col = [];
    }
  });
  return columns;
}

/**
 * Visualização de atividade no estilo GitHub contribution graph. Exibe dados diários
 * agrupados em colunas semanais com intensidade de cor proporcional ao valor.
 * Ideal para exibir histórico de contribuições, frequência de uso ou qualquer
 * métrica com granularidade diária ao longo de semanas.
 *
 * @example
 * ```tsx
 * const data = Array.from({ length: 91 }, (_, i) => ({
 *   date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
 *   value: Math.floor(Math.random() * 10),
 * }));
 *
 * <Heatmap data={data} title="Atividade recente" />
 * ```
 */
function Heatmap({
  data,
  title = "Contribution Activity",
  showLegend = true,
  colorScale = DEFAULT_SCALE,
  className,
  ...props
}: HeatmapProps) {
  const max = Math.max(...data.map((d) => d.value), 0);
  const columns = buildWeekColumns(data);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-3 inline-flex flex-col gap-1.5",
        className
      )}
      {...props}
    >
      {title && (
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {title}
        </p>
      )}

      <div className="flex gap-[3px]">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((entry) => {
              const level = getLevel(entry.value, max);
              return (
                <div
                  key={entry.date}
                  title={`${entry.date}: ${entry.value}`}
                  className="h-3 w-3 rounded-[2px]"
                  style={{ backgroundColor: colorScale[level] }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {showLegend && (
        <div className="flex items-center justify-end gap-1">
          <span className="text-[10px] text-muted-foreground">Less</span>
          {colorScale.map((color, i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-[10px] text-muted-foreground">More</span>
        </div>
      )}
    </div>
  );
}

export { Heatmap };
