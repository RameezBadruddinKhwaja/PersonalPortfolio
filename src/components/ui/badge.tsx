import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

const variantStyles = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-muted text-muted-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "border border-input bg-background",
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  )
}