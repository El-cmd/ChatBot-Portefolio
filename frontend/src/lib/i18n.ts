export type Locale = "fr" | "en";

export const defaultLocale: Locale = "fr";

export const messages = {
  fr: {
    nav: {
      services: "Services",
      why: "Pourquoi moi",
      chat: "Chatbot",
      contact: "Contact",
      cta: "Reserver un appel"
    },
    hero: {
      badge: "Template open source",
      title: "Un chatbot portfolio RAG pret a personnaliser.",
      description:
        "Ce template vous aide a presenter votre profil, vos services, vos projets et vos documents avec une base de connaissance Markdown.",
      primaryCta: "Demarrer",
      secondaryCta: "Voir les services"
    },
    services: {
      label: "Services",
      title: "Exemples de services a personnaliser.",
      cards: {
        website: {
          title: "Creation de sites web",
          description:
            "Sites vitrines, landing pages et experiences web performantes avec une architecture maintenable."
        },
        chatbot: {
          title: "Chatbots IA avec base de connaissances",
          description:
            "Assistants RAG relies a vos documents pour fournir des reponses traceables avec sources."
        },
        infra: {
          title: "Aide dev / infra",
          description:
            "CI/CD, deploiement Docker et support technique pour fiabiliser vos livraisons."
        }
      }
    },
    why: {
      label: "Pourquoi ce template",
      title: "Base solide pour un portfolio assistant.",
      description:
        "Structure front/back claire, contenu Markdown editable et pipeline RAG deja integre.",
      bullets: {
        product: {
          title: "Oriente resultat",
          description: "Mise en production rapide avec des composants reutilisables."
        },
        communication: {
          title: "Lisible",
          description: "Separation propre entre UI, API, prompt et base de connaissance."
        },
        performance: {
          title: "Pragmatique",
          description: "Conception simple a maintenir pour un usage personnel ou equipe."
        }
      }
    },
    cta: {
      label: "Pret a personnaliser ?",
      title: "Adaptez ce template a votre profil.",
      description:
        "Remplacez la KB exemple, configurez vos variables et publiez votre assistant portfolio.",
      primary: "Configurer",
      secondary: "Voir la documentation"
    },
    contact: {
      label: "Contact",
      title: "Partagez votre besoin.",
      description:
        "Cette section est un exemple. Remplacez les informations par vos canaux de contact.",
      cardTitle: "Demande",
      fields: {
        name: "Nom",
        email: "Email",
        message: "Message",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "vous@entreprise.com",
        messagePlaceholder: "Votre besoin",
        submit: "Envoyer"
      }
    },
    chat: {
      label: "Chatbot",
      title: "Assistant Portfolio Template",
      description:
        "Posez vos questions sur le profil, les services, les projets et les ressources du template.",
      panelTitle: "Conversation",
      placeholder: "Tapez votre message...",
      hint: "Entree pour envoyer, Maj+Entree pour une nouvelle ligne.",
      send: "Envoyer",
      sending: "Envoi...",
      empty: "Demarrez la conversation.",
      error: "Impossible de joindre le serveur. Reessayez plus tard.",
      initialAssistant:
        "Je suis l'assistant portfolio template. Je reponds uniquement a partir de la base de connaissance configuree."
    },
    footer: {
      availability: "Template open source pret a contribuer."
    }
  },
  en: {
    nav: {
      services: "Services",
      why: "Why this template",
      chat: "Chatbot",
      contact: "Contact",
      cta: "Book a call"
    },
    hero: {
      badge: "Open-source template",
      title: "A RAG portfolio chatbot ready to customize.",
      description:
        "This template helps you present your profile, services, projects, and documents through a Markdown knowledge base.",
      primaryCta: "Get started",
      secondaryCta: "View services"
    },
    services: {
      label: "Services",
      title: "Service examples to customize.",
      cards: {
        website: {
          title: "Website creation",
          description:
            "Marketing sites, landing pages, and performant web experiences with maintainable architecture."
        },
        chatbot: {
          title: "AI chatbots with knowledge base",
          description:
            "RAG assistants connected to your documents with source-backed answers."
        },
        infra: {
          title: "Dev / infra support",
          description:
            "CI/CD, Docker deployment, and technical support to stabilize delivery."
        }
      }
    },
    why: {
      label: "Why this template",
      title: "Solid baseline for a portfolio assistant.",
      description:
        "Clear front/back structure, editable Markdown content, and an integrated RAG pipeline.",
      bullets: {
        product: {
          title: "Outcome-focused",
          description: "Ship quickly with reusable components."
        },
        communication: {
          title: "Readable",
          description: "Clean split between UI, API, prompt, and knowledge base."
        },
        performance: {
          title: "Pragmatic",
          description: "Simple to maintain for individual or team usage."
        }
      }
    },
    cta: {
      label: "Ready to customize?",
      title: "Adapt this template to your profile.",
      description:
        "Replace the sample KB, configure environment variables, and publish your portfolio assistant.",
      primary: "Configure",
      secondary: "Read docs"
    },
    contact: {
      label: "Contact",
      title: "Share your request.",
      description:
        "This section is an example. Replace it with your own contact channels.",
      cardTitle: "Inquiry",
      fields: {
        name: "Name",
        email: "Email",
        message: "Message",
        namePlaceholder: "Your name",
        emailPlaceholder: "you@company.com",
        messagePlaceholder: "Your request",
        submit: "Send"
      }
    },
    chat: {
      label: "Chatbot",
      title: "Portfolio Assistant Template",
      description:
        "Ask about profile, services, projects, and resources from the template knowledge base.",
      panelTitle: "Conversation",
      placeholder: "Type your message...",
      hint: "Press Enter to send, Shift+Enter for a new line.",
      send: "Send",
      sending: "Sending...",
      empty: "Start the conversation.",
      error: "Unable to reach the server. Please try again later.",
      initialAssistant:
        "I am the portfolio template assistant. I only answer from the configured knowledge base."
    },
    footer: {
      availability: "Open-source template ready for contributions."
    }
  }
} as const;

export type Messages = typeof messages.fr;
