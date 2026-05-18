import * as React from "react";
import { cn } from "../lib/utils";
import { Label } from "./label";

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

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
