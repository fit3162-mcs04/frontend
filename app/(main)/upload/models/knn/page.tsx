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
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-gray-800 dark:bg-black dark:text-white">
      <h1 className="mb-4 font-bold text-2xl">K-Nearest Neighbour Result</h1>
      <p className="mb-6 font-medium text-red-600">{result}</p>
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
