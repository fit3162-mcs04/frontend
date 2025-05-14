import { fetchProject } from "@/actions/fetch-project"
import { fetchResult } from "@/actions/fetch-result"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getConfidence } from "@/lib/utils"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ConfidenceCard } from "./components/confidence-card"
import { ModelCard } from "./components/model-card"
import { ResultCard } from "./components/result-card"
import { TargetCard } from "./components/target-card"

interface ProjectResultPageProps {
  params: Promise<{ projectId: string }>
}

export async function generateMetadata({ params }: ProjectResultPageProps): Promise<Metadata> {
  const { projectId } = await params
  const { title } = await fetchProject(projectId)

  return {
    title: `Results | ${title} | Projects | FIT3162 | MCS04`,
    description: "Genetic stroke risk analysis results and recommendations",
  }
}

export default async function ProjectResultPage({ params }: ProjectResultPageProps) {
  const { projectId } = await params
  const { title } = await fetchProject(projectId)
  const { dataId, dataName, modelName, result, resultId } = await fetchResult(projectId)

  if (!resultId) {
    redirect(`/analyze/projects/${projectId}`)
  }

  const confidence = getConfidence()
  const recommendations = [
    "Regular blood pressure monitoring",
    "Anticoagulant therapy consideration",
    "Lifestyle modifications (diet, exercise)",
    "Regular follow-up with neurologist",
  ]

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between space-y-2">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Analyze", href: "/analyze" },
            { label: `${title}`, href: `/analyze/projects/${projectId}` },
            { label: "Result", href: `/analyze/projects/${projectId}/result` },
          ]}
        />
      </div>
      <div className="space-y-6 py-3">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl">Analysis Result</h1>
          <p className="text-muted-foreground">Analysis of genetic markers for stroke risk assessment</p>

          <div className="p-5">
            <TargetCard dataId={dataId} resultId={resultId} name={dataName || ""} />
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
            <ResultCard result={result} />
            <ConfidenceCard confidence={confidence} />
            <ModelCard model={modelName.toUpperCase()} />
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <h2 className="mb-3 font-semibold text-xl">Recommendations</h2>
            <ul className="space-y-2">
              {recommendations.map((recommendation) => (
                <li key={recommendation} className="flex items-start">
                  <span className="mr-2 flex-shrink-0 text-green-500 dark:text-green-400">•</span>
                  <span className="font-medium text-muted-foreground">{recommendation}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
              <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-200">Additional Notes</h3>
              <p className="text-blue-700 text-sm dark:text-blue-300">
                Based on the high confidence score of {confidence}, we strongly recommend consulting with a healthcare
                professional to discuss these findings and develop a personalized prevention plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
