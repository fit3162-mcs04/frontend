"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string>("")
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
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Prediction failed:", error);
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
      <button type="button" onClick={handleLogout} className="mb-6 text-red-600 text-sm underline hover:text-red-800">
        Logout
      </button>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="mb-6 text-blue-600 text-sm underline hover:text-blue-800"
      >
        Back to Home
      </button>

      <h2 className="mb-6 text-lg">Upload your CSV file for stroke risk prediction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-gray-600 text-sm file:mr-4 file:rounded file:border file:border-gray-300 file:bg-white file:px-4 file:py-2 file:text-sm hover:file:bg-gray-100"
        />
        <button type="submit" className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
          Predict Risk
        </button>
      </form>
      {result && <p className="mt-6 font-semibold text-green-600 text-lg">{result}</p>}
    </main>
  )
}
