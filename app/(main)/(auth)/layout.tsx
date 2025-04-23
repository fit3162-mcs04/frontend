import { authClient } from "@/lib/auth-client"
import { GalleryVerticalEnd } from "lucide-react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await headers()
  const { getSession } = authClient
  const { data } = await getSession({
    fetchOptions: {
      headers: header,
    },
  })

  if (data) {
    redirect("/dashboard")
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            MCS04
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">{children}</div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-9xl text-gray-200 opacity-50">FIT3162</span>
        </div>
      </div>
    </div>
  )
}
