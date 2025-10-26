import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm transition-all duration-200 outline-none",
        "placeholder:text-muted-foreground selection:bg-primary/10",
        "focus:border-primary/50 focus:bg-muted/20",
        "hover:border-border/80",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
