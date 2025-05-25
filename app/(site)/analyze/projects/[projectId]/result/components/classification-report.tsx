import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityIcon } from "lucide-react"

interface ModelCardProps {
  model: string
}
export const ClassificationReportCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-bold text-2xl">Classifcation Report</CardTitle>
        <ActivityIcon />
      </CardHeader>
      <CardContent>
        <img
            src= {`/images/classification_report_${model}.png`}
            alt={`classification_report_${model}`}
        />
      </CardContent>
    </Card>
  )
}
