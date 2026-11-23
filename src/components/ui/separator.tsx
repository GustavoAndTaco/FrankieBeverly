"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  dashed?: boolean;
}

/** 1px hairline or dashed separator matching droppable.app divider aesthetics. */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  dashed = false,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        dashed
          ? orientation === "horizontal"
            ? "h-0 w-full border-t border-dashed border-white/12"
            : "h-full w-0 border-l border-dashed border-white/12"
          : orientation === "horizontal"
            ? "bg-border h-px w-full"
            : "bg-border h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
