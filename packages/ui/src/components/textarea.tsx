import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const textareaVariants = cva(
  "flex min-h-[100px] w-full rounded-lg border bg-surface px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
  {
    variants: {
      variant: {
        /** Borda neutra padrão. */
        default: "border-input",
        /** Borda e anel vermelhos para indicar erro de validação. */
        error: "border-destructive focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** Estilo visual do textarea. Use `"error"` quando houver falha de validação. */
  variant?: "default" | "error";
}

/**
 * Campo de texto multilinha com redimensionamento vertical. Use para entradas longas
 * como descrições, mensagens e comentários. Sempre use dentro de um `FormGroup`
 * para garantir label e mensagem de erro acessíveis.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Descreva seu projeto..." rows={4} />
 *
 * // Com estado de erro
 * <Textarea variant="error" value={value} onChange={onChange} />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => (
    <textarea
      className={cn(textareaVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
