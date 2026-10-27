"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { GradientButton } from "./gradient-button"
import { CONTACT_EMAIL, type Project } from "@/lib/projects"

type ProjectDialogProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto bg-[#1e1e1e] border-white/10 text-white p-0 gap-0">
        {project && (
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-3 relative aspect-video md:aspect-auto md:min-h-[28rem] bg-black">
              <Image
                src={project.poster}
                alt={`${project.title} preview`}
                fill
                style={{ objectFit: "cover" }}
              />
              <video
                src={project.demo}
                aria-label={`${project.title} demo`}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-2 p-6 sm:p-8 flex flex-col">
              <p className="text-xs font-semibold tracking-widest text-gray-400 mb-2">
                PROJECT DETAILS
              </p>
              <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
                {project.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Brief, approach, design and outcome for {project.title}
              </DialogDescription>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <dl className="space-y-5 text-sm sm:text-base leading-relaxed">
                {(
                  [
                    ["Brief", project.details.brief],
                    ["Approach", project.details.approach],
                    ["Design", project.details.design],
                    ["Outcome", project.details.outcome],
                  ] as const
                ).map(([label, text]) => (
                  <div key={label}>
                    <dt className="font-semibold uppercase tracking-wide text-xs bg-gradient-to-r from-[#c94fc8] to-[#76d0d0] bg-clip-text text-transparent mb-1">
                      {label}
                    </dt>
                    <dd className="text-gray-300">{text}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                {project.link ? (
                  <GradientButton size="md" asChild className="w-full">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.linkLabel ?? "VISIT PROJECT"}
                    </a>
                  </GradientButton>
                ) : (
                  <GradientButton size="md" asChild className="w-full">
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                        `Enquiry about ${project.title}`
                      )}`}
                    >
                      CONTACT ME FOR MORE INFO
                    </a>
                  </GradientButton>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
