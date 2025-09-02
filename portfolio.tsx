'use client'

import { Button } from '@/components/ui/button'
import { Linkedin, Github } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { GradientButton } from './components/gradient-button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { ProjectCard, type Project } from '@/components/ProjectCard'

const projects: Project[] = [
  {
    id: 1,
    title: 'Free Your Mind',
    description: 'Step into the Matrix in this interactive homage that reimagines iconic scenes in dynamic ASCII. Built with v0.',
    poster: '/free-your-mind-poster.png',
    demo: '/free-your-mind-demo.gif',
    link: 'https://free-your-mind.vercel.app/',
    tags: ['Next.js', 'Vercel', 'v0', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'MythVox',
    description: 'An online journal for role-playing games. You write the story, MythVox brings it to life with spoken narration and flair.',
    poster: '/MythVox.png',
    demo: '/MythVox.gif',
    link: 'https://devpost.com/software/mythvox',
    tags: ['Next.js', 'Three.js', 'Supabase', 'Google Gemini', 'ElevenLabs'],
  },
  {
    id: 3,
    title: 'Time Warp',
    description: 'Historical reconstruction of a country property in the South of France, blending AI with archive records.',
    poster: '/timewarp.png',
    demo: '/timewarp.mp4',
    link: null,
    tags: ['Google Gemini'],
  },
  {
    id: 4,
    title: 'Coming Soon',
    description: 'Stay tuned for exciting new projects currently in the works!',
    poster: null,
    demo: null,
    link: null,
    tags: ['TBC'],
  },
];

export default function Portfolio() {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const isMobile = useIsMobile()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Smooth scrolling polyfill for older browsers
    const smoothScrollTo = (element: Element) => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    // Add smooth scrolling to any anchor links
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute('href') || '')
        if (target) {
          smoothScrollTo(target)
        }
      })
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', () => {})
      })
    }
  }, [])

  // Carousel effect for slide tracking
  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    }
    api.on('select', onSelect)

    // Listen for init event to ensure count is correct after initialization
    const onInit = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }
    api.on('init', onInit)

    // Cleanup function
    return () => {
      api.off('select', onSelect)
      api.off('init', onInit)
    }
  }, [api])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col px-8 sm:px-12 pb-32 bg-[#000000] text-[#ffffff] overflow-hidden lg:flex lg:items-center lg:justify-center lg:px-4 lg:py-8 lg:py-12"
      >
        {/* Quarter sphere background element - mobile only */}
        <div className="absolute top-0 right-0 w-[90vw] h-[90vw] transform translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#c94fc8] to-[#76d0d0] block lg:hidden"></div>

        {/* Content for the bottom three-quarters - mobile only */}
        <div className="relative z-10 flex flex-col justify-end flex-grow w-full max-w-7xl mx-auto lg:hidden">
          <div className="flex flex-col justify-center text-left">
            {/* Header Badge */}
            <div className="mb-4 flex justify-start">
              <div className="inline-block bg-[#ffffff] text-[#000000] px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base">
                JAMES PATTERSON
              </div>
            </div>

            <h1 className="text-[12vw] lg:text-8xl font-bold leading-tight mb-3 lg:mb-6">
              IMAGINE.
              <br />
              BUILD.
              <br />
              INSPIRE.
            </h1>
            <p className="text-base sm:text-lg mb-5 lg:mb-8 text-gray-300">
              I work at the intersection of human creativity and emerging technology to redefine experiences.
            </p>
            <div className="flex justify-start">
              <GradientButton
                size="lg"
                onClick={() => scrollToSection('work')}
                className="w-full"
              >
                EXPLORE MY WORK
              </GradientButton>
            </div>
          </div>
        </div>

        {/* Desktop content - visible only on desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-12 lg:items-center lg:max-w-7xl lg:mx-auto lg:w-full">
          <div className="flex flex-col justify-center text-left">
            {/* Header Badge positioned above hero text */}
            <div className="mb-6 lg:mb-8 flex justify-start">
              <div className="inline-block bg-[#ffffff] text-[#000000] px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base">
                JAMES PATTERSON
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4 lg:mb-6">
              IMAGINE.
              <br />
              BUILD.
              <br />
              INSPIRE.
            </h1>
            <p className="text-base sm:text-lg mb-6 lg:mb-8 text-gray-300 max-w-lg">
              I work at the intersection of human creativity and emerging technology to redefine experiences.
            </p>
            <div className="flex justify-start">
              <GradientButton
                size="lg"
                onClick={() => scrollToSection('work')}
                className="w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                EXPLORE MY WORK
              </GradientButton>
            </div>
          </div>
          {/* Three spheres - visible on desktop */}
          <div className="flex justify-center items-center">
            <Image
              src="/three-spheres.svg"
              alt="Three spheres graphic"
              width={400}
              height={400}
              className="w-96 h-96 transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>
      </section>

      {/* What I've Worked On */}
      <section
        id="work"
        className="min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-16 bg-[#000000] text-[#ffffff]"
      >
        <div className="max-w-7xl mx-auto w-full px-8 sm:px-12">
          <h2 className="text-[12vw] sm:text-[12vw] lg:text-6xl font-bold text-left md:text-center mb-6 lg:mb-8">
            WHAT I'VE<br className="lg:hidden" /> WORKED ON
          </h2>
          <p className="text-base sm:text-lg mb-8 lg:mb-12 text-gray-300 text-left md:text-center">
            Some of the things I’ve built while learning, experimenting, and bringing ideas to life.
          </p>
          {/* Mobile Carousel */}
          <div className="block lg:hidden">
            <Carousel setApi={setApi} className="w-full mx-auto" opts={{ align: 'center' }}>
              <CarouselContent className="gap-x-4 -mx-2">
                {projects.map((project) => (
                  <CarouselItem key={project.id} className="px-2" onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
                    <ProjectCard project={project} isHovered={hoveredProject === project.id} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: count }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-3 h-3 rounded-full',
                    index + 1 === current
                      ? 'bg-gradient-to-r from-[#c94fc8] to-[#76d0d0]'
                      : 'bg-gray-700'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {projects.map((project) => (
                <div key={project.id} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
                  <ProjectCard project={project} isHovered={hoveredProject === project.id} />
                </div>
              ))}
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8 hidden">
              {/* Render a single dot for desktop */}
              <div
                className="w-3 h-3 rounded-full bg-gradient-to-r from-[#c94fc8] to-[#76d0d0]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* My Background */}
      <section
        id="background"
        className="min-h-screen flex flex-col px-8 sm:px-12 pb-32 bg-[#000000] text-[#ffffff] overflow-hidden lg:flex lg:items-center lg:justify-center lg:px-4 lg:py-8 lg:py-12"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <div className="flex flex-col justify-center text-left lg:text-left order-1 lg:order-1">
            <h2 className="text-[12vw] sm:text-[12vw] lg:text-6xl font-bold mb-6 lg:mb-8">
              MY
              <br />
              BACKGROUND
            </h2>
            <div className="space-y-4 lg:space-y-6 text-gray-300">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                I'm a creative technologist passionate about leveraging emerging technologies to craft elegant and
                meaningful human experiences.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                With a background in design engineering and software development, I combine creative problem-solving
                with technical know-how to explore the potential of emerging technologies to drive
                innovation, fostering new ways to connect, engage, and inspire.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Currently working at PwC UK, I explore the impact of AI and immersive technologies (AR/VR/XR) on businesses and society,
                and guide clients through shaping the future of digital experiences.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-center items-center order-2 lg:order-2 mb-8 lg:mb-0">
            <div
              className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:w-96 lg:h-[28rem] mx-auto lg:mx-0 rounded-lg overflow-hidden transition-transform duration-700 lg:hover:scale-105"
              onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
              onMouseLeave={() => { if (!isMobile) setIsHovered(false); }}
              onTouchStart={() => { if (isMobile) setIsHovered(true); }}
              onTouchEnd={() => { if (isMobile) setIsHovered(false); }}
            >
              <Image
                src="/portrait.jpg"
                alt="James Patterson"
                width={384}
                height={448}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
              />
              <Image
                src="/portrait-hover.jpg"
                alt="James Patterson Hover"
                width={384}
                height={448}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Let's Connect */}
      <section
        id="connect"
        className="min-h-screen flex flex-col px-8 sm:px-12 bg-[#000000] text-[#ffffff] overflow-hidden lg:flex lg:items-center lg:justify-center lg:px-4 lg:py-8 lg:py-12"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <div className="flex flex-col justify-center text-left lg:text-left order-1 lg:order-1">
            <h2 className="text-[12vw] sm:text-[10vw] lg:text-6xl font-bold mb-6 lg:mb-8">LET'S<br />CONNECT</h2>
            <div className="space-y-4 lg:space-y-6 text-gray-300 mb-6 lg:mb-8">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Technology moves fast, and I love exchanging ideas with fellow innovators.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Whether you want to share ideas, or exchange perspectives on emerging technology, feel free to reach
                out!
              </p>
            </div>
            <div className="flex justify-start gap-4 mb-6 lg:mb-8">
              <a href="https://github.com/JMDPatterson" target="_blank" rel="noopener noreferrer" aria-label="View my GitHub profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#ffffff] hover:bg-[#1e1e1e] hover:text-[#ffffff] transition-all duration-300 hover:scale-110 w-12 h-12 touch-manipulation"
                >
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/jmdpatterson/" target="_blank" rel="noopener noreferrer" aria-label="View my LinkedIn profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#ffffff] hover:bg-[#1e1e1e] hover:text-[#ffffff] transition-all duration-300 hover:scale-110 w-12 h-12 touch-manipulation"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="flex justify-start">
              <a href="https://form.typeform.com/to/z6VvFjSJ" target="_blank" rel="noopener noreferrer">
                <GradientButton size="lg" className="w-full">
                  CONTACT ME
                </GradientButton>
              </a>
            </div>
          </div>
          <div className="hidden lg:block flex justify-center lg:justify-center items-center order-2 lg:order-2 lg:pl-36">
            <Image
              src="/mask-group.svg"
              alt="Connect graphic"
              width={300}
              height={300}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 transition-transform duration-700 hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
