import type { Metadata } from "next"
import "./styles/globals.css"
import { geistMono, geistSans } from "@/lib/fonts"
import { QueryProvider } from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            {children}
            <Toaster richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
