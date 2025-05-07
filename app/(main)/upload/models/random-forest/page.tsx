"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function RandomForestPage() {
  const [result, setResult] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setResult("Predicted stroke risk using Random Forest: LOW")
    }, 500)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white dark:bg-black text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Random Forest Result</h1>
      <p className="mb-6 text-green-600 font-medium">{result}</p>
      <Image
        src="/images/top_features_rf.png"
        alt="Top Features - Random Forest"
        width={800}
        height={400}
        className="rounded shadow"
      />
    </main>
  )
}
