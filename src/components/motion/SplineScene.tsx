"use client";

import dynamic from "next/dynamic";
import { Suspense, type ReactNode } from "react";
import type { SplineProps } from "@splinetool/react-spline";
import { cn } from "@/lib/utils";

const DynamicSpline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export interface SplineSceneProps extends Omit<SplineProps, "className"> {
  className?: string;
  fallback?: ReactNode;
}

/** SSR-safe Spline 3D scene wrapper for interactive WebGL scenes (.splinecode). */
export function SplineScene({
  scene,
  className,
  fallback = null,
  htmlContentMode = "sandbox",
  ...props
}: SplineSceneProps) {
  return (
    <div className={cn("relative size-full", className)}>
      <Suspense fallback={fallback}>
        <DynamicSpline
          scene={scene}
          htmlContentMode={htmlContentMode}
          className="size-full"
          {...props}
        />
      </Suspense>
    </div>
  );
}
