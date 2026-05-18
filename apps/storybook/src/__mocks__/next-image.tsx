import React from "react"

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  style?: React.CSSProperties
}

export default function Image({ src, alt, fill, className, style, ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style}
      {...props}
    />
  )
}
