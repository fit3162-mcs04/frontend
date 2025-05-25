"use server"

import { db } from "@/db"
import { data, results } from "@/db/schemas"
import { actionClient } from "@/lib/action"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { fetchSession } from "./fetch-session"

const schema = z.object({
  projectId: z.string(),
  dataId: z.string(),
})

export const deleteResult = actionClient.schema(schema).action(async ({ parsedInput: { dataId, projectId } }) => {
  try {
    const { session } = await fetchSession()

    if (!session) {
      throw new Error("Not Authenticated")
    }

    await db.transaction(async (tx) => {
      await tx.delete(results).where(eq(results.projectId, projectId))
      await tx.delete(data).where(eq(data.projectId, projectId))
    })
  } catch (error) {
    console.error("Error while deleting result: ", error)
    throw error
  }
})
