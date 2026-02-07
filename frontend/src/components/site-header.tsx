"use client";

import Link from "next/link";

import { LanguageToggle } from "@/components/language-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          V. Loth Studio
        </Link>
        <div className="flex items-center gap-3">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
