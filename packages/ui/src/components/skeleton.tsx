import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      /** Barra de texto de largura total. Para títulos e parágrafos. */
      line: "h-3 w-full",
      /** Barra de texto com metade da largura. Para última linha de parágrafo. */
      "line-short": "h-3 w-1/2",
      /** Círculo para avatar ou ícone. */
      circle: "h-10 w-10 rounded-full",
      /** Card completo com avatar, linhas de texto e botão. */
      card: "",
    },
  },
  defaultVariants: { variant: "line" },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Forma do esqueleto de carregamento.
   * - `"line"` — barra larga (título ou texto)
   * - `"line-short"` — barra meia-largura (fim de parágrafo)
   * - `"circle"` — círculo (avatar)
   * - `"card"` — card composto com avatar + linhas + botão
   */
  variant?: "line" | "line-short" | "circle" | "card";
}

/**
 * Placeholder animado para indicar carregamento de conteúdo. Prefira sobre spinners
 * em áreas de conteúdo — reduz o deslocamento de layout (CLS) e melhora a percepção
 * de velocidade.
 *
 * @example
 * ```tsx
 * // Linha de texto
 * <Skeleton variant="line" />
 *
 * // Avatar
 * <Skeleton variant="circle" />
 *
 * // Card completo
 * <Skeleton variant="card" className="w-64" />
 * ```
 */
function Skeleton({ className, variant, ...props }: SkeletonProps) {
  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-surface p-4 flex flex-col gap-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full animate-pulse bg-muted shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-2.5 w-[120px] animate-pulse rounded-md bg-muted" />
          </div>
        </div>
        <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-3 w-[160px] animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
