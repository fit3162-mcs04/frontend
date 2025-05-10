"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"

interface AlertModalProps {
  title: string
  description: string
  text: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
  text,
  open,
  onClose,
  onConfirm,
  loading,
}) => {
  // Boolean state to track if the component has mounted to the DOM
  const [isMounted, setIsMounted] = useState(false)

  // String state storing the text input to confirm an action
  const [confirmText, setConfirmText] = useState("")

  // Boolean state handling if the user can proceed to an action
  const isConfirmDisabled = confirmText !== text || loading

  // Hooks to set the isMounted state to true after initial render to avoid hydration error
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If the component is not yet mounted, don't render anything
  if (!isMounted) {
    return null
  }

  // Handler to check if the input matches the required phrase
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmText(event.target.value)
  }

  return (
    <Modal title={title} description={description} open={open} onClose={onClose}>
      <p className="mb-1 text-muted-foreground text-xs">To confirm, type {text} in the box below</p>
      <Input
        type="text"
        placeholder={text}
        value={confirmText}
        onChange={handleInputChange}
        disabled={loading}
        className="font-medium italic placeholder:text-muted-foreground"
      />
      <div className="flex w-full items-center justify-end space-x-2 pt-3">
        <Button size="sm" disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" disabled={isConfirmDisabled} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}
