import type { Metadata } from "next"
import "./styles/globals.css"
import { geistMono, geistSans } from "@/lib/fonts"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Genetic Stroke Risk Predictor",
  description: "Upload genetic CSV and get stroke risk prediction",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
