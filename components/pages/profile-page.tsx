"use client"

import type { Session } from "next-auth"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Mail } from "lucide-react"
import { signOut } from "next-auth/react"

interface ProfilePageProps {
  session: Session
}

export default function ProfilePage({ session }: ProfilePageProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 h-32 rounded-t-xl mb-0" />

        <div className="bg-card border border-border rounded-b-xl p-6 border-t-0">
          <div className="flex items-start justify-between mb-6 -mt-16 relative z-10">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-2xl text-card border-4 border-card shadow-lg shadow-primary/30">
                {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase()}
              </div>
              <div className="pb-2">
                <h1 className="text-2xl font-bold text-foreground">{session.user.name || "User"}</h1>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {session.user.email}
                </p>
              </div>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              variant="destructive"
              className="font-semibold"
            >
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Groups</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Topics</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Account Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="text-foreground font-mono text-xs">{session.user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground">{session.user.email}</span>
                </div>
                {session.user.image && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile Image:</span>
                    <span className="text-foreground">Connected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground text-center">
                Profile editing and additional features coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
