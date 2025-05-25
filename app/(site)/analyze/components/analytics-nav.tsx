"use client"

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ProjectCreateModal } from "./project-create-modal"

export const AnalyticsNav = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ProjectCreateModal open={open} onClose={() => setOpen(false)} />
      <div className="flex items-center justify-between space-y-2">
        <Breadcrumb
          items={[
            { label: "Dashboard" },
            { label: "Analyze", href: "/analyze" },
          ]}
        />
        <Button size="sm" onClick={() => setOpen(true)}>
          Create
        </Button>
      </div>
    </>
  )
}
