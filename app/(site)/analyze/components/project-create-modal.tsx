"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { createProject } from "@/actions/create-project"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { Textarea } from "@/components/ui/textarea"
import { useQueryClient } from "@tanstack/react-query"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .max(100, {
      message: "Title must be no more than 100 characters long",
    }),
  description: z
    .string()
    .max(1000, {
      message: "Description must be no more than 1000 characters long",
    })
    .transform((str) => str?.trim() || "")
    .optional(),
})

interface ProjectCreateModalProps {
  open: boolean
  onClose: () => void
}

export const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({ open, onClose }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { executeAsync: create, isPending: isCreating } = useAction(createProject)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      toast.promise(create({ ...e }), {
        loading: "Creating a project...",
        success: "Project created successfully",
        error: "Failed to create project",
      })

      queryClient.invalidateQueries({ queryKey: ["projects"] })
      router.refresh()
    } catch (error) {
      console.error("Error while creating project: ", error)
    } finally {
      onClose()
    }
  }

  const { isValid } = form.formState

  return (
    <Modal
      title="Create a project"
      description="Enter a name and description for your project"
      open={open}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Article title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isCreating}
                      placeholder="Enter a title..."
                      className="pr-16"
                      maxLength={100}
                    />
                    <span className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground text-xs">
                      {field.value?.length || 0}/100
                    </span>
                  </div>
                </FormControl>
                <FormDescription>Give your project a clear, descriptive title (required)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Article description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      {...field}
                      disabled={isCreating}
                      placeholder="Enter a description..."
                      className="min-h-[120px] resize-y pr-16"
                      maxLength={1000}
                    />
                    <span className="absolute top-3 right-3 text-muted-foreground text-xs">
                      {field.value?.length || 0}/1000
                    </span>
                  </div>
                </FormControl>
                <FormDescription>Describe your project in detail (optional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end space-x-2 pt-6">
            <Button size="sm" variant="outline" type="button" disabled={isCreating} onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={!isValid || isCreating}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
