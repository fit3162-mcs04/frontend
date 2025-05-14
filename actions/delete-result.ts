"use server"

import { db } from "@/db"
import { data, results } from "@/db/schemas"
import { actionClient } from "@/lib/action"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { fetchSession } from "./fetch-session"

const schema = z.object({
  resultId: z.string(),
  dataId: z.string(),
})

export const deleteResult = actionClient.schema(schema).action(async ({ parsedInput: { dataId, resultId } }) => {
  try {
    const { session } = await fetchSession()

    if (!session) {
      throw new Error("Not Authenticated")
    }

    await db.transaction(async (tx) => {
      await tx.delete(results).where(eq(results.id, resultId))
      await tx.delete(data).where(eq(data.id, dataId))
    })
  } catch (error) {
    console.error("Error while deleting result: ", error)
    throw error
  }
})
