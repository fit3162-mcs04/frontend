"use client"

import { fetchSession } from "@/actions/fetch-session"
import { signOut } from "@/actions/sign-out"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getInitials } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { ChevronRightIcon, LogOutIcon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const UserNav = () => {
  const [open, setOpen] = useState(false)
  const { executeAsync: logOut, isPending: isLoggingOut } = useAction(signOut)
  const { data, isPending: isSessionPending } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
  })
  const router = useRouter()

  const onLogout = async () => {
    try {
      toast.promise(logOut, {
        loading: "Signing out...",
        success: "Signed out successfully",
        error: "Failed to sign out",
      })

      router.refresh()
    } catch (error) {
      console.error("Error while signing out: ", error)
    } finally {
      setOpen(false)
    }
  }

  if (!data || !data.user || isSessionPending) {
    return null
  }

  const initials = getInitials(data.user.name)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={data.user.image || ""} alt="profile image" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{data.user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">{data.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/settings">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              <span>Settings</span>
              <ChevronRightIcon className="ml-auto h-4 w-4 text-muted-foreground duration-200 hover:text-primary" />
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2" onClick={onLogout} disabled={isLoggingOut}>
          <LogOutIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
