"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Github } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { GradientButton } from "./components/gradient-button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export default function Portfolio() {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Smooth scrolling polyfill for older browsers
    const smoothScrollTo = (element: Element) => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Add smooth scrolling to any anchor links
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute("href") || "")
        if (target) {
          smoothScrollTo(target)
        }
      })
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", () => {})
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
    api.on("select", onSelect)

    // Listen for init event to ensure count is correct after initialization
    const onInit = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }
    api.on("init", onInit)

    // Cleanup function
    return () => {
      api.off("select", onSelect)
      api.off("init", onInit)
    }
  }, [api])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col px-8 sm:px-12 pb-32 bg-[#000000] text-[#ffffff] snap-start overflow-hidden lg:flex lg:items-center lg:justify-center lg:px-4 lg:py-8 lg:py-12"
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
                onClick={() => scrollToSection("work")}
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
                onClick={() => scrollToSection("work")}
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
        className="min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-16 bg-[#000000] text-[#ffffff] snap-start"
      >
        <div className="max-w-7xl mx-auto w-full px-8 sm:px-12">
          <h2 className="text-[10vw] sm:text-[10vw] lg:text-6xl font-bold text-left md:text-center mb-6 lg:mb-8">
            WHAT I'VE<br className="lg:hidden" /> WORKED ON
          </h2>
          <p className="text-base sm:text-lg mb-8 lg:mb-12 text-gray-300 text-left md:text-center">
            Some of the things I’ve built while learning, experimenting, and bringing ideas to life.
          </p>
          {/* Mobile Carousel */}
          <div className="block lg:hidden">
            <Carousel setApi={setApi} className="w-full mx-auto" opts={{ align: "center" }}>
              <CarouselContent className="gap-x-4 -mx-2">
                {[1, 2, 3].map((item) => (
                  <CarouselItem key={item} className="px-2">
                    <Card
                      className="bg-[#1e1e1e] border-none transition-all duration-300 touch-manipulation"
                      onMouseEnter={() => setHoveredProject(item)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-video relative rounded-t-lg overflow-hidden">
                          {item === 1 ? (
                            <>
                              <Image
                                src="/free-your-mind-poster.png"
                                alt="Free Your Mind Poster"
                                fill
                                style={{ objectFit: 'cover' }}
                                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                                  hoveredProject === item ? "opacity-0" : "opacity-100"
                                }`}
                              />
                              <Image
                                src="/free-your-mind-demo.gif"
                                alt="Free Your Mind Demo GIF"
                                fill
                                style={{ objectFit: 'cover' }}
                                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                                  hoveredProject === item ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </>
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-400 via-red-400 to-blue-500 rounded-t-lg"></div>
                          )}
                        </div>
                        <div className="p-6 sm:p-8">
                          <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#ffffff]">
                            {item === 1 ? "Free Your Mind" : "Coming Soon"}
                          </h3>
                          <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                            {item === 1
                              ? "Step into the Matrix in this interactive homage that reimagines iconic scenes in dynamic ASCII. Built using v0."
                              : "Stay tuned for exciting new projects currently in the works! More details will be revealed soon."}
                          </p>
                          {item === 1 ? (
                            <a href="https://free-your-mind.vercel.app/" target="_blank" rel="noopener noreferrer">
                              <GradientButton size="sm" className="w-full">
                                READ MORE
                              </GradientButton>
                            </a>
                          ) : (
                            <GradientButton size="sm" className="w-full">
                              COMING SOON
                            </GradientButton>
                          )}
                        </div>
                      </CardContent>
                    </Card>
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
                    "w-3 h-3 rounded-full",
                    index + 1 === current
                      ? "bg-gradient-to-r from-[#c94fc8] to-[#76d0d0]"
                      : "bg-gray-700"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {[1, 2, 3].map((item) => (
                <Card
                  key={item}
                  className="bg-[#1e1e1e] border-none transition-all duration-300 lg:hover:scale-105 lg:hover:bg-[#2a2a2a] touch-manipulation"
                  onMouseEnter={() => setHoveredProject(item)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video relative rounded-t-lg overflow-hidden">
                      {item === 1 ? (
                        <>
                          <Image
                            src="/free-your-mind-poster.png"
                            alt="Free Your Mind Poster"
                            fill
                            style={{ objectFit: 'cover' }}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                              hoveredProject === item ? "opacity-0" : "opacity-100"
                            }`}
                          />
                          <Image
                            src="/free-your-mind-demo.gif"
                            alt="Free Your Mind Demo GIF"
                            fill
                            style={{ objectFit: 'cover' }}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                              hoveredProject === item ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </>
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-400 via-red-400 to-blue-500 rounded-t-lg"></div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#ffffff]">
                        {item === 1 ? "Free Your Mind" : "Coming Soon"}
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                        {item === 1
                          ? "Step into the Matrix in this interactive homage that reimagines iconic scenes in dynamic ASCII. Built with Vercel’s v0."
                          : "Stay tuned for exciting new projects currently in the works! More details will be revealed soon."}
                      </p>
                      {item === 1 ? (
                        <a href="https://free-your-mind.vercel.app/" target="_blank" rel="noopener noreferrer">
                          <GradientButton size="sm" className="w-full">
                            READ MORE
                          </GradientButton>
                        </a>
                      ) : (
                        <GradientButton size="sm" className="w-full">
                          COMING SOON
                        </GradientButton>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
        className="min-h-screen flex flex-col px-8 sm:px-12 pb-32 bg-[#000000] text-[#ffffff] snap-start overflow-hidden lg:flex lg:items-center lg:justify-center lg:px-4 lg:py-8 lg:py-12"
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
                With a background in design engineering and software development, I leverage creative problem-solving
                with technical depth to explore the transformative potential of emerging technologies to drive
                innovation, fostering new ways to connect, engage, and inspire.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Currently working at PwC UK, I explore the impact of emerging technologies on businesses and society,
                and guide clients through shaping the future of digital experiences.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-center items-center order-2 lg:order-2 mb-8 lg:mb-0">
            <div
              className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:w-96 lg:h-[28rem] mx-auto lg:mx-0 rounded-lg overflow-hidden transition-transform duration-700 hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src="/portrait.jpg"
                alt="James Patterson"
                width={384}
                height={448}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
              />
              <Image
                src="/portrait-hover.jpg"
                alt="James Patterson Hover"
                width={384}
                height={448}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isHovered ? "opacity-100" : "opacity-0"
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
        className="min-h-screen flex flex-col px-8 sm:px-12 pb-32 bg-[#000000] text-[#ffffff] snap-start overflow-hidden lg:flex lg:items-center lg:justify-center lg:px-4 lg:py-8 lg:py-12"
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
              <a href="https://github.com/JMDPatterson" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#ffffff] hover:bg-[#1e1e1e] hover:text-[#ffffff] transition-all duration-300 hover:scale-110 w-12 h-12 touch-manipulation"
                >
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/jmdpatterson/" target="_blank" rel="noopener noreferrer">
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
