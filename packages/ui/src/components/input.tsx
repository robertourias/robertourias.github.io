import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const inputVariants = cva(
  "flex h-9 w-full rounded-lg border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Estilo visual do input. Use `"error"` quando houver falha de validação. */
  variant?: "default" | "error";
}

/**
 * Campo de texto de linha única. Suporta todos os tipos nativos de `<input>`
 * (text, email, password, number, etc.) e dois estados visuais: padrão e erro.
 * Sempre use dentro de um `FormGroup` para garantir label e mensagem de erro acessíveis.
 *
 * @example
 * ```tsx
 * <Input placeholder="seu@email.com" type="email" />
 *
 * // Com estado de erro
 * <Input variant="error" value={value} onChange={onChange} />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(inputVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input, inputVariants };
