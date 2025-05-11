"use client"

import { deleteProject } from "@/actions/delete-project"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQueryClient } from "@tanstack/react-query"
import { ArrowRight, MoreVertical } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ProjectItemProps {
  id: string
  title: string
  description: string | null
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ id, title, description }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { executeAsync: remove, isPending: isDeleting } = useAction(deleteProject)

  const handleEdit = () => {
    router.push(`/analyze/projects/${id}`)
  }

  const handleDelete = async () => {
    try {
      toast.promise(remove({ id }), {
        loading: "Deleting project...",
        success: "Project deleted successfully",
        error: "Failed to delete project",
      })

      queryClient.invalidateQueries({ queryKey: ["projects"] })
      router.refresh()
    } catch (error) {
      console.log("Error while deleting project: ", error)
    }
  }
  return (
    <Card className="overflow-hidden border shadow-sm transition-shadow hover:shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="font-bold text-lg">{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit project</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-red-600">
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {description && (
          <CardDescription className="mb-4 line-clamp-2 text-gray-500 text-sm">{description}</CardDescription>
        )}
        <div className="mt-2 flex justify-end">
          <Link href={`/analyze/projects/${id}`}>
            <Button variant="outline" size="sm" className="text-xs">
              View Project <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
