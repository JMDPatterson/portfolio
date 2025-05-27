import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "px-4 py-2 text-sm min-h-[44px]", // Minimum touch target size
      md: "px-6 py-3 text-sm min-h-[44px]",
      lg: "px-8 py-4 text-base min-h-[48px]",
    }

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-[#c94fc8] to-[#76d0d0] hover:from-[#b844b7] hover:to-[#65bfbf] active:from-[#a73ba6] active:to-[#54aeae]",
      secondary:
        "bg-gradient-to-r from-[#c94fc8] to-[#76d0d0] hover:from-[#b844b7] hover:to-[#65bfbf] active:from-[#a73ba6] active:to-[#54aeae]",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "text-white font-semibold rounded-none transition-all duration-300 hover:scale-105 active:scale-95 border-none touch-manipulation",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

GradientButton.displayName = "GradientButton"

export { GradientButton }
