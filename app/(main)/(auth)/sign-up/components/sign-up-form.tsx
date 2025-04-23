"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters.",
      })
      .max(100, {
        message: "Name must be at most 100 characters.",
      }),
    email: z.string().email({
      message: "Email must be a valid email address.",
    }),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = authClient

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await signUp.email({
        name: e.name,
        email: e.email,
        password: e.password,
        fetchOptions: {
          onSuccess() {
            toast.success("Successfully signed up")
            router.push("/dashboard")
          },
          onError(ctx) {
            toast.error(`Failed to sign up: ${ctx.error.message}"`)
          },
        },
      })
    } catch (error) {
      console.error("Error while signing up: ", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-2xl">Create an account</h1>
          <p className="text-balance text-muted-foreground text-sm">Enter your details below to create an account</p>
        </div>

        <div className="grid gap-6">
          {/* Name Input Field */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Input Field */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password Input Field */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Confirm Password Input Field */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
