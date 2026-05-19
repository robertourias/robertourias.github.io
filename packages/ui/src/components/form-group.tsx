import * as React from "react";
import { cn } from "../lib/utils";
import { Label } from "./label";

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Texto do label associado ao campo filho. */
  label: string;
  /** ID do campo filho. Liga o label ao input via `htmlFor`. */
  htmlFor?: string;
  /** Mensagem de erro de validação. Quando presente, o label fica vermelho e a mensagem é exibida abaixo. */
  error?: string;
  /** Texto de dica exibido abaixo do campo quando não há erro. */
  hint?: string;
  /** Exibe asterisco vermelho no label para indicar campo obrigatório. */
  required?: boolean;
}

/**
 * Wrapper de campo de formulário que combina `Label`, o campo filho (Input, Textarea, etc.),
 * mensagem de hint e mensagem de erro em uma unidade acessível. Use como bloco
 * padrão para qualquer campo de formulário no design system.
 *
 * @example
 * ```tsx
 * <FormGroup label="E-mail" htmlFor="email" required>
 *   <Input id="email" type="email" placeholder="seu@email.com" />
 * </FormGroup>
 *
 * // Com erro de validação
 * <FormGroup label="Senha" htmlFor="password" error="Mínimo de 8 caracteres">
 *   <Input id="password" type="password" variant="error" />
 * </FormGroup>
 *
 * // Com dica
 * <FormGroup label="Usuário" htmlFor="username" hint="Apenas letras minúsculas e números">
 *   <Input id="username" />
 * </FormGroup>
 * ```
 */
const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, label, htmlFor, error, hint, required, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
      <Label
        htmlFor={htmlFor}
        required={required}
        className={cn(error && "text-destructive")}
      >
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
);
FormGroup.displayName = "FormGroup";

export { FormGroup };
