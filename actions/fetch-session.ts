"use server"

import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"

export const fetchSession = async () => {
  try {
    const { getSession } = authClient
    const header = await headers()

    const { data } = await getSession({
      fetchOptions: {
        headers: {
          cookie: header.get("cookie") || "",
        },
      },
    })

    return {
      ...data,
    }
  } catch (error) {
    console.error("Error while fetching session: ", error)
    throw error
  }
}
