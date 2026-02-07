"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 p-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setLocale("fr")}
        aria-pressed={locale === "fr"}
        className={cn("h-8 rounded-full px-3 text-xs", locale === "fr" && "bg-background")}
      >
        FR
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn("h-8 rounded-full px-3 text-xs", locale === "en" && "bg-background")}
      >
        EN
      </Button>
    </div>
  );
}
