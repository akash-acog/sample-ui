"use client"

import { SkillMatchingPage } from "@/components/pages/skill-matching-page"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return <SkillMatchingPage />
}
