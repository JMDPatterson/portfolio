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
  const cta = project && (
    project.link ? (
      <GradientButton size="md" asChild className="w-full">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
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
    )
  )

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto bg-[#1e1e1e] border-white/10 text-white p-0 gap-0">
        {project && (
          <div>
            <div className="relative flex items-center justify-center overflow-hidden bg-black">
              {/* Blurred backdrop fills any space the uncropped video leaves */}
              <Image
                src={project.poster}
                alt=""
                aria-hidden="true"
                fill
                sizes="64rem"
                className="object-cover scale-110 blur-2xl opacity-50"
              />
              <video
                key={project.slug}
                src={project.demo}
                poster={project.poster}
                aria-label={`${project.title} demo`}
                style={{
                  aspectRatio: project.mediaAspect,
                  width: `min(100%, calc(44vh * ${project.mediaAspect}))`,
                }}
                autoPlay
                loop
                muted
                playsInline
                className="relative block h-auto"
              />
            </div>
            <div className="p-6 sm:px-8 sm:py-6 flex flex-col">
              <div className="md:flex md:items-end md:justify-between md:gap-8 mb-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gray-400 mb-2">
                    PROJECT DETAILS
                  </p>
                  <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
                    {project.title}
                  </DialogTitle>
              <DialogDescription className="sr-only">
                Brief, approach, design and outcome for {project.title}
              </DialogDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block md:w-72 shrink-0">{cta}</div>
              </div>

              <dl className="grid gap-5 md:grid-cols-2 md:gap-x-10 text-sm sm:text-base leading-relaxed">
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

              <div className="mt-6 md:hidden">
                {cta}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
