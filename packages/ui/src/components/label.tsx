import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../lib/utils";

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Exibe um asterisco vermelho ao lado do texto para indicar campo obrigatório. */
  required?: boolean;
}

/**
 * Rótulo acessível para campos de formulário. Associa texto descritivo a um controle
 * via `htmlFor`, garantindo compatibilidade com leitores de tela.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">E-mail</Label>
 * <Input id="email" type="email" />
 *
 * // Com campo obrigatório
 * <Label htmlFor="name" required>Nome</Label>
 * ```
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="ml-1 text-destructive">*</span>}
  </LabelPrimitive.Root>
));
Label.displayName = "Label";

export { Label };
