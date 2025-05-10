import { fetchSession } from "@/actions/fetch-session"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ProfileForm } from "./components/profile-form"

export const metadata: Metadata = {
  title: "Settings | MCS04 | FIT3162",
  description: "",
}

export default async function SettingsPage() {
  const { session } = await fetchSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <>
      <h3 className="font-bold text-xl">Profile</h3>
      <p className="text-muted-foreground text-sm">Update your profile settings.</p>

      <ProfileForm />
    </>
  )
}
