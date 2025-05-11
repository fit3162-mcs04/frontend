import { fetchProject } from "@/actions/fetch-project";
import { fetchSession } from "@/actions/fetch-session";
import { redirect } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ImageForm } from "./components/image-form";

interface ProjectEditPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const { projectId } = await params;

  const { session } = await fetchSession();
  if (!session) {
    redirect("/sign-in");
  }

  const { title, description } = await fetchProject(projectId);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between space-y-2">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Analyze", href: "/analyze" },
            { label: `${title}`, href: `/analyze/${projectId}` },
          ]}
        />
      </div>

      <div className="py-3 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Upload Your Data</h1>
          <p className="text-muted-foreground">
            Get started by uploading your dataset for analysis
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Analyze</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageForm />
          </CardContent>
        </Card>

        <div className="max-w-2xl mx-auto space-y-2 text-sm text-muted-foreground">
          <h3 className="font-medium text-foreground">Supported formats:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>CSV (Comma-separated values)</li>
            <li>Excel (.xlsx, .xls)</li>
          </ul>
          <p className="pt-2">
            Your data will be processed securely and privately.
          </p>
        </div>
      </div>
    </div>
  );
}
