"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function KNNPage() {
  const [result, setResult] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setResult("Predicted stroke risk using K-Nearest Neighbour: HIGH")
    }, 500)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white dark:bg-black text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">K-Nearest Neighbour Result</h1>
      <p className="mb-6 text-red-600 font-medium">{result}</p>
      <Image
        src="/images/top_features_knn.png"
        alt="Top Features - KNN"
        width={800}
        height={400}
        className="rounded shadow"
      />
    </main>
  )
}
