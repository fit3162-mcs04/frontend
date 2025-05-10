"use server"

import { actionClient } from "@/lib/action"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"
import { z } from "zod"

const schema = z.object({
  name: z.string(),
})

export const updateUser = actionClient.schema(schema).action(async ({ parsedInput: { name } }) => {
  try {
    const header = await headers()
    const { updateUser } = authClient

    const { data } = await updateUser({
      name,
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
    console.error("Error while updating profile: ", error)
    throw error
  }
})
