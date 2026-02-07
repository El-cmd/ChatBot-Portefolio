import type { Locale } from "@/lib/i18n";

export const DEFAULT_USER_GUIDE: Record<
  Locale,
  {
    title: string;
    description: string;
    suggestions: string[];
  }
> = {
  fr: {
    title: "Guide rapide",
    description:
      "Je reponds aux questions sur ce portfolio template: profil, services, projets, process, tarifs et documents.",
    suggestions: [
      "Quels services proposes-tu ?",
      "Peux-tu me montrer un exemple de projet ?",
      "Comment puis-je te contacter ?"
    ]
  },
  en: {
    title: "Quick guide",
    description:
      "I answer questions about this portfolio template: profile, services, projects, process, pricing, and documents.",
    suggestions: [
      "What services do you offer?",
      "Can you show a project example?",
      "How can I contact you?"
    ]
  }
};
