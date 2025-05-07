"use client"

import { CategoryScale, Chart, LineElement, LinearScale, PointElement } from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

export default function RandomForestPage() {
  const [result, setResult] = useState("")

  useEffect(() => {
    // Simulate to obtain the prediction results
    setTimeout(() => {
      setResult("Predicted stroke risk: LOW")
    }, 500)
  }, [])

  const data = {
    labels: ["Feature A", "Feature B", "Feature C", "Feature D"],
    datasets: [
      {
        label: "Prediction Score",
        data: [0.2, 0.4, 0.1, 0.3],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <h1 className="mb-4 font-bold text-2xl">Random Forest Result</h1>
      <p className="mb-6 font-medium text-green-600">{result}</p>
      <div className="w-full max-w-xl">
        <Line data={data} />
      </div>
    </main>
  )
}
