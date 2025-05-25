import { fetchProject } from "@/actions/fetch-project"
import { fetchResult } from "@/actions/fetch-result"
import { fetchSession } from "@/actions/fetch-session"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ImageForm } from "./components/image-form"

interface ProjectEditPageProps {
  params: Promise<{ projectId: string }>
}

export async function generateMetadata({ params }: ProjectEditPageProps): Promise<Metadata> {
  const { projectId } = await params
  const { title } = await fetchProject(projectId)

  return {
    title: `${title} | Projects | FIT3162 | MCS04`,
    description: "",
  }
}

export default async function ProjectEditPage({ params }: ProjectEditPageProps) {
  const { projectId } = await params

  const { session } = await fetchSession()
  if (!session) {
    redirect("/sign-in")
  }

  const { title } = await fetchProject(projectId)

  // Redirect if already data exists
  const items = await fetchResult(projectId)
  if (items.length > 0) {
    redirect(`/analyze/projects/${projectId}/result`)
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between space-y-2">
        <Breadcrumb
          items={[
            { label: "Dashboard"},
            { label: "Analyze", href: "/analyze" },
            { label: `${title}` },
          ]}
        />
      </div>

      <div className="space-y-6 py-3">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl">Upload Your Data</h1>
          <p className="text-muted-foreground">Get started by uploading your dataset for analysis</p>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Analyze</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageForm projectId={projectId} />
          </CardContent>
        </Card>

        <div className="mx-auto max-w-2xl space-y-2 text-muted-foreground text-sm">
          <h3 className="font-medium text-foreground">Supported formats:</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>CSV (Comma-separated values)</li>
            <li>Excel (.xlsx, .xls)</li>
          </ul>
          <p className="pt-2">Your data will be processed securely and privately.</p>
        </div>
      </div>
    </div>
  )
}
