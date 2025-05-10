"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-switcher"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "./main-nav"

interface SiteHeaderProps {
  signedIn: boolean
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ signedIn }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-20 items-center px-4">
        <MainNav />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* <SearchBar /> */}</div>
          <nav className="flex items-center gap-2">
            {signedIn ? (
              <UserNav />
            ) : (
              <Button size="sm" variant="link">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
