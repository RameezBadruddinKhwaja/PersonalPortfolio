"use client"

interface WatermarkOverlayProps {
  text?: string
  opacity?: number
}

export function WatermarkOverlay({
  text = "Rameez Bader Khwaja",
  opacity = 0.15
}: WatermarkOverlayProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center select-none"
      style={{ opacity }}
    >
      <div className="relative w-full h-full">
        {/* Diagonal watermarks */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-foreground font-bold text-2xl md:text-4xl whitespace-nowrap"
            style={{
              top: `${15 + i * 15}%`,
              left: '50%',
              transform: `translate(-50%, -50%) rotate(-45deg)`,
              textShadow: '0 0 10px rgba(0,0,0,0.3)',
            }}
          >
            {text}
          </div>
        ))}

        {/* Center watermark */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground font-bold text-3xl md:text-5xl"
          style={{
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            textShadow: '0 0 15px rgba(0,0,0,0.5)',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  )
}
