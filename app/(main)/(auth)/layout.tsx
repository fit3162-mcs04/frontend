import { fetchSession } from "@/actions/fetch-session"
import { GalleryVerticalEndIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = await fetchSession()
  console.log(session)
  if (session) {
    redirect("/analyze")
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* LEFT SIDE - LOGO + FORM */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            MCS04
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">{children}</div>
      </div>

      {/* RIGHT SIDE - BACKGROUND IMAGE */}
      <div className="relative hidden lg:block">
        <img
          src="/images/background.png"
          alt="Genetic Lab Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
