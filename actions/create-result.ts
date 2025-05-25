"use server"

import { db } from "@/db"
import { data, results } from "@/db/schemas"
import { actionClient } from "@/lib/action"
import { z } from "zod"
import { fetchSession } from "./fetch-session"

const schema = z.object({
  name: z.string(),
  modelName: z.string(),
  projectId: z.string(),
  result: z.string(),
  confidence: z.number()
})

export const createResult = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { name, modelName, projectId, result, confidence } }) => {
    try {
      const { session } = await fetchSession()
      if (!session) {
        throw new Error("Not Authenticated")
      }

      const userId = session.userId

      await db.transaction(async (tx) => {
        const [item] = await tx
          .insert(data)
          .values({
            name,
            projectId,
            userId,
          })
          .returning({
            dataId: data.id,
          })

        await tx.insert(results).values({
          confidence,
          result,
          modelName,
          projectId,
          dataId: item.dataId,
        })
      })
    } catch (error) {
      console.error("Error while creating result: ", error)
      throw error
    }
  })
