export type ProjectLink = { label: string; href: string }

export type ProjectSection = {
  label: string
  heading: string
  body: string[]
}

export type Project = {
  slug: string
  title: string
  year: string
  eyebrow: string
  tagline: string
  role: string
  team: string
  links: ProjectLink[]
  gradient: string
  image?: string
  sections: ProjectSection[]
}

export const projects: Project[] = [
  {
    slug: 'hack4impact',
    title: 'hack4impact',
    year: '2026',
    eyebrow: 'NONPROFIT TECH',
    tagline: 'Software built for nonprofits, by student developers.',
    role: 'Add your role', // TODO: your role
    team: 'Student engineers',
    links: [{ label: 'Visit site', href: 'https://hack4impact.org' }], // TODO: confirm link
    gradient: 'linear-gradient(148.66deg, #6a94ee 0%, #3a5cc4 71.4%)',
    // image: '/images/projects/hack4impact.png',
    sections: [
      {
        label: 'THE PROJECT',
        heading: 'Use software to help nonprofits do more of what they already do well.',
        body: [
          'Hack4Impact is a student organization where developers, designers and product managers build software for nonprofits.',
          'Add what you worked on here: your team, the nonprofit, and what shipped.',
        ],
      },
      {
        label: 'THE DETAILS',
        heading: 'Add a one-line summary of what you built.',
        body: ['Add two or three sentences about your contribution.'],
      },
    ],
  },
  {
    slug: 'jsa',
    title: 'jsa',
    year: '2026',
    eyebrow: 'CLUB WEBSITE',
    tagline: 'The home of the Japanese Student Association at Cal Poly SLO.',
    role: 'Add your role', // TODO: your role
    team: 'JSA board',
    links: [
      { label: 'Visit site', href: '#' }, // TODO: live site URL
      { label: 'View code', href: 'https://github.com/jsacalpoly/jsa-calpoly' },
    ],
    gradient: 'linear-gradient(148.66deg, #fff8f5 0%, #fde4df 100%)',
    // image: '/images/projects/jsa.png',
    sections: [
      {
        label: 'THE PROJECT',
        heading: 'Give the club a home that is easy to find, easy to update, and easy to keep running.',
        body: [
          'The Japanese Student Association at Cal Poly SLO had its site on Wix. The new site is a static rebuild with Astro and plain CSS, hosted on Cloudflare Workers.',
          "Board members, eras, events, photos and projects live as content, so each year's officers update data instead of code.",
        ],
      },
      {
        label: 'THE DETAILS',
        heading: 'A site the board can keep up each year.',
        body: [
          'Pages cover the board, past eras, the calendar, photos and projects. A contact form sends messages to the club inbox, and the calendar and Instagram feed are embedded.',
        ],
      },
    ],
  },
]
