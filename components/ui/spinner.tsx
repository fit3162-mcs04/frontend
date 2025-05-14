"use client"

export const Spinner = () => {
  return (
    <div className="flex justify-center" aria-label="loading...">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
