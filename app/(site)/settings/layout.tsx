import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SettingsNavbar } from "./components/settings-navbar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Dashboard" },
          { label: "Settings", href: "/settings" },
        ]}
      />
      <div className="py-3">
        <Heading title="Settings" description="Manage your account settings." />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:gap-10 lg:space-x-12 lg:space-y-0">
        <SettingsNavbar />
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}
