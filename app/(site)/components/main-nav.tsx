"use client"

import { headerItems } from "@/config/site"
import { cn } from "@/lib/utils"
import { GalleryVerticalEndIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const MainNav = () => {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="flex items-center gap-2 px-3 font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEndIcon className="size-4" />
        </div>
        MCS04
      </Link>
      <nav className="flex items-center gap-4 px-2 text-sm xl:gap-6">
        {headerItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-x-5 rounded-lg p-2 font-medium text-md transition-colors hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-700",
              pathname === item.href ? "text-black dark:text-white" : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
