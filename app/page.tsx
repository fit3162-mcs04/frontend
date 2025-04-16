import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-2xl">
        <Image
          className="dark:invert"
          src="/dna-logo.svg"
          alt="Genetic Testing Logo"
          width={120}
          height={120}
          priority
        />
        <h1 className="text-3xl font-bold">Genetic Stroke Risk Prediction</h1>
        <p className="text-md text-gray-700 dark:text-gray-300">
          A genetic-based stroke risk analyzer using AI and your genome data.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/login" className="rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 text-sm sm:text-base">
            User Login
          </Link>
          <Link href="/about" className="rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-2 text-sm sm:text-base">
            About Us
          </Link>
        </div>
      </main>
      <footer className="row-start-3 text-sm text-gray-500">
        © {new Date().getFullYear()} Genetic Risk Analyzer. All rights reserved.
      </footer>
    </div>
  );
}
