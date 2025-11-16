"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import MainApp from "@/components/main-app"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">TALKSY</h1>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <MainApp session={session} />
}
