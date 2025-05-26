"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Github } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import { GradientButton } from "./components/gradient-button"

export default function Portfolio() {
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
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-[#000000] text-[#ffffff] snap-start"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
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
          {/* Three spheres - hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex justify-center items-center">
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
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16 bg-[#000000] text-[#ffffff] snap-start"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
            WHAT I'VE WORKED ON
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="bg-[#1e1e1e] border-none transition-all duration-300 hover:scale-105 hover:bg-[#2a2a2a] touch-manipulation"
              >
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-orange-400 via-red-400 to-blue-500 rounded-t-lg"></div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#ffffff]">Free Your Mind</h3>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                      Give a brief overview of the successful project here. You may talk about the client brand, the
                      main challenge you overcame or the award you got for it.
                    </p>
                    <GradientButton size="sm" className="w-full sm:w-auto">
                      READ MORE
                    </GradientButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* My Background */}
      <section
        id="background"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16 bg-[#000000] text-[#ffffff] snap-start"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
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
          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-lg overflow-hidden transition-transform duration-700 hover:scale-105">
              <Image
                src="/portrait.jpg"
                alt="James Patterson"
                width={384}
                height={448}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Let's Connect */}
      <section
        id="connect"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16 bg-[#000000] text-[#ffffff] snap-start"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">LET'S CONNECT</h2>
            <div className="space-y-4 lg:space-y-6 text-gray-300 mb-6 lg:mb-8">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Technology moves fast, and I love exchanging ideas with fellow innovators.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Whether you want to share ideas, or exchange perspectives on emerging technology, feel free to reach
                out!
              </p>
            </div>
            <div className="flex justify-center lg:justify-start gap-4 mb-6 lg:mb-8">
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
            <div className="flex justify-center lg:justify-start">
              <a href="https://form.typeform.com/to/z6VvFjSJ" target="_blank" rel="noopener noreferrer">
                <GradientButton size="lg" className="w-full sm:w-auto max-w-xs sm:max-w-none">
                  CONTACT ME
                </GradientButton>
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center order-1 lg:order-2">
            <Image
              src="/mask-group.svg"
              alt="Connect graphic"
              width={300}
              height={300}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
