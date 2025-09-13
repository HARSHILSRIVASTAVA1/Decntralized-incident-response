import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-smooth",
  {
    variants: {
      status: {
        pending: "bg-warning/10 text-warning ring-warning/20",
        verified: "bg-accent/10 text-accent ring-accent/20", 
        error: "bg-destructive/10 text-destructive ring-destructive/20",
        processing: "bg-primary/10 text-primary ring-primary/20",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, status, ...props }, ref) => {
    return (
      <div
        className={cn(statusBadgeVariants({ status }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge, statusBadgeVariants };