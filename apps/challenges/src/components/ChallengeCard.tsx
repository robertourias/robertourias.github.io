"use client"

import { useState } from "react"
import Image from "next/image"
import { ItemCard, type ItemCardLink } from "@ui"
import type { Challenge } from "@/lib/github"

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [imgError, setImgError] = useState(false)

  const media = (
    <div className="aspect-video relative bg-muted">
      {imgError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-semibold text-muted-foreground select-none">
            {challenge.name.charAt(0)}
          </span>
        </div>
      ) : (
        <Image
          src={challenge.previewUrl}
          alt={`Preview de ${challenge.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )

  const links: ItemCardLink[] = [
    {
      label: "Ver repositório",
      href: challenge.repoUrl,
      variant: "outline",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    ...(challenge.visualizarUrl
      ? [
          {
            label: "Visualizar",
            href: challenge.visualizarUrl,
            variant: "secondary" as const,
            target: "_blank" as const,
            rel: "noopener noreferrer",
          },
        ]
      : []),
    ...(challenge.projectUrl
      ? [
          {
            label: "Ver projeto",
            href: challenge.projectUrl,
            variant: "default" as const,
            target: "_blank" as const,
            rel: "noopener noreferrer",
          },
        ]
      : []),
  ]

  return (
    <ItemCard
      media={media}
      title={challenge.name}
      description={challenge.description}
      links={links}
    />
  )
}
