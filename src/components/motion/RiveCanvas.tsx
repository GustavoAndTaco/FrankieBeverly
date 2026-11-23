"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { useRive } from "@rive-app/react-canvas";
import { cn } from "@/lib/utils";

export interface RiveCanvasProps {
  src: string;
  artboard?: string;
  stateMachine?: string;
  autoplay?: boolean;
  className?: string;
  canvasProps?: ComponentProps<"canvas">;
}

function RiveCanvasInner({
  src,
  artboard,
  stateMachine,
  autoplay = true,
  className,
  canvasProps,
}: RiveCanvasProps) {
  const { RiveComponent } = useRive({
    src,
    artboard,
    stateMachines: stateMachine,
    autoplay,
  });

  return (
    <div className={cn("relative size-full", className)}>
      <RiveComponent {...canvasProps} className={cn("size-full", canvasProps?.className)} />
    </div>
  );
}

/** SSR-safe Rive canvas wrapper supporting interactive State Machines (.riv). */
export const RiveCanvas = dynamic(() => Promise.resolve(RiveCanvasInner), {
  ssr: false,
});
