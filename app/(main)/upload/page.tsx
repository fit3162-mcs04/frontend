"use client"

import { LogoutButton } from "@/components/logout-button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [username, setUsername] = useState<string>("")
  const [result, setResult] = useState<string>("")

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const lastUser = users.length > 0 ? users[users.length - 1] : null
    if (lastUser) {
      setUsername(lastUser.username)
    } else {
      router.push("/sign-in")
    }
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      console.log(data)
      setResult(`Your predicted stroke risk is: ${data.result || "LOW"}.`)
    } catch (error) {
      console.error("Prediction failed:", error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 text-gray-800 dark:bg-black dark:text-white">
      <div className="flex flex-col items-center gap-6 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold">Welcome, {username}!</h1>

        <LogoutButton />

        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-blue-600 text-sm underline hover:text-blue-800"
        >
          Back to Home
        </button>

        <div className="w-full">
          <h2 className="mb-2 text-lg font-medium">Upload your CSV file</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-gray-600 text-sm file:mr-4 file:rounded file:border file:border-gray-300 file:bg-white file:px-4 file:py-2 file:text-sm hover:file:bg-gray-100"
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full mt-4">
          <button
            type="submit"
            className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >
            Submit for Prediction
          </button>
        </form>

        {result && <p className="mt-4 text-md font-medium text-green-700">{result}</p>}

        <div className="w-full mt-8">
          <h2 className="mb-4 text-lg font-medium">Choose a model</h2>
          <select
            onChange={(e) => {
              const selected = e.target.value
              if (selected) {
                router.push(`/upload/models/${selected}`) // ✅ 正确跳转路径
              }
            }}
            defaultValue=""
            className="w-full p-3 rounded border border-gray-300 text-gray-800 dark:bg-gray-900 dark:text-white"
          >
            <option value="" disabled>Select a model</option>
            <option value="random-forest">Random Forest</option>
            <option value="svm">Support Vector Machine</option>
            <option value="knn">K-Nearest Neighbour</option>
            <option value="ann">Artificial Neural Network</option>
          </select>
        </div>
      </div>
    </main>
  )
}
