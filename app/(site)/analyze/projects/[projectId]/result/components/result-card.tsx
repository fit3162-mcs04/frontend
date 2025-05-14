import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityIcon } from "lucide-react"

interface ResultCardProps {
  result: string
}
export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">Prediction Results</CardTitle>
        <ActivityIcon />
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{result}</div>
        <p className="text-muted-foreground text-xs">FIT3162 | MCS04</p>
      </CardContent>
    </Card>
  )
}
