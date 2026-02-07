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
      "Je réponds uniquement aux questions liées à vloth.tech, ses services et ses projets.",
    suggestions: [
      "Quels services proposes-tu ?",
      "Peux-tu m'aider à lancer un site vitrine ?",
      "Quel est ton process de collaboration ?"
    ]
  },
  en: {
    title: "Quick guide",
    description:
      "I only answer questions related to vloth.tech, its services, and its projects.",
    suggestions: [
      "What services do you offer?",
      "Can you help me launch a marketing site?",
      "What is your collaboration process?"
    ]
  }
};
