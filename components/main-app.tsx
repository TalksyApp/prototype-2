"use client"

import { useState } from "react"
import type { Session } from "next-auth"
import Navigation from "@/components/navigation"
import FeedPage from "@/components/pages/feed-page"
import ExplorePage from "@/components/pages/explore-page"
import GroupChatsPage from "@/components/pages/group-chats-page"
import ProfilePage from "@/components/pages/profile-page"

interface MainAppProps {
  session: Session
}

export default function MainApp({ session }: MainAppProps) {
  const [currentPage, setCurrentPage] = useState<"feed" | "explore" | "groups" | "profile">("feed")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedGroupChat, setSelectedGroupChat] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navigation session={session} currentPage={currentPage} onPageChange={setCurrentPage} />

      <main className="flex-1 overflow-hidden">
        {currentPage === "feed" && <FeedPage session={session} />}
        {currentPage === "explore" && (
          <ExplorePage session={session} selectedTopic={selectedTopic} onTopicSelect={setSelectedTopic} />
        )}
        {currentPage === "groups" && (
          <GroupChatsPage
            session={session}
            selectedGroupChat={selectedGroupChat}
            onGroupChatSelect={setSelectedGroupChat}
          />
        )}
        {currentPage === "profile" && <ProfilePage session={session} />}
      </main>
    </div>
  )
}
