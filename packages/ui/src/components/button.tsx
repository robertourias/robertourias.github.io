import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Fundo primary. Use para a ação principal — máximo um por seção. */
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
        /** Fundo secondary (roxo). Para ações complementares à principal. */
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90 shadow-sm",
        /** Borda visível, fundo surface. Para ações neutras e terciárias. */
        outline: "border border-border bg-surface text-foreground hover:bg-surface-raised hover:text-foreground shadow-sm",
        /** Sem fundo, sem borda. Para ações sutis em toolbars e menus. */
        ghost: "text-foreground hover:bg-surface-raised hover:text-foreground",
        /** Fundo vermelho. Sempre exibir diálogo de confirmação antes da ação. */
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90 shadow-sm",
        /** Aparência de link com underline no hover. Para navegação inline. */
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        /** Compacto para toolbars e contextos densos. */
        sm: "h-8 px-3 text-xs",
        /** Tamanho padrão para a maioria dos casos. */
        md: "h-9 px-4 py-2",
        /** Prominente para CTAs e ações principais em páginas. */
        lg: "h-11 px-6 text-base",
        /** Quadrado para botões com apenas ícone. */
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Estilo visual do botão.
   * - `"default"` — ação primária (use com moderação, máx. um por seção)
   * - `"secondary"` — ação complementar
   * - `"outline"` — ação neutra ou terciária
   * - `"ghost"` — ação sutil (toolbars, menus)
   * - `"destructive"` — ação irreversível (sempre pedir confirmação)
   * - `"link"` — navegação inline
   */
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  /** Tamanho do botão. `"md"` na maioria dos casos; `"sm"` em contextos compactos; `"icon"` para botões só com ícone. */
  size?: "sm" | "md" | "lg" | "icon";
  /** Renderiza o filho como elemento raiz via Radix Slot. Útil para usar `<Link>` com estilo de botão. */
  asChild?: boolean;
}

/**
 * Elemento interativo primário para ações do usuário. Seis variantes visuais
 * (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`) e quatro tamanhos
 * (`sm`, `md`, `lg`, `icon`). Sempre exibir loading state durante ações assíncronas.
 *
 * @example
 * ```tsx
 * <Button>Salvar</Button>
 * <Button variant="outline" size="sm">Cancelar</Button>
 * <Button variant="destructive">Excluir conta</Button>
 *
 * // Com Next.js Link
 * <Button asChild>
 *   <Link href="/dashboard">Ir para dashboard</Link>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
