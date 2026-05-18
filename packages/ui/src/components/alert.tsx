import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CircleCheck, CircleAlert, TriangleAlert } from "lucide-react";
import { cn } from "../lib/utils";

const alertVariants = cva(
  "flex gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "bg-accent border-border text-accent-foreground",
        success: "bg-badge-success-bg border-success text-success",
        destructive: "bg-badge-destructive-bg border-destructive text-destructive",
        warning: "bg-badge-warning-bg border-warning text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const alertIconMap = {
  default: Info,
  success: CircleCheck,
  destructive: CircleAlert,
  warning: TriangleAlert,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const Icon = alertIconMap[variant ?? "default"];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0" />
        <div className="flex-1 space-y-1">{children}</div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[13px] leading-relaxed opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
