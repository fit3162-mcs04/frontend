"use client"

import { useMemo } from "react"

export const SiteFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="container mt-8 flex flex-col items-center justify-between border-t pt-6 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Monash University FIT3162 MCS04. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
