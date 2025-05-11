import { AnalyticsNav } from "./components/analytics-nav";
import { ProjectList } from "./components/project-list";

export default async function DashboardPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
      <AnalyticsNav />
      <ProjectList />
    </div>
  );
}
