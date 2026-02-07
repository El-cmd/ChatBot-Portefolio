"use client";

import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { messages } = useLanguage();

  return (
    <footer className="border-t border-border/60">
      <div className="container flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted-foreground sm:flex-row">
        <span>{messages.footer.availability}</span>
        <span>Template OSS - MIT</span>
      </div>
    </footer>
  );
}
