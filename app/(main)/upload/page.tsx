"use client"

import { LogoutButton } from "@/components/logout-button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UploadPage() {
  const router = useRouter()
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 text-gray-800 dark:bg-black dark:text-white">
      <h1 className="mb-2 font-bold text-2xl">Welcome, {username}!</h1>

      <LogoutButton />

      <button
        type="button"
        onClick={() => router.push("/")}
        className="mb-6 text-blue-600 text-sm underline hover:text-blue-800"
      >
        Back to Home
      </button>

      <h2 className="mb-6 text-lg">Choose a model to see your stroke prediction result</h2>

      {/*Model selection button area*/}
      <div className="mt-10 grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
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
    </main>
  )
}
