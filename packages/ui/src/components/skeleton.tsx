import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      line: "h-3 w-full",
      "line-short": "h-3 w-1/2",
      circle: "h-10 w-10 rounded-full",
      card: "",
    },
  },
  defaultVariants: { variant: "line" },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-surface p-4 flex flex-col gap-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full animate-pulse bg-muted shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-2.5 w-[120px] animate-pulse rounded-md bg-muted" />
          </div>
        </div>
        <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-3 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-3 w-[160px] animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
