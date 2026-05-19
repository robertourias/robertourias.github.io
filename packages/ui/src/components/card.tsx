import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Container com borda, fundo `surface` e cantos arredondados. Use como base para
 * qualquer bloco de conteúdo agrupado: perfil, resumo, configuração ou painel.
 * Compose com `CardHeader`, `CardContent` e `CardFooter`.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Título</CardTitle>
 *     <CardDescription>Descrição opcional</CardDescription>
 *   </CardHeader>
 *   <CardContent>Conteúdo principal</CardContent>
 *   <CardFooter>
 *     <Button>Ação</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-surface text-foreground",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/** Área de cabeçalho do Card com padding e espaçamento vertical para título e descrição. */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-5 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/** Título do Card. Renderizado como `<h3>` com estilo semibold. */
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-base font-semibold leading-none", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/** Texto descritivo secundário abaixo do título, em `muted-foreground`. */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/** Área de conteúdo principal do Card, separada do header por uma borda superior. */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border-t border-border px-5 py-4", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

/** Rodapé do Card para ações (botões, links). Separado do conteúdo por borda superior. */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center border-t border-border px-5 py-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
