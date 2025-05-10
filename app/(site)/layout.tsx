import { fetchSession } from "@/actions/fetch-session"
import { SiteFooter } from "./components/site-footer"
import { SiteHeader } from "./components/site-header"

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { session } = await fetchSession()

  const signedIn = session !== undefined

  return (
    <div className="border-border/40 dark:border-border">
      <div className="mx-auto w-full border-border/40 min-[1800px]:max-w-[1536px] min-[1800px]:border-x dark:border-border">
        <SiteHeader signedIn={signedIn} />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}
