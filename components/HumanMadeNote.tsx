"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function HumanMadeNote() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    // Below the dialog overlay (z-50) so it never sits over an open project
    <aside
      aria-label="About this site"
      className="fixed top-3 right-3 z-40 max-w-[16rem] sm:top-4 sm:right-4 sm:max-w-xs rounded-lg border border-white/15 bg-black/80 backdrop-blur-md py-3 pl-4 pr-9 text-xs sm:text-sm leading-snug text-gray-200 shadow-lg"
    >
      <p>
        Designed and written {" "}
        <span className="font-semibold bg-gradient-to-r from-[#c94fc8] to-[#76d0d0] bg-clip-text text-transparent">
          by a human
        </span>
      </p>
      <p className="mt-1 text-[10px] sm:text-xs text-gray-400">
        (*I used AI to help implement website code, but the site style, layout, and content is my own.)
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss message"
        className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 touch-manipulation"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </aside>
  )
}
