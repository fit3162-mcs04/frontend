"use server"

import { actionClient } from "@/lib/action"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"

export const signOut = actionClient.action(async () => {
  try {
    const { signOut } = authClient
    const header = await headers()

    const { data } = await signOut({
      fetchOptions: {
        headers: {
          cookie: header.get("cookie") || "",
        },
      },
    })

    return data
  } catch (error) {
    console.error("Error while signing out: ", error)
    throw error
  }
})
