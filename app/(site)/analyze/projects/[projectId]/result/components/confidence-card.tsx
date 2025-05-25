import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityIcon, PercentIcon } from "lucide-react"

interface ConfidenceCardProps {
  confidence: number
}
export const ConfidenceCard: React.FC<ConfidenceCardProps> = ({ confidence }) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">Prediction Confidence</CardTitle>
        <PercentIcon />
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{confidence}</div>
        <p className="text-muted-foreground text-xs">FIT3162 | MCS04</p>
      </CardContent>
    </Card>
  )
}
