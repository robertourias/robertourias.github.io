import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
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
  status?: "online" | "away" | "offline";
  fallback?: string;
  src?: string;
  alt?: string;
}

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
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  items: { fallback?: string; src?: string; alt?: string }[];
}

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
