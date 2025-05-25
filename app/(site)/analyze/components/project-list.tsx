"use client"

import { fetchProjects } from "@/actions/fetch-project"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useQuery } from "@tanstack/react-query"
import { InfoIcon, Loader2 } from "lucide-react"
import { ProjectItem } from "./project-item"

export const ProjectList = () => {
  const { data, isPending: isProjectPending } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  })

  if (isProjectPending) {
    return (
      <div className="flex w-full items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const hasProjects = data && data.length > 0

  return (
    <div className="container mx-auto p-4">
      {!hasProjects ? (
        <Alert variant="yellow" className="max-w-lg">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>No projects found</AlertTitle>
          <AlertDescription>There are no projects to display. Create one to get started.</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl">Project List</h1>
            <p className="text-muted-foreground">Access your project history</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((project) => (
              <ProjectItem key={project.id} id={project.id} title={project.title} description={project.description} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
