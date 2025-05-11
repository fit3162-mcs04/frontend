"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ModelPage() {
  const params = useParams()
  const router = useRouter()
  const model = params?.model as string
  const [result, setResult] = useState("")

  useEffect(() => {
    // 模拟预测结果
    setTimeout(() => {
      if (model === "knn") {
        setResult("Predicted stroke risk using K-Nearest Neighbour: HIGH")
      } else if (model === "svm") {
        setResult("Predicted stroke risk using Support Vector Machine: MEDIUM")
      } else if (model === "random-forest") {
        setResult("Predicted stroke risk using Random Forest: LOW")
      } else if (model === "ann") {
        setResult("Predicted stroke risk using Artificial Neural Network: MEDIUM")
      } else {
        setResult("Unknown model selected.")
      }
    }, 500)
  }, [model])

  const imageSrc = {
    knn: "/images/top_features_knn.png",
    svm: "/images/top_features_svm.png",
    "random-forest": "/images/top_features_rf.png",
    ann: "/images/top_features_ann.png",
  }[model]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-gray-800 dark:bg-black dark:text-white">
      <h1 className="mb-4 font-bold text-2xl">{model?.toUpperCase()} Result</h1>
      <p className="mb-6 font-medium text-red-600">{result}</p>

      {imageSrc ? (
        <Image src={imageSrc} alt={`Top Features - ${model}`} width={800} height={400} className="rounded shadow" />
      ) : (
        <p className="text-gray-400">No image available for this model.</p>
      )}

      <button
        type="button"
        onClick={() => router.back()}
        className="mt-8 text-gray-600 text-sm underline hover:text-gray-800"
      >
        ← Go Back
      </button>
    </main>
  )
}
