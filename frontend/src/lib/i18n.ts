export type Locale = "fr" | "en";

export const defaultLocale: Locale = "fr";

export const messages = {
  fr: {
    nav: {
      services: "Services",
      why: "Pourquoi moi",
      chat: "Chatbot",
      contact: "Contact",
      cta: "Réserver un appel"
    },
    hero: {
      badge: "Développeur freelance",
      title: "Des produits propres, rapides et fiables pour les équipes modernes.",
      description:
        "Je conçois et livre des sites web, des chatbots IA avec base de connaissances, et un support dev/infra pragmatique qui fait avancer votre produit.",
      primaryCta: "Démarrer un projet",
      secondaryCta: "Voir les services"
    },
    services: {
      label: "Services",
      title: "Des services ciblés avec une exécution premium.",
      cards: {
        website: {
          title: "Création de sites web",
          description:
            "Sites marketing, pages produit et landing pages optimisés pour la conversion, la performance et la maintenabilité."
        },
        chatbot: {
          title: "Chatbots IA avec base de connaissances",
          description:
            "Assistants avec recherche augmentée qui répondent à partir de vos docs, tickets support ou savoir interne."
        },
        infra: {
          title: "Aide dev / infra",
          description:
            "CI/CD, déploiements, monitoring et support d'ingénierie pour des livraisons fluides et prévisibles."
        }
      }
    },
    why: {
      label: "Pourquoi moi",
      title: "Une exécution senior sans les frais d'agence.",
      description:
        "Un accès direct à un profil expérimenté qui transforme vos objectifs en livrables concrets, avec clarté et rapidité.",
      bullets: {
        product: {
          title: "Approche orientée produit",
          description:
            "Priorité aux résultats, pas seulement aux livrables ou aux listes de fonctionnalités."
        },
        communication: {
          title: "Communication claire",
          description: "Mises à jour régulières, décisions transparentes et zéro surprise."
        },
        performance: {
          title: "Performance d'abord",
          description: "Des builds rapides, accessibles et scalables dès le premier jour."
        }
      }
    },
    cta: {
      label: "Prêt à lancer ?",
      title: "Cadrons votre prochaine version.",
      description:
        "Partagez un brief et je répondrai avec un timing, des recommandations et un plan clair pour le lancement.",
      primary: "Me contacter",
      secondary: "Email direct"
    },
    contact: {
      label: "Contact",
      title: "Parlez-moi de votre projet.",
      description:
        "Partagez le contexte, vos objectifs et le timing. Je reviendrai avec une proposition sur mesure et les prochaines étapes.",
      cardTitle: "Demande de projet",
      fields: {
        name: "Nom",
        email: "Email",
        message: "Message",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "vous@entreprise.com",
        messagePlaceholder: "Que construisez-vous ?",
        submit: "Envoyer le message"
      }
    },
    chat: {
      label: "Chatbot",
      title: "Discutez avec l'assistant vloth.tech.",
      description:
        "Posez vos questions sur les services, projets ou collaborations liés à vloth.tech.",
      panelTitle: "Conversation",
      placeholder: "Tapez votre message...",
      hint: "Entrée pour envoyer, Maj+Entrée pour un retour à la ligne.",
      send: "Envoyer",
      sending: "Envoi...",
      empty: "Démarrez la conversation.",
      error: "Impossible de joindre le serveur. Réessayez plus tard.",
      initialAssistant:
        "Je suis l'assistant de vloth.tech. Je réponds uniquement aux questions me concernant."
    },
    footer: {
      availability: "Disponible pour des missions freelance."
    }
  },
  en: {
    nav: {
      services: "Services",
      why: "Why me",
      chat: "Chatbot",
      contact: "Contact",
      cta: "Book a call"
    },
    hero: {
      badge: "Freelance developer",
      title: "Clean, fast, and reliable product builds for modern teams.",
      description:
        "I design and ship websites, AI chatbots with knowledge bases, and practical dev/infra support that keeps your product moving.",
      primaryCta: "Start a project",
      secondaryCta: "View services"
    },
    services: {
      label: "Services",
      title: "Focused services with premium execution.",
      cards: {
        website: {
          title: "Website creation",
          description:
            "Marketing sites, product pages, and landing pages built for conversion, performance, and long-term maintainability."
        },
        chatbot: {
          title: "AI chatbots with knowledge base",
          description:
            "Retrieval-augmented assistants that answer questions from your docs, support tickets, or internal knowledge."
        },
        infra: {
          title: "Dev / infra help",
          description:
            "CI/CD, deployments, monitoring, and engineering support that keeps delivery smooth and predictable."
        }
      }
    },
    why: {
      label: "Why me",
      title: "Senior-level execution without agency overhead.",
      description:
        "You get a direct line to an experienced builder who can translate goals into shipped product work, with clarity and speed.",
      bullets: {
        product: {
          title: "Product-minded approach",
          description: "Prioritize outcomes, not just deliverables or feature lists."
        },
        communication: {
          title: "Clear communication",
          description: "Weekly updates, transparent decisions, and no surprises."
        },
        performance: {
          title: "Performance first",
          description: "Fast, accessible, and scalable builds from day one."
        }
      }
    },
    cta: {
      label: "Ready to build?",
      title: "Let's scope your next release.",
      description:
        "Share a brief on your project and I'll respond with timing, recommendations, and a clear path to launch.",
      primary: "Contact me",
      secondary: "Email directly"
    },
    contact: {
      label: "Contact",
      title: "Tell me about your project.",
      description:
        "Share a little context, goals, and timing. I'll follow up with a tailored proposal and next steps.",
      cardTitle: "Project inquiry",
      fields: {
        name: "Name",
        email: "Email",
        message: "Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "you@company.com",
        messagePlaceholder: "What are you building?",
        submit: "Send message"
      }
    },
    chat: {
      label: "Chatbot",
      title: "Chat with the vloth.tech assistant.",
      description:
        "Ask questions about vloth.tech services, projects, or collaboration.",
      panelTitle: "Conversation",
      placeholder: "Type your message...",
      hint: "Press Enter to send, Shift+Enter for a new line.",
      send: "Send",
      sending: "Sending...",
      empty: "Start the conversation.",
      error: "Unable to reach the server. Please try again later.",
      initialAssistant:
        "I am the assistant for vloth.tech. I only answer questions about me."
    },
    footer: {
      availability: "Available for freelance projects."
    }
  }
} as const;

export type Messages = typeof messages.fr;
