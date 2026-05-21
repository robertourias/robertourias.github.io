"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, Button } from "@ui"
import type { Challenge } from "@/lib/github"

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative bg-muted">
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
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

      <CardContent className="flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-foreground text-sm leading-snug">
          {challenge.name}
        </h2>

        {challenge.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {challenge.description}
          </p>
        )}

        <div className="flex gap-2 flex-wrap mt-auto pt-1">
          <Button variant="outline" size="sm" asChild>
            <a
              href={challenge.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver repositório
            </a>
          </Button>

          {challenge.projectUrl && (
            <Button variant="default" size="sm" asChild>
              <a
                href={challenge.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver projeto
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
