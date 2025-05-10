"use client"

import { cn } from "@/lib/utils"
import { CircleUserIcon, FingerprintIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const SettingsNavbar = () => {
  const pathname = usePathname()

  const NavItems: {
    href: string
    icon: React.ReactElement
    label: string
    active: boolean
  }[] = [
    {
      href: "/settings",
      icon: <CircleUserIcon className="size-4" />,
      label: "Profile",
      active: pathname === "/settings",
    },
    {
      href: "/settings/account",
      icon: <FingerprintIcon className="size-4" />,
      label: "Account",
      active: pathname === "/settings/account",
    },
  ]

  return (
    <aside className="w-full lg:w-1/5">
      <nav className="flex overflow-x-auto lg:flex-col lg:space-x-0 lg:space-y-1 lg:overflow-visible">
        {NavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-x-3 whitespace-nowrap rounded-lg p-3 font-medium text-md transition-colors",
              "duration-150 hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-700",
              item.active ? "bg-gray-100 font-semibold text-primary dark:bg-gray-800" : "text-muted-foreground",
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
