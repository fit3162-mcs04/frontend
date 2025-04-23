import type { Metadata } from "next"
import { SignInForm } from "./components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In | FIT3162 | MCS04",
  description: "",
}

export default function SignInPage() {
  return (
    <div className="w-full max-w-xs">
      <SignInForm />
    </div>
  )
}
