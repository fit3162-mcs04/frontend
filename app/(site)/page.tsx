import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home | FIT3162 | MCS04",
  description: "",
}

export default function HomePage() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex max-w-2xl flex-col items-center gap-8 text-center">
        {/* logo */}
        <Image
          className="rounded object-contain dark:invert"
          src="/logo.png"
          alt="Genetic Testing Logo"
          width={180}
          height={180}
        />

        <h1 className="font-bold text-3xl">Genetic Stroke Risk Prediction</h1>
        <p className="text-gray-700 text-md dark:text-gray-300">
          A genetic-based stroke risk analyzer using AI and your genome data.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/about"
            className="rounded-full border border-gray-400 px-6 py-2 text-gray-700 text-sm hover:bg-gray-100 sm:text-base"
          >
            About Us
          </Link>
        </div>
      </main>
    </div>
  )
}
