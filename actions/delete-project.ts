"use server"

import { db } from "@/db"
import { project } from "@/db/schemas"
import { actionClient } from "@/lib/action"
import { eq } from "drizzle-orm"
import { z } from "zod"

const schema = z.object({
  id: z.string(),
})

export const deleteProject = actionClient.schema(schema).action(async ({ parsedInput: { id } }) => {
  try {
    await db.delete(project).where(eq(project.id, id))
  } catch (error) {
    console.error("Error while deleting project: ", error)
    throw error
  }
})
