"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function EditButton({ username }: { username: string }) {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push(`/portfolios/${username}/edit`)}
      className="bg-[#39c5bb] hover:bg-[#39c5bb]/80"
    >
      Edit Portfolio
    </Button>
  )
} 