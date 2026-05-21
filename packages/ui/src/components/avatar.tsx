"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        /** 24×24px — para listas densas e contextos muito compactos. */
        sm: "h-6 w-6",
        /** 32×32px — padrão para a maioria dos contextos. */
        md: "h-8 w-8",
        /** 40×40px — para cards de perfil e itens de lista. */
        lg: "h-10 w-10",
        /** 56×56px — para páginas de perfil e destaque. */
        xl: "h-14 w-14",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const avatarFallbackSizeVariants = cva("text-foreground font-semibold", {
  variants: {
    size: {
      sm: "text-[9px]",
      md: "text-xs",
      lg: "text-sm",
      xl: "text-xl",
    },
  },
  defaultVariants: { size: "md" },
});

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

/**
 * Avatar circular para representar um usuário. Compose com `AvatarImage` para foto
 * e `AvatarFallback` para iniciais exibidas quando a imagem falha ou não está disponível.
 * Para avatar com indicador de status, use `AvatarWithStatus`.
 *
 * @example
 * ```tsx
 * <Avatar size="lg">
 *   <AvatarImage src="/foto.jpg" alt="Roberto Nicoletti" />
 *   <AvatarFallback size="lg">RN</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

/** Imagem do avatar. Exibida quando carregada com sucesso; caso contrário, mostra o `AvatarFallback`. */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackSizeVariants> {}

/** Fallback de iniciais exibido quando a `AvatarImage` falha. Deve corresponder ao tamanho do Avatar pai. */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      avatarFallbackSizeVariants({ size }),
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

const statusColorMap = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
} as const;

export interface AvatarWithStatusProps extends AvatarProps {
  /**
   * Estado de presença do usuário.
   * - `"online"` — ponto verde
   * - `"away"` — ponto amarelo
   * - `"offline"` — ponto cinza
   */
  status?: "online" | "away" | "offline";
  /** Texto de fallback (iniciais). Exibido quando `src` não está disponível. */
  fallback?: string;
  /** URL da foto do avatar. */
  src?: string;
  /** Texto alternativo da imagem para acessibilidade. */
  alt?: string;
}

/**
 * Avatar com indicador de status de presença (online/away/offline). Use em listas
 * de contatos, chats e sistemas que exibem disponibilidade em tempo real.
 *
 * @example
 * ```tsx
 * <AvatarWithStatus
 *   src="/foto.jpg"
 *   alt="Roberto"
 *   fallback="RN"
 *   status="online"
 *   size="lg"
 * />
 * ```
 */
const AvatarWithStatus = React.forwardRef<HTMLDivElement, AvatarWithStatusProps>(
  ({ status = "online", fallback, src, alt, size = "lg", className, ...props }, ref) => (
    <div ref={ref} className={cn("relative inline-flex", className)} {...props}>
      <Avatar size={size}>
        {src && <AvatarImage src={src} alt={alt} />}
        <AvatarFallback size={size}>{fallback}</AvatarFallback>
      </Avatar>
      <span
        className={cn(
          "absolute bottom-0 right-0 block rounded-full ring-2 ring-surface",
          statusColorMap[status],
          size === "sm" ? "h-2 w-2" : size === "xl" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
        )}
      />
    </div>
  )
);
AvatarWithStatus.displayName = "AvatarWithStatus";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lista de avatares a exibir. Cada item pode ter `src`, `alt` e `fallback`. */
  items: { fallback?: string; src?: string; alt?: string }[];
  /** Número máximo de avatares visíveis. Excedente exibe contador `"+N"`. */
  max?: number;
  /** Tamanho de todos os avatares do grupo. Corresponde aos tamanhos de `Avatar`. */
  size?: VariantProps<typeof avatarVariants>["size"];
}

/**
 * Grupo de avatares sobrepostos com contador de excedente. Use para representar
 * múltiplos participantes em projetos, threads ou grupos.
 *
 * @example
 * ```tsx
 * <AvatarGroup
 *   items={[
 *     { src: "/a.jpg", alt: "Alice", fallback: "A" },
 *     { src: "/b.jpg", alt: "Bob", fallback: "B" },
 *     { fallback: "C" },
 *   ]}
 *   max={2}
 *   size="md"
 * />
 * // Exibe Alice, Bob e "+1"
 * ```
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ items, max, size = "lg", className, ...props }, ref) => {
    const visible = max ? items.slice(0, max) : items;
    const overflow = max && items.length > max ? items.length - max : 0;

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {visible.map((item, i) => (
          <Avatar
            key={i}
            size={size}
            className={cn("ring-2 ring-surface", i > 0 && "-ml-2")}
          >
            {item.src && <AvatarImage src={item.src} alt={item.alt} />}
            <AvatarFallback size={size}>{item.fallback}</AvatarFallback>
          </Avatar>
        ))}
        {overflow > 0 && (
          <div
            className={cn(
              avatarVariants({ size }),
              "-ml-2 flex items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground ring-2 ring-surface"
            )}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarWithStatus, AvatarGroup };
