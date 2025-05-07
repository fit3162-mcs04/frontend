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
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-gray-800 dark:bg-black dark:text-white">
      <h1 className="mb-4 font-bold text-2xl">Random Forest Result</h1>
      <p className="mb-6 font-medium text-green-600">{result}</p>
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
