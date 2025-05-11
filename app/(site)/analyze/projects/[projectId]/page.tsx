import { fetchProject } from "@/actions/fetch-project"
import { fetchSession } from "@/actions/fetch-session"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { ImageForm } from "./components/image-form"

interface ProjectEditPageProps {
  params: Promise<{ projectId: string }>
}

export default async function ProjectEditPage({ params }: ProjectEditPageProps) {
  const { projectId } = await params

  const { session } = await fetchSession()
  if (!session) {
    redirect("/sign-in")
  }

  const { title } = await fetchProject(projectId)

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between space-y-2">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Analyze", href: "/analyze" },
            { label: `${title}`, href: `/analyze/${projectId}` },
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
            <ImageForm />
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
