import { fetchSession } from "@/actions/fetch-session"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AccountDeleteForm } from "./components/account-delete-form"

export const metadata: Metadata = {
  title: "Account - Settings | MCS04 | FIT3162",
  description: "",
}

export default async function AccountSettingsPage() {
  const { session } = await fetchSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div>
      <h3 className="font-bold text-xl">Account</h3>
      <p className="text-muted-foreground text-sm">Update your account settings.</p>

      <AccountDeleteForm />
    </div>
  )
}
