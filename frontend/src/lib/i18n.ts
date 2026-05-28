export type Locale = 'fr' | 'en'

export const defaultLocale: Locale = 'fr'

export type Messages = {
  home: {
    eyebrow: string
    title: string
    description: string
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    fields: {
      name: string
      email: string
      message: string
      namePlaceholder: string
      emailPlaceholder: string
      messagePlaceholder: string
    }
    location: string
    availability: string
    helper: string
    submit: string
  }
  chat: {
    header: string
    online: string
    clarification: string
    placeholder: string
    hint: string
    send: string
    sending: string
    unavailable: string
    askSuggestions: string[]
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    videoLabel: string
    hoverHint: string
    actions: {
      first: string
      second: string
      third: string
    }
    detailsTitle: string
    details: {
      label: string
      value: string
    }[]
    footnote: string
  }
  language: {
    fr: string
    en: string
  }
}

export const messages: Record<Locale, Messages> = {
  fr: {
    home: {
      eyebrow: 'PLAN DU SITE',
      title: 'Create. Break. Build.',
      description:
        'Le portfolio est découpé en vues ciblées pour pouvoir brancher le chat sans refondre le site.',
    },
    contact: {
      eyebrow: 'CONTACT PANEL',
      title: 'Parlez-moi de votre projet.',
      description:
        'Partagez le contexte, vos objectifs et le timing. Je reviendrai avec une proposition sur mesure et les prochaines étapes.',
      fields: {
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Votre nom',
        emailPlaceholder: 'vous@entreprise.com',
        messagePlaceholder: 'Décrivez votre besoin',
      },
      location: 'Localisation',
      availability: 'Disponibilité',
      helper: 'Aperçu uniquement. Utilisez l’email direct pour un vrai contact.',
      submit: 'Envoyer le message',
    },
    chat: {
      header: 'ASSISTANT CHAT',
      online: 'EN LIGNE',
      clarification: 'Précision demandée',
      placeholder: 'Posez une question sur les services, tarifs, process, projets ou le contact.',
      hint: 'Entrée pour envoyer. Maj+Entrée pour un retour à la ligne.',
      send: 'Envoyer le message',
      sending: 'Envoi...',
      unavailable: 'Le chatbot est temporairement indisponible. Réessayez plus tard.',
      askSuggestions: [
        'Quels services proposes-tu ?',
        'Quel est ton process de travail ?',
        'Peux-tu montrer les moyens de contact ?',
        'Quels projets as-tu réalisés ?',
      ],
    },
    projects: {
      eyebrow: 'ARCHIVE VIDEO',
      title: 'Un ancien projet remis en scène.',
      description:
        'Survolez la vidéo pour lancer le clip, puis retirez la souris pour la mettre en pause.',
      videoLabel: 'Portfolio_V1.0',
      hoverHint: 'Survoler pour lire',
      actions: {
        first: 'Voir',
        second: 'Git',
        third: 'Media',
      },
      detailsTitle: 'À propos du projet',
      details: [
        { label: 'Type', value: 'Prototype web' },
        { label: 'État', value: 'Archive' },
        { label: 'Lecture', value: 'Hover play' },
      ],
      footnote:
        'Cette archive vidéo reprend un ancien projet et le présente comme un module de portfolio. Le lecteur ne tourne qu’au survol, puis se fige dès que la souris s’éloigne.',
    },
    language: {
      fr: 'FR',
      en: 'EN',
    },
  },
  en: {
    home: {
      eyebrow: 'SITE MAP',
      title: 'Separate pages, backend-ready later.',
      description:
        'The portfolio is split into focused views so adding the chatbot does not force a front-end rewrite.',
    },
    contact: {
      eyebrow: 'CONTACT PANEL',
      title: 'Tell me about your project.',
      description:
        'Share a little context, goals, and timing. I’ll follow up with a tailored proposal and next steps.',
      fields: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'you@company.com',
        messagePlaceholder: 'Describe your need',
      },
      location: 'Location',
      availability: 'Availability',
      helper: 'Preview only. Use the direct email CTA for an actual contact.',
      submit: 'Send message',
    },
    chat: {
      header: 'CHAT ASSISTANT',
      online: 'ONLINE',
      clarification: 'Clarification requested',
      placeholder: 'Ask about services, pricing, process, projects, or contact.',
      hint: 'Enter to send. Shift+Enter for a new line.',
      send: 'Send message',
      sending: 'Sending...',
      unavailable: 'The chatbot is temporarily unavailable. Please try again later.',
      askSuggestions: [
        'What services do you offer?',
        'How does your process work?',
        'Can you show me contact details?',
        'What projects have you shipped?',
      ],
    },
    projects: {
      eyebrow: 'VIDEO ARCHIVE',
      title: 'An old project, framed again.',
      description:
        'Hover the video to play the clip, then move away to pause it.',
      videoLabel: 'Portfolio_V1.0',
      hoverHint: 'Hover to play',
      actions: {
        first: 'View',
        second: 'Git',
        third: 'Media',
      },
      detailsTitle: 'Project notes',
      details: [
        { label: 'Type', value: 'Web prototype' },
        { label: 'Status', value: 'Archive' },
        { label: 'Playback', value: 'Hover play' },
      ],
      footnote:
        'This video archive revives an older project as a portfolio module. The preview only plays on hover and pauses as soon as the pointer leaves.',
    },
    language: {
      fr: 'FR',
      en: 'EN',
    },
  },
}
