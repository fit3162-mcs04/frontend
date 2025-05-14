"use client"

import { deleteResult } from "@/actions/delete-result"
import { AlertModal } from "@/components/alert-modal"
import { CsvIcon } from "@/components/icons/csv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2Icon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface TargetCardProps {
  resultId: string
  dataId: string
  name: string
}

export const TargetCard: React.FC<TargetCardProps> = ({ dataId, resultId, name }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { executeAsync: remove, isPending: isDeleting } = useAction(deleteResult, {
    onSuccess: () => {
      toast.success("data deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete data")
    },
  })

  const handleDelete = async () => {
    try {
      await remove({ dataId, resultId })

      router.refresh()
    } catch (error) {
      console.error("Failed to delete data:", error)
    }
  }

  return (
    <>
      <AlertModal
        title="Are you sure you want to delete the file?"
        description="The analysis result will be permently deleted."
        text="DELETE"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="font-medium text-muted-foreground text-sm">Target File</CardTitle>
            <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
              <Trash2Icon />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center">
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/50">
                <CsvIcon />
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="mx-auto max-w-[180px] truncate font-medium text-sm">{name}</p>
              <p className="text-muted-foreground text-xs">FIT3162 | MCS04</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
