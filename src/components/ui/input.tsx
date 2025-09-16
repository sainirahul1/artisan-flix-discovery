import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-input bg-surface/50 px-4 py-3 text-base transition-all duration-300 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:glow-red disabled:cursor-not-allowed disabled:opacity-50 md:text-sm backdrop-blur-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Input.displayName = "Input";

export { Input };
