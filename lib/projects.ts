export const CONTACT_EMAIL = 'jmdpatterson1@gmail.com'

export type ProjectDetails = {
  brief: string
  approach: string
  design: string
  outcome: string
}

export type Project = {
  id: number
  slug: string
  title: string
  description: string
  poster: string
  demo: string
  /** Live or public URL. When null the project isn't public and the dialog shows a contact CTA. */
  link: string | null
  linkLabel?: string
  tags: string[]
  details: ProjectDetails
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'free-your-mind',
    title: 'Free Your Mind',
    description: 'Step into the Matrix in this interactive homage that reimagines iconic scenes in dynamic ASCII. Built with v0.',
    poster: '/free-your-mind-poster.png',
    demo: '/free-your-mind-demo.mp4',
    link: 'https://free-your-mind.vercel.app/',
    linkLabel: 'LAUNCH THE EXPERIENCE',
    tags: ['Next.js', 'Vercel', 'v0', 'TypeScript', 'Tailwind CSS'],
    details: {
      brief:
        'A self-initiated experiment: could a familiar cinematic moment be rebuilt as something you can play with in the browser? The aim was an interactive homage to The Matrix that turns iconic scenes into live ASCII.',
      approach:
        'Prototyped with v0 to get from idea to a working build quickly, then developed on Next.js, TypeScript and Tailwind CSS and deployed on Vercel.',
      design:
        'Scenes are rendered as dynamic ASCII in a green-on-black palette, echoing the film’s digital rain, so the look stays instantly recognisable and the interaction carries the experience.',
      outcome:
        'A live experience anyone can try in the browser, no install required.',
    },
  },
  {
    id: 2,
    slug: 'mythvox',
    title: 'MythVox',
    description: 'An online journal for role-playing games. You write the story, MythVox brings it to life with spoken narration and flair.',
    poster: '/MythVox.jpg',
    demo: '/MythVox.mp4',
    link: 'https://devpost.com/software/mythvox',
    linkLabel: 'VIEW ON DEVPOST',
    tags: ['Next.js', 'Three.js', 'Supabase', 'Google Gemini', 'ElevenLabs'],
    details: {
      brief:
        'Role-playing campaigns generate great stories that rarely get kept. MythVox is an online journal where players write up their sessions and have them brought to life.',
      approach:
        'A Next.js app with Supabase for storing journals, Google Gemini for AI-assisted storytelling and ElevenLabs for spoken narration, so every entry can be heard as well as read.',
      design:
        'Entries are presented as an open, illustrated book (using Three.js) so the journal feels like a keepsake rather than a document, with narration and imagery layered on top of the writing.',
      outcome:
        'Submitted to Devpost, where the project page has the full write-up and demo.',
    },
  },
  {
    id: 3,
    slug: 'time-warp',
    title: 'Time Warp',
    description: 'Historical reconstruction of a country property in the South of France, blending AI with archive records.',
    poster: '/timewarp.jpg',
    demo: '/timewarp.mp4',
    link: null,
    tags: ['Google Gemini', 'Veo 3'],
    details: {
      brief:
        'Bring a country property in the South of France back to life as it once was, using the archive records that survive.',
      approach:
        'Archive records and photographs were combined with Google Gemini and Veo 3 to reconstruct how the property looked and moved in the past.',
      design:
        'The visual language follows period photography, so the reconstruction feels like a window into the past rather than a modern render.',
      outcome:
        'This project isn’t publicly available yet. Get in touch if you’d like to know more or see more of it.',
    },
  },
]
