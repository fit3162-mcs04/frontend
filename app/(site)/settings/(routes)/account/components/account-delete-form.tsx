"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { deleteAccount } from "@/actions/delete-account"
import { AlertModal } from "@/components/alert-modal"
import { Button } from "@/components/ui/button"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

export const AccountDeleteForm = () => {
  const [open, setOpen] = useState(false)
  const { executeAsync: remove, isPending: isDeleting } = useAction(deleteAccount)
  const router = useRouter()

  const onConfirm = async () => {
    try {
      toast.promise(remove(), {
        loading: "Deleting account...",
        success: "Account deleted successfully!",
        error: "Failed to delete account. Please try again later.",
      })

      router.refresh()
    } catch (error) {
      console.error("Error while deleting account: ", error)
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        title="Confirm Account Delete"
        description="This action cannot be undone. All your data will be permanently removed."
        text="DELETE"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isDeleting}
      />

      <h3 className="mt-16 font-medium text-lg">Delete account</h3>
      <p className="text-muted-foreground text-sm">
        Note that this will result in deleting all your history on this platform.
      </p>

      <div className="mt-10">
        <Button variant="destructive" size="lg" onClick={() => setOpen(true)} disabled={isDeleting}>
          Delete Account
        </Button>
      </div>
    </>
  )
}
