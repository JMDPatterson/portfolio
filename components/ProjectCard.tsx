"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { GradientButton } from "./gradient-button"
import { Badge } from "@/components/ui/badge"

export type Project = {
  id: number
  title: string
  description: string
  poster: string | null
  demo: string | null
  link: string | null
  tags: string[]
}

type ProjectCardProps = {
  project: Project
  isHovered: boolean
}

export function ProjectCard({ project, isHovered }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Only fetch and play the demo while the card is active
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isHovered) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isHovered])

  return (
    <Card
      className="bg-[#1e1e1e] border-none transition-all duration-300 lg:hover:scale-105 lg:hover:bg-[#2a2a2a] touch-manipulation"
    >
      <CardContent className="p-0">
        <div className="aspect-video relative rounded-t-lg overflow-hidden">
          {project.poster && project.demo ? (
            <>
              <Image
                src={project.poster}
                alt={`${project.title} preview`}
                fill
                style={{ objectFit: "cover" }}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              <video
                ref={videoRef}
                src={project.demo}
                aria-hidden="true"
                tabIndex={-1}
                loop
                muted
                playsInline
                preload="none"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-400 via-red-400 to-blue-500 rounded-t-lg"></div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#ffffff]">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4 min-h-[4.5rem] content-start">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          {project.link ? (
            <GradientButton size="sm" asChild className="w-full">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read more about ${project.title} (opens in a new tab)`}
              >
                READ MORE
              </a>
            </GradientButton>
          ) : (
            <GradientButton size="sm" className="w-full" disabled>
              COMING SOON
            </GradientButton>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
