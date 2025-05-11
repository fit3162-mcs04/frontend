import { fetchSession } from "@/actions/fetch-session"
import { redirect } from "next/navigation"

export default async function AnalyticsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { session } = await fetchSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 p-2">
        {/* Dashboard Content */}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="font-bold text-3xl tracking-tight">Analyze the Gene Expression</h2>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
