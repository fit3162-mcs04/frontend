"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { fetchSession } from "@/actions/fetch-session"
import { updateUser } from "@/actions/update-user"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().max(100),
})

export const ProfileForm = () => {
  const router = useRouter()
  const { executeAsync: update, isPending: isUpdating } = useAction(updateUser)
  const { data, isPending: isSessionPending } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
  })

  if (!data || isSessionPending) {
    return
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.user?.name ?? "",
    },
  })

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      toast.promise(
        update({
          ...e,
        }),
        {
          loading: "Updating profile...",
          success: "Profile updated successfully",
          error: "Failed to update profile",
        },
      )

      router.refresh()
    } catch (error) {
      console.error("Error while updating profile: ", error)
    }
  }

  const isValid = form.formState.isValid

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3"
        >
          {/* User name field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isUpdating} type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full mt-10">
            <Button type="submit" size="lg" disabled={isUpdating || !isValid}>
              Update profile
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
