"use client"

import type * as React from "react"
import { cn } from "@/src/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", className)}
      {...props}
    />
  )
}
