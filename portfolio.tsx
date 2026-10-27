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
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectDialog } from '@/components/ProjectDialog'
import { CONTACT_EMAIL, projects, type Project } from '@/lib/projects'

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#background', label: 'About' },
  { href: '#connect', label: 'Contact' },
]

export default function Portfolio() {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const isMobile = useIsMobile()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [openProject, setOpenProject] = useState<Project | null>(null)

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
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="bg-[#000000] text-[#ffffff]">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
        <nav
          aria-label="Primary"
          className="max-w-7xl mx-auto flex items-center justify-between px-8 sm:px-12 lg:px-4 h-14"
        >
          <a href="#hero" className="font-bold tracking-wide">
            JP
          </a>
          <ul className="flex items-center gap-1 sm:gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex items-center min-h-[44px] px-3 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-end px-8 sm:px-12 pt-24 pb-16 lg:pb-8 lg:px-4 lg:justify-center overflow-hidden"
        >
          {/* Quarter sphere background element - mobile only */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[90vw] h-[90vw] transform translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#c94fc8] to-[#76d0d0] lg:hidden"
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center text-left">
              <div className="mb-4 lg:mb-8 flex justify-start">
                <div className="inline-block bg-[#ffffff] text-[#000000] px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base">
                  JAMES PATTERSON
                </div>
              </div>

              <h1 className="text-[12vw] sm:text-7xl lg:text-8xl font-bold leading-tight mb-3 lg:mb-6">
                IMAGINE.
                <br />
                BUILD.
                <br />
                INSPIRE.
              </h1>
              <p className="text-base sm:text-lg mb-5 lg:mb-8 text-gray-300 max-w-lg">
                I work at the intersection of human creativity and emerging technology to create meaningful and immersive experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xs sm:max-w-none">
                <GradientButton size="lg" onClick={() => scrollToSection('work')}>
                  EXPLORE MY WORK
                </GradientButton>
                <a
                  href="#connect"
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-4 text-base font-semibold border border-white/40 hover:border-white hover:bg-white/10 transition-colors"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>
            {/* Three spheres - visible on desktop */}
            <div className="hidden lg:flex justify-center items-center">
              <Image
                src="/three-spheres.svg"
                alt=""
                aria-hidden="true"
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
          className="min-h-screen flex items-center justify-center py-16 lg:py-24 scroll-mt-14"
        >
          <div className="max-w-7xl mx-auto w-full px-8 sm:px-12">
            <h2 className="text-[12vw] sm:text-[12vw] lg:text-6xl font-bold text-left md:text-center mb-6 lg:mb-8">
              WHAT I&apos;VE<br className="lg:hidden" /> WORKED ON
            </h2>
            <p className="text-base sm:text-lg mb-8 lg:mb-12 text-gray-300 text-left md:text-center">
              Some of the things I&rsquo;ve built while learning, experimenting, and bringing ideas to life.
            </p>
            {/* Mobile Carousel */}
            <div className="block lg:hidden">
              <Carousel setApi={setApi} className="w-full mx-auto" opts={{ align: 'center' }}>
                <CarouselContent className="gap-x-4 -mx-2">
                  {projects.map((project, index) => (
                    <CarouselItem key={project.id} className="px-2">
                      <ProjectCard project={project} isHovered={current - 1 === index} onOpen={setOpenProject} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              {/* Pagination Dots */}
              <div className="flex justify-center gap-1 mt-6" role="group" aria-label="Choose project">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Show project ${index + 1} of ${count}`}
                    aria-current={index + 1 === current}
                    className="w-11 h-11 flex items-center justify-center"
                  >
                    <span
                      className={cn(
                        'block w-3 h-3 rounded-full',
                        index + 1 === current
                          ? 'bg-gradient-to-r from-[#c94fc8] to-[#76d0d0]'
                          : 'bg-gray-700'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onFocus={() => setHoveredProject(project.id)}
                    onBlur={() => setHoveredProject(null)}
                  >
                    <ProjectCard project={project} isHovered={hoveredProject === project.id} onOpen={setOpenProject} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* My Background */}
        <section
          id="background"
          className="min-h-screen flex flex-col justify-center px-8 sm:px-12 py-16 lg:px-4 overflow-hidden scroll-mt-14"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            <div className="flex flex-col justify-center text-left">
              <h2 className="text-[12vw] sm:text-[12vw] lg:text-6xl font-bold mb-6 lg:mb-8">
                MY
                <br />
                BACKGROUND
              </h2>
              <div className="space-y-4 lg:space-y-6 text-gray-300">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  I&apos;m a UK-based creative technologist, passionate about leveraging emerging technologies to craft innovative and human-centred experiences.
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  With a background in design engineering and software development, I combine creative problem-solving
                  with technical know-how to explore projects that push the boundary of what&apos;s possible.
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Currently working at PwC UK, I explore the impact of AI and immersive technologies (AR/VR/XR) on businesses and society,
                  and guide clients through shaping the future of digital experiences.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center mb-8 lg:mb-0">
              <div
                className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:w-96 lg:h-[28rem] mx-auto lg:mx-0 rounded-lg overflow-hidden transition-transform duration-700 lg:hover:scale-105"
                onMouseEnter={() => { if (!isMobile) setIsHovered(true); }}
                onMouseLeave={() => { if (!isMobile) setIsHovered(false); }}
                onTouchStart={() => { if (isMobile) setIsHovered(true); }}
                onTouchEnd={() => { if (isMobile) setIsHovered(false); }}
              >
                <Image
                  src="/portrait.jpg"
                  alt="Portrait of James Patterson"
                  width={384}
                  height={448}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isHovered ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="lazy"
                />
                <Image
                  src="/portrait-hover.jpg"
                  alt=""
                  aria-hidden="true"
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
          className="min-h-screen flex flex-col justify-center px-8 sm:px-12 py-16 lg:px-4 overflow-hidden scroll-mt-14"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            <div className="flex flex-col justify-center text-left">
              <h2 className="text-[12vw] sm:text-[10vw] lg:text-6xl font-bold mb-6 lg:mb-8">LET&apos;S<br />CONNECT</h2>
              <div className="space-y-4 lg:space-y-6 text-gray-300 mb-6 lg:mb-8">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  I&apos;m open to new roles and freelance projects in AI, immersive tech and creative development.
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Hiring, have a project in mind, or just want to swap ideas on emerging technology? Get in touch at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-4 hover:text-[#76d0d0]">
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </div>
              <div className="flex justify-start gap-4 mb-6 lg:mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-[#ffffff] hover:bg-[#1e1e1e] hover:text-[#ffffff] transition-all duration-300 hover:scale-110 w-12 h-12 touch-manipulation"
                >
                  <a href="https://github.com/JMDPatterson" target="_blank" rel="noopener noreferrer" aria-label="James Patterson on GitHub (opens in a new tab)">
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-[#ffffff] hover:bg-[#1e1e1e] hover:text-[#ffffff] transition-all duration-300 hover:scale-110 w-12 h-12 touch-manipulation"
                >
                  <a href="https://www.linkedin.com/in/jmdpatterson/" target="_blank" rel="noopener noreferrer" aria-label="James Patterson on LinkedIn (opens in a new tab)">
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-start">
                <GradientButton size="lg" asChild className="w-full sm:w-auto">
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    EMAIL ME
                  </a>
                </GradientButton>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center lg:pl-36">
              <Image
                src="/mask-group.svg"
                alt=""
                aria-hidden="true"
                width={300}
                height={300}
                className="w-80 h-80 transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
    </div>
  )
}
