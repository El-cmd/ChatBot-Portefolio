export type NavItem = {
  label: string
  href: string
}

export type HeroLink = {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  kind: 'route' | 'external'
}

export type HeroStat = {
  label: string
  value: string
}

export type ProjectCard = {
  title: string
  description: string
  stack: string[]
  link: string
  status: string
}

export type SocialLink = {
  label: string
  href: string
}

export type RouteCard = {
  title: string
  description: string
  href: string
  cta: string
}

export type SiteContent = {
  brand: string
  navItems: NavItem[]
  navCta: string
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    description: string
    links: HeroLink[]
  }
  projects: ProjectCard[]
  about: {
    title: string
    description: string
    details: string[]
    stack: string[]
  }
  contact: {
    title: string
    description: string
    email: string
    location: string
    availability: string
  }
  chat: {
    title: string
    description: string
    welcome: string
    suggestions: string[]
    sidebarTitle: string
    sidebarDescription: string
  }
  socialLinks: SocialLink[]
}
