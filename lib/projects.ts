export const CONTACT_EMAIL = 'jmdpatterson1@gmail.com'

export type ProjectDetails = {
  brief: string
  build: string
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
  /** Width / height of the demo video, so the dialog can show it uncropped. */
  mediaAspect: number
  /** Live or public URL. When null the project isn't public and the dialog shows a contact CTA. */
  link: string | null
  linkLabel?: string
  tags: string[]
  details: ProjectDetails
}

export const projects: Project[] = [
  {
    id: 4,
    slug: 'the-sitting',
    title: 'THE SITTING',
    description: 'A mixed reality séance. Commune with restless spirits in a dynamic experience that reacts to your actions.',
    poster: '/the-sitting-poster.jpg',
    demo: '/the-sitting-demo.mp4',
    mediaAspect: 16 / 9,
    // Invite-only playtest build, so the dialog shows the contact CTA
    link: null,
    tags: ['WebXR', 'Meta Quest', 'Cloudflare'],
    details: {
      brief:
        'Ever wanted to talk to a ghost? THE SITTING brings a virtual séance to the room around you, blurring the lines between what is real and what is digital.',
      build:
        'Built with WebXR and deployed on Cloudflare, THE SITTING runs in-browser for Meta Quest, no app install needed. The experience is guided by a narrated Medium, and features sound and environmental effects.',
      design:
        'In THE SITTING, no two experiences are the same. Each spirit is an artificially intelligent entity, meaning encounters unfold dynamically and react to player interactions.',
      outcome:
        'Featured as an attraction at a Halloween party in Manchester, UK, and demoed at VR Manchester (October 2026). THE SITTING is currently in invite-only playtesting. Get in touch if you’d like to try it.',
    },
  },
  {
    id: 1,
    slug: 'free-your-mind',
    title: 'Free Your Mind',
    description: 'Step into the Matrix in this interactive homage that reimagines iconic scenes in dynamic ASCII.',
    poster: '/free-your-mind-poster.png',
    demo: '/free-your-mind-demo.mp4',
    mediaAspect: 400 / 390,
    link: 'https://free-your-mind.vercel.app/',
    linkLabel: 'LAUNCH THE EXPERIENCE',
    tags: ['Next.js', 'Vercel'],
    details: {
      brief:
        'A creative tech project exploring the capabilities of AI coding assistants. The goal was to rapidly design, build, and publicly release an interactive web experience.',
      build:
        'Built with Next.js, TypeScript and deployed on Vercel, movie scenes from The Matrix are manipulated and restyled using an ASCII renderer.',
      design:
        'The project illustrates how AI tools give humans the ability to manipulate digital content in real-time, echoing how in The Matrix, Neo gains the ability to manipulate the digital world around him and is no longer bound by physical limitations.',
      outcome:
        'Iconic scenes are recreated in the "digital rain" aesthetic. An interactive panel allows viewers to manipulate this effect to create different patterns. The experience is live and playable on the web.',
    },
  },
  {
    id: 2,
    slug: 'mythvox',
    title: 'MythVox',
    description: 'An online journal for role-playing games. You write the story, MythVox brings it to life with spoken narration and flair.',
    poster: '/MythVox.jpg',
    demo: '/MythVox.mp4',
    mediaAspect: 426 / 240,
    link: 'https://devpost.com/software/mythvox',
    linkLabel: 'VIEW ON DEVPOST',
    tags: ['Next.js', 'Supabase', 'Google Gemini', 'ElevenLabs'],
    details: {
      brief:
        'MythVox was designed to help players create compelling stories and bring their games to life. Using session notes from role-playing games, MythVox writes creative, narrated, and illustrated journal entries, turning recaps into immersive stories.',
      build:
        'A Next.js app with Supabase backend for storing journal content, AI integrations (Google Gemini, ElevenLabs) to augment creative writing and power realistic text-to-speech narration.',
      design:
        'A clean, simple interface that allows players to easily create journal entries. The design focuses on readability and immersion, with a layout that mimics a traditional journal. AI features were intentionally designed to augment, not replace human creativity.',
      outcome:
        'Entered into Bolt’s "World’s Largest Hackathon" 2025. The project page has the full write-up and video demo.',
    },
  },
  {
    id: 3,
    slug: 'time-warp',
    title: 'Time Warp',
    description: 'Archive photography and records turned into video scenes of a French farm house as it once was.',
    poster: '/timewarp.jpg',
    demo: '/timewarp.mp4',
    mediaAspect: 960 / 540,
    link: null,
    tags: ['Google Gemini', 'Veo 3'],
    details: {
      brief:
        'Reconstruct this rural Lot-et-Garonne property and bring its history back to life.',
      build:
        'Archive records and old photos were combined with modern photography and AI image manipulation and video creation tools (Nano Banana, Veo 3).',
      design:
        'Following a period of research, video scenes were storyboarded against known and likely historical details.',
      outcome:
        'A series of video scenes comparing the present-day to the past. This project isn’t publicly available. Get in touch if you’d like to know more.',
    },
  },
]
