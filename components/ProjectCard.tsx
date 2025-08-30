"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { GradientButton } from "./gradient-button"

export type Project = {
  id: number
  title: string
  description: string
  poster: string | null
  demo: string | null
  link: string | null
  status: string
}

type ProjectCardProps = {
  project: Project
  isHovered: boolean
}

export function ProjectCard({ project, isHovered }: ProjectCardProps) {
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
                alt={`${project.title} Poster`}
                fill
                style={{ objectFit: "cover" }}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              <Image
                src={project.demo}
                alt={`${project.title} Demo GIF`}
                fill
                style={{ objectFit: "cover" }}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
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
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
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
  )
}