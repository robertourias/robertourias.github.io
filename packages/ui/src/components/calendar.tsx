"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "rounded-xl border border-border bg-surface p-3 text-foreground",
        className
      )}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-3",
        month_caption: "flex justify-between items-center px-1 py-1",
        caption_label: "text-sm font-semibold",
        nav: "flex items-center gap-1",
        button_previous: cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        ),
        button_next: cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex justify-between px-1",
        weekday: "w-8 text-center text-[11px] font-medium text-muted-foreground",
        week: "flex justify-between px-1 mt-1",
        day: "p-0",
        day_button: cn(
          "h-8 w-8 rounded-full text-[13px] font-normal text-foreground transition-colors",
          "hover:bg-surface-raised",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        ),
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:font-semibold [&>button]:hover:bg-primary-hover",
        today: "[&>button]:border [&>button]:border-primary [&>button]:text-primary [&>button]:font-medium",
        outside: "[&>button]:text-muted-foreground [&>button]:opacity-50",
        disabled: "[&>button]:text-muted-foreground [&>button]:opacity-30 [&>button]:cursor-not-allowed",
        range_start: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-full",
        range_end: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-full",
        range_middle: "[&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:rounded-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
