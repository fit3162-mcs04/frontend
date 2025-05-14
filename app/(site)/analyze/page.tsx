import { AnalyticsNav } from "./components/analytics-nav"
import { ProjectList } from "./components/project-list"

export default async function DashboardPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      <AnalyticsNav />
      <ProjectList />
    </div>
  )
}
