"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { GradientButton } from "./gradient-button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"

type ProjectCardProps = {
  project: Project
  isHovered: boolean
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, isHovered, onOpen }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Only fetch and play the demo while the card is active
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isHovered) {
      // AbortError just means pause() interrupted play(); anything else is a real failure
      video.play().catch((err: DOMException) => {
        if (err.name !== "AbortError") console.warn(`Demo failed to play: ${project.demo}`, err)
      })
    } else {
      video.pause()
    }
  }, [isHovered, project.demo])

  return (
    <Card
      className="bg-[#1e1e1e] border-none transition-all duration-300 lg:hover:scale-105 lg:hover:bg-[#2a2a2a] touch-manipulation"
    >
      <CardContent className="p-0">
        <div className="aspect-video relative rounded-t-lg overflow-hidden">
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
          <GradientButton
            size="sm"
            className="w-full"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-label={`Read more about ${project.title}`}
          >
            READ MORE
          </GradientButton>
        </div>
      </CardContent>
    </Card>
  )
}
