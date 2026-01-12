"use client"

import { ProfilePage } from "@/components/pages/profile-page"
import { useRole } from "@/lib/role-context"

export default function Page() {
  const { user } = useRole()
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }
  
  return <ProfilePage userRole={user.role} currentUserId={user.id} viewMode={false} />
}
