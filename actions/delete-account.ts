"use server"

import { actionClient } from "@/lib/action"
import { headers } from "next/headers"
import { fetchSession } from "./fetch-session"
import { db } from "@/db"
import { user } from "@/db/schemas"
import { eq } from "drizzle-orm"

export const deleteAccount = actionClient.action(async () => {
  try {
    const { session } = await fetchSession()

    if (!session) {
      throw new Error("Not Authenticated")
    }

    const userId = session.userId

    await db.delete(user).where(eq(user.id, userId))

  } catch (error) {
    console.error("Error while deleting account: ", error)
    throw error
  }
})