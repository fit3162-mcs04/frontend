"use client"

import { LogoutButton } from "@/components/logout-button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [username, setUsername] = useState<string>("")

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
    if (!file) {
      return
    }

    // Pretend to upload and receive predictions (which can be replaced with API calls in the future)
    setTimeout(async () => {
      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error("Prediction failed:", error)
      }
      setResult("Your predicted stroke risk is: LOW.")
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem("users")
    router.push("/sign-in")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 text-gray-800 dark:bg-black dark:text-white">
      <h1 className="mb-2 font-bold text-2xl">Welcome, {username}!</h1>

      <LogoutButton />


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

        <div className="w-full mt-8">
          <h2 className="mb-4 text-lg font-medium">Choose a model</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => router.push("/upload/models/random-forest")}
              className="rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
            >
              Random Forest
            </button>
            <button
              type="button"
              onClick={() => router.push("/upload/models/svm")}
              className="rounded bg-teal-600 px-6 py-3 text-white hover:bg-teal-700"
            >
              Support Vector Machine
            </button>
            <button
              type="button"
              onClick={() => router.push("/upload/models/knn")}
              className="rounded bg-orange-600 px-6 py-3 text-white hover:bg-orange-700"
            >
              K-Nearest Neighbour
            </button>
            <button
              type="button"
              onClick={() => router.push("/upload/models/ann")}
              className="rounded bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
            >
              Artificial Neural Network
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
