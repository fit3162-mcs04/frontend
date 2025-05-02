import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex max-w-2xl flex-col items-center gap-8 text-center">
        {/* logo */}
        <Image
          src="/images/logo.png"
          alt="MCS04 Logo"
          width={300}
          height={300}
          className="rounded-md -mt-40"
          priority
        />
        <h1 className="font-bold text-3xl">Genetic Stroke Risk Prediction</h1>
        <p className="text-gray-700 text-md dark:text-gray-300">
          A genetic-based stroke risk analyzer using AI and your genome data.
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/sign-in"
            className="rounded-full border border-blue-600 px-6 py-2 text-blue-600 text-sm hover:bg-blue-50 sm:text-base"
          >
            User Login
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-gray-400 px-6 py-2 text-gray-700 text-sm hover:bg-gray-100 sm:text-base"
          >
            About Us
          </Link>
        </div>
      </main>
      <footer className="row-start-3 text-gray-500 text-sm">
        © {new Date().getFullYear()} Genetic Risk Analyzer. All rights reserved.
      </footer>
    </div>
  )
}
