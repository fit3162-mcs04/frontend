"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      if (authClient?.signOut) {
        await authClient.signOut()
      }

      localStorage.removeItem("users")
      toast.success("Successfully logged out")
      router.push("/")
    } catch (error: any) {
      toast.error(`Failed to log out: ${error?.message ?? "Unknown error"}`)
      console.error("Logout error:", error)
    }
  }

  return (
    <button type="button" onClick={handleLogout} className="text-muted-foreground text-sm transition hover:underline">
      Log out
    </button>
  )
}
