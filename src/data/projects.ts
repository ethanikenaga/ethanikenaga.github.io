export type ProjectLink = { label: string; href: string }

export type ProjectSection = {
  heading: string
  body: string[]
  // Sections with an image sit in two columns; sections without one are a single text column.
  image?: { label: string; side: 'left' | 'right' } // label is placeholder text until there is a real image
}

export type Project = {
  slug: string
  title: string // shown on the home card and in the popup top bar
  dialogTitle: string // big title inside the popup
  subtitle: string
  year: string // pill on the home card
  dates: string // "Dates" row in the popup
  role: string
  team: { label: string; href?: string }
  links: ProjectLink[]
  gradient: string
  image?: string
  video?: string // autoplaying video on the home card, path without extension
  sections: ProjectSection[]
}

export const projects: Project[] = [
  {
    slug: 'hack4impact',
    title: 'hack4impact',
    dialogTitle: 'hack4impact',
    subtitle: 'Software for nonprofits',
    year: '2026',
    dates: 'Sept 2026 – Present',
    role: 'Software Developer',
    team: { label: 'San Luis Coastal USD', href: 'https://www.slcusd.org/' },
    links: [
      { label: 'Hack4Impact', href: 'https://hack4impact.org' },
      {
        label: 'SLC Github',
        href: 'https://github.com/hack4impact-calpoly/san-luis-coastal-education-foundation',
      },
      {
        label: 'MeadeCanine Github',
        href: 'https://github.com/bootcamp-project-2026/bootcamp-app',
      },
    ],
    gradient: 'linear-gradient(148.66deg, #6a94ee 0%, #3a5cc4 71.4%)',
    image: '/images/projects/hack4impact.svg',
    sections: [
      {
        heading: 'Why Hack4Impact',
        body: [
          'Hack4Impact is a student organization where developers, designers and product managers build software for nonprofits. Instead of practising on made-up assignments, members work on tools that an organization will actually use.',
          'I joined in September 2026 because [your reason: what drew you to it]. It has also been my first look at how a real team ships software: planning the work together, reviewing each other’s code, and checking in with the people we are building for.',
        ],
      },
      {
        heading: 'San Luis Coastal Education Foundation',
        body: [
          'I’m a software developer on the team building a tool for the San Luis Coastal Education Foundation, in partnership with San Luis Coastal USD. [One or two sentences on what the tool does and who will use it.]',
          'So far my part has been [what you have built or worked on]. We work in the open, so you can follow the code on GitHub.',
        ],
        image: { label: 'Screenshot or photo from the SLC project', side: 'left' },
      },
      {
        heading: 'MeadeCanine (MCR)',
        body: [
          'Before SLC, I worked on MCR, a bootcamp project built as an app by a small team. [One or two sentences on what it is and who it was for.]',
          'I was responsible for [your part], and we finished it in [how long]. It was my first time [what was new, for example working in a shared repo with pull requests].',
        ],
        image: { label: 'Screenshot from the MCR project', side: 'right' },
      },
      {
        heading: 'What I’ve learned',
        body: [
          'The biggest thing I’ve taken away is [main takeaway]. Building for a real organization changes how you work: the requirements come from people with other jobs, so you learn to ask clearer questions and to explain tradeoffs in plain language.',
          'Tools I’ve used so far include [tools, for example React, TypeScript, Git and GitHub]. If I were telling someone thinking about joining, I would say [your advice].',
        ],
      },
    ],
  },
  {
    slug: 'jsa',
    title: 'jsa',
    dialogTitle: 'Cal Poly JSA',
    subtitle: 'Japanese Student Association',
    year: '2026',
    dates: 'Feb 2026 – present',
    role: 'Web Developer, Historian',
    team: { label: 'JSA Board 26-27' },
    links: [
      { label: 'JSA Website', href: 'https://jsacalpoly.org' },
      { label: 'JSA Github', href: 'https://github.com/jsacalpoly/jsa-calpoly' },
    ],
    gradient: 'linear-gradient(148.66deg, #fff8f5 0%, #fde4df 100%)',
    image: '/images/projects/jsa.svg',
    video: '/cards/jsa-card',
    sections: [
      {
        heading: 'What JSA is, and why I’m here',
        body: [
          'The Japanese Student Association at Cal Poly SLO is a student club that brings people together around Japanese culture and community on campus. [One or two sentences on what the club does: events, socials, who it is for.]',
          'I’m here because [your reason for joining]. I’m also the club’s historian [confirm your role], which means [what that involves].',
        ],
      },
      {
        heading: 'From Wix to GitHub',
        body: [
          'The club’s website used to live on Wix. I helped move it to a static site built with Astro and plain CSS, hosted on Cloudflare Workers, with all of the code open on GitHub.',
          'Board members, eras, events, photos and projects now live as content, so each year’s board updates data instead of code. [What was the hardest part of moving everything over?]',
        ],
        image: { label: 'Screenshot of the old Wix site next to the new one', side: 'left' },
      },
      {
        heading: 'Designing in Figma',
        body: [
          'Before writing any code, I recreated the Wix site in Figma, page by page, so that the board could agree on the design first. [What you made: components, layouts, anything you are proud of.]',
          '[What Figma taught you, how the designs carried over into code, and what changed along the way.]',
        ],
        image: { label: 'Screenshot from the Figma file', side: 'right' },
      },
      {
        heading: 'Keeping the site running',
        body: [
          'A club website has to keep working after the person who built it graduates. [What maintenance looks like in practice: updating the board each year, adding events, fixing what breaks.]',
          'The hard parts so far have been [your struggles]. What I would do differently is [your reflection].',
        ],
      },
      {
        heading: 'Beyond the website',
        body: [
          'Outside of the website, I [what you do as historian: photos, archives, the past eras]. [A moment or tradition from the club that you want to share.]',
          '[Something small and personal: an event, a memory, what the club means to you.]',
        ],
        image: { label: 'A photo from the club', side: 'left' },
      },
    ],
  },
]
