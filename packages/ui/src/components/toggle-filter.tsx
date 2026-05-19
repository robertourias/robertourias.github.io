import * as React from "react";
import { cn } from "../lib/utils";

export interface ToggleFilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estado ativo do filtro. Aplica fundo primary quando `true`. */
  active?: boolean;
}

/**
 * Botão de filtro individual em formato pill. Geralmente usado dentro de um
 * `ToggleFilterGroup`. Quando standalone, controle `active` externamente.
 *
 * @example
 * ```tsx
 * // Standalone
 * <ToggleFilter active={selected} onClick={() => setSelected(!selected)}>
 *   React
 * </ToggleFilter>
 * ```
 */
const ToggleFilter = React.forwardRef<HTMLButtonElement, ToggleFilterProps>(
  ({ className, active, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex h-[30px] items-center justify-center rounded-full px-3.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
ToggleFilter.displayName = "ToggleFilter";

export interface ToggleFilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor atualmente ativo (controlado). */
  value?: string;
  /** Valor ativo inicial (não-controlado). */
  defaultValue?: string;
  /** Callback chamado quando o valor ativo muda. */
  onValueChange?: (value: string) => void;
  /**
   * Modo de seleção.
   * - `"single"` — apenas um filtro ativo por vez (deseleciona o anterior)
   * - `"multiple"` — múltiplos filtros podem estar ativos simultaneamente
   */
  mode?: "single" | "multiple";
}

/**
 * Container gerenciador de `ToggleFilter`. Controla qual filtro está ativo e
 * propaga o valor via `onValueChange`. Suporta modo single (padrão) e multiple.
 *
 * @example
 * ```tsx
 * <ToggleFilterGroup defaultValue="all" onValueChange={setFilter}>
 *   <ToggleFilter value="all">Todos</ToggleFilter>
 *   <ToggleFilter value="react">React</ToggleFilter>
 *   <ToggleFilter value="next">Next.js</ToggleFilter>
 * </ToggleFilterGroup>
 * ```
 */
const ToggleFilterGroup = React.forwardRef<HTMLDivElement, ToggleFilterGroupProps>(
  ({ className, value, defaultValue, onValueChange, mode = "single", children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? value ?? "");

    const activeValue = value !== undefined ? value : internalValue;

    const handleToggle = (itemValue: string) => {
      const next = mode === "single" && activeValue === itemValue ? "" : itemValue;
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex items-center gap-0.5 rounded-[22px] border border-border bg-muted p-0.5",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<ToggleFilterProps>(child)) return child;
          const itemValue = (child.props as { value?: string }).value ?? String(child.props.children);
          return React.cloneElement(child, {
            active: activeValue === itemValue,
            onClick: () => handleToggle(itemValue),
          } as Partial<ToggleFilterProps>);
        })}
      </div>
    );
  }
);
ToggleFilterGroup.displayName = "ToggleFilterGroup";

export { ToggleFilter, ToggleFilterGroup };
