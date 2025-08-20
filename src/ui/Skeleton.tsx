"use client";
import clsx from "clsx";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx("animate-pulse rounded-md bg-black/[0.06]", className)}
      aria-hidden
    />
  );
}