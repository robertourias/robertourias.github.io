import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Componente de navegação por abas construído sobre Radix UI. Duas variantes de estilo:
 * `pill` (abas destacadas em container) e `underline` (abas com borda inferior).
 * A variante deve ser aplicada tanto em `TabsList` quanto em `TabsTrigger`.
 *
 * @example
 * ```tsx
 * // Variante pill (padrão)
 * <Tabs defaultValue="perfil">
 *   <TabsList>
 *     <TabsTrigger value="perfil">Perfil</TabsTrigger>
 *     <TabsTrigger value="segurança">Segurança</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="perfil">Conteúdo do perfil</TabsContent>
 *   <TabsContent value="segurança">Conteúdo de segurança</TabsContent>
 * </Tabs>
 *
 * // Variante underline
 * <Tabs defaultValue="a">
 *   <TabsList variant="underline" className="w-full">
 *     <TabsTrigger value="a" variant="underline">Aba A</TabsTrigger>
 *     <TabsTrigger value="b" variant="underline">Aba B</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="a">Conteúdo A</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      /** Abas dentro de um container arredondado com fundo muted. */
      pill: "gap-0.5 rounded-[10px] bg-muted p-1",
      /** Abas alinhadas horizontalmente com borda inferior como indicador ativo. */
      underline: "flex-col gap-0 w-full",
    },
  },
  defaultVariants: { variant: "pill" },
});

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-[13px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Aba arredondada com fundo surface quando ativa. */
        pill: "rounded-[7px] px-3 h-8 font-normal text-muted-foreground data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:shadow-sm",
        /** Aba com borda inferior primary quando ativa, ocupa largura total. */
        underline: "w-full px-3 pb-0 pt-2 font-normal text-muted-foreground border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:font-medium data-[state=active]:border-primary",
      },
    },
    defaultVariants: { variant: "pill" },
  }
);

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  /** Estilo do container de abas. Deve corresponder ao `variant` dos `TabsTrigger` filhos. */
  variant?: "pill" | "underline";
}

/** Container das abas. Deve envolver todos os `TabsTrigger`. */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  /** Estilo do botão de aba. Deve corresponder ao `variant` do `TabsList` pai. */
  variant?: "pill" | "underline";
}

/** Botão individual de aba. O `value` deve corresponder ao `TabsContent` associado. */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/** Painel de conteúdo exibido quando a aba com o mesmo `value` está ativa. */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
