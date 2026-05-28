import type { Locale } from '../lib/i18n'
import type { SiteContent } from '../types/portfolio'

export const siteContent: Record<Locale, SiteContent> = {
  fr: {
    brand: 'Vlothtech',
    navItems: [
      { label: 'Accueil', href: '/' },
      { label: 'Hub', href: '/projects' },
      { label: 'À propos', href: '/about' },
      { label: 'Chat', href: '/chat' },
      { label: 'Contact', href: '/contact' },
    ],
    navCta: 'Réserver un appel',
    hero: {
      eyebrow: 'PORTFOLIO RETRO NEON',
      title: 'Create. Break. Build.',
      subtitle: 'Frontend propre, détails de motion et personnalité arcade.',
      description:
        'Un portfolio multi-pages pour les designers, les indépendants et les développeurs orientés produit qui veulent une interface marquante sans perdre en clarté.',
      links: [
        {
          label: 'Voir les projets',
          href: '/projects',
          variant: 'primary',
          kind: 'route',
        },
        {
          label: 'Ouvrir le chat',
          href: '/chat',
          variant: 'secondary',
          kind: 'route',
        },
        {
          label: 'Me contacter',
          href: '/contact',
          variant: 'secondary',
          kind: 'route',
        },
      ],
    },
    projects: [
      {
        title: 'Night Shift Dashboard',
        description:
          'Un cockpit analytique sombre avec des cartes KPI lumineuses, des widgets modulaires et une structure claire façon centre de commande.',
        stack: ['React', 'Tailwind', 'Charts'],
        link: 'https://example.com/night-shift',
        status: 'Build phare',
      },
      {
        title: 'Arcade Commerce',
        description:
          'Un concept de boutique en ligne mêlant cartes produits tactiles, encadrement néon et parcours de paiement rapides à parcourir.',
        stack: ['UI Design', 'Headless', 'Motion'],
        link: 'https://example.com/arcade-commerce',
        status: 'Sprint concept',
      },
      {
        title: 'Signal OS Landing',
        description:
          'Une landing page pour une marque d’outil dev avec atmosphère pixel, dégradés superposés et hiérarchie CTA nette.',
        stack: ['Branding', 'Vite', 'Copy'],
        link: 'https://example.com/signal-os',
        status: 'Mock prêt client',
      },
    ],
    about: {
      title: 'Un portfolio minimal avec du bruit assumé.',
      description:
        'La direction mélange une esthétique HUD old-school avec des espacements modernes, une typographie forte et un système de motion maîtrisé.',
      details: [
        'Les accents pixel restent dans le framing, les badges et le portrait pour garder le contenu lisible.',
        'Les cartes utilisent des ombres franches et des formes carrées pour rappeler les panneaux rétro sans paraître datées.',
        'Toute la page se pilote depuis un seul module de données, donc remplacer les placeholders reste rapide.',
      ],
      stack: [
        'Design Systems',
        'Landing Pages',
        'UI Motion',
        'Responsive UI',
        'Frontend Delivery',
      ],
    },
    contact: {
      title: 'Construisons quelque chose de vraiment artisanal.',
      description:
        'Ce panneau contact est volontairement UI-only. Utilise l’email direct ou les réseaux pour un vrai échange.',
      email: 'hello@pixelport.dev',
      location: 'Remote / Europe',
      availability: 'Disponible pour des missions sélectionnées et des lancements produit.',
    },
    chat: {
      title: 'Assistant Vloth',
      description:
        'Pose des questions sur le portfolio, les services, le process, les prix ou les projets. Le bot répond depuis la base de connaissance et peut afficher les liens de contact quand c’est pertinent.',
      welcome:
        'Bienvenue. Je peux répondre aux questions sur le portfolio, les services, les prix, le process et les projets.',
      suggestions: [
        'Quels services proposes-tu ?',
        'Quel est ton process de travail ?',
        'Peux-tu montrer les moyens de contact ?',
        'Quels projets as-tu réalisés ?',
      ],
      sidebarTitle: 'Ce que connaît le bot',
      sidebarDescription:
        'Cet assistant est branché sur la base de connaissance du portfolio et reste volontairement centré sur le sujet. Il demande une précision si la demande est trop vague.',
    },
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { label: 'Dribbble', href: 'https://dribbble.com/' },
    ],
  },
  en: {
    brand: 'Vlothtech',
    navItems: [
      { label: 'Home', href: '/' },
      { label: 'Hub', href: '/projects' },
      { label: 'About', href: '/about' },
      { label: 'Chat', href: '/chat' },
      { label: 'Contact', href: '/contact' },
    ],
    navCta: 'Book a call',
    hero: {
      eyebrow: 'RETRO NEON PORTFOLIO',
      title: 'Create. Break. Build.',
      subtitle: 'Frontend craft, motion details, and arcade-grade personality.',
      description:
        'A multi-page showcase for designers, indie makers, and product-focused developers who want a memorable interface without losing clarity.',
      links: [
        {
          label: 'View projects',
          href: '/projects',
          variant: 'primary',
          kind: 'route',
        },
        {
          label: 'Open chat',
          href: '/chat',
          variant: 'secondary',
          kind: 'route',
        },
        {
          label: 'Send a ping',
          href: '/contact',
          variant: 'secondary',
          kind: 'route',
        },
      ],
    },
    projects: [
      {
        title: 'Night Shift Dashboard',
        description:
          'A dark analytics cockpit with glowing KPI cards, modular widgets, and a crisp command-center layout.',
        stack: ['React', 'Tailwind', 'Charts'],
        link: 'https://example.com/night-shift',
        status: 'Featured build',
      },
      {
        title: 'Arcade Commerce',
        description:
          'A storefront concept mixing tactile product cards, neon framing, and checkout flows tuned for fast browsing.',
        stack: ['UI Design', 'Headless', 'Motion'],
        link: 'https://example.com/arcade-commerce',
        status: 'Concept sprint',
      },
      {
        title: 'Signal OS Landing',
        description:
          'A launch page for a dev tool brand with pixel atmospherics, layered gradients, and sharp CTA hierarchy.',
        stack: ['Branding', 'Vite', 'Copy'],
        link: 'https://example.com/signal-os',
        status: 'Client-ready mock',
      },
    ],
    about: {
      title: 'A minimal portfolio with deliberate noise.',
      description:
        'The direction blends old-school HUD aesthetics with modern spacing, strong typography, and a restrained motion system.',
      details: [
        'Pixel accents stay in the framing, badges, and portrait so the content remains readable.',
        'Cards use hard shadows and square geometry to echo retro UI panels without feeling dated.',
        'The whole page is editable from one data module, so replacing placeholders is fast.',
      ],
      stack: [
        'Design Systems',
        'Landing Pages',
        'UI Motion',
        'Responsive UI',
        'Frontend Delivery',
      ],
    },
    contact: {
      title: 'Let’s build something that feels handcrafted.',
      description:
        'This contact panel is intentionally UI-only. Use the email CTA or social links as your real contact surface.',
      email: 'hello@pixelport.dev',
      location: 'Remote / Europe',
      availability: 'Available for selected freelance and product launches.',
    },
    chat: {
      title: 'Vloth Assistant',
      description:
        'Ask about the portfolio, services, process, pricing, or projects. The assistant answers from the knowledge base and can surface contact links when relevant.',
      welcome:
        'Welcome. I can answer questions about the portfolio, services, pricing, process, and projects.',
      suggestions: [
        'What services do you offer?',
        'How does your process work?',
        'Can you show me contact details?',
        'What projects have you shipped?',
      ],
      sidebarTitle: 'What the bot knows',
      sidebarDescription:
        'This assistant is connected to the portfolio knowledge base and is designed to stay on-topic. It will ask for clarification when the request is too vague.',
    },
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { label: 'Dribbble', href: 'https://dribbble.com/' },
    ],
  },
}
