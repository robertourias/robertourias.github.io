import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Locale } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "./calendar";
import { cn } from "../lib/utils";

export interface DatePickerProps {
  /** Data selecionada (controlado). */
  value?: Date;
  /** Callback chamado quando o usuário seleciona uma data. Recebe `undefined` ao limpar. */
  onChange?: (date: Date | undefined) => void;
  /** Texto exibido no botão quando nenhuma data está selecionada. */
  placeholder?: string;
  /** Locale para formatação da data e textos do calendário. Padrão: `ptBR`. */
  locale?: Locale;
  /** Desabilita o picker quando `true`. */
  disabled?: boolean;
  /** Classe CSS adicional para o container. */
  className?: string;
}

/**
 * Input de data com calendário suspenso. Formata a data selecionada como `dd/MM/yyyy`
 * e fecha o calendário automaticamente ao selecionar uma data ou clicar fora.
 * Para seleção de intervalos ou calendário sempre visível, use `Calendar` diretamente.
 *
 * @example
 * ```tsx
 * const [date, setDate] = React.useState<Date>();
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Selecione uma data"
 * />
 * ```
 */
function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  locale = ptBR,
  disabled,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    setOpen(false);
  };

  const displayValue = value
    ? format(value, "dd/MM/yyyy", { locale })
    : undefined;

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-surface px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          !displayValue && "text-muted-foreground"
        )}
      >
        <span className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          {displayValue ?? placeholder}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export { DatePicker };
