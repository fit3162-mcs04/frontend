import type { Metadata } from "next"
import { SignUpForm } from "./components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up | FIT3162 | MCS04",
  description: "",
}

export default function SignUpPage() {
  return (
    <div className="w-full max-w-xs">
      <SignUpForm />
    </div>
  )
}
