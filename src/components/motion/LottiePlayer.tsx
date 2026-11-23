"use client";

import dynamic from "next/dynamic";
import type { DotLottieReactProps } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

const DynamicDotLottie = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export interface LottiePlayerProps extends DotLottieReactProps {
  wrapperClassName?: string;
}

/** SSR-safe DotLottie player wrapper supporting .lottie and .json assets. */
export function LottiePlayer({
  wrapperClassName,
  className,
  loop = true,
  autoplay = true,
  ...props
}: LottiePlayerProps) {
  return (
    <div className={cn("relative size-full", wrapperClassName)}>
      <DynamicDotLottie
        loop={loop}
        autoplay={autoplay}
        className={cn("size-full", className)}
        {...props}
      />
    </div>
  );
}
