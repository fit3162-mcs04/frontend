"use server"

import { db } from "@/db"
import { project } from "@/db/schemas"
import { actionClient } from "@/lib/action"
import { z } from "zod"
import { fetchSession } from "./fetch-session"

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

export const createProject = actionClient.schema(schema).action(async ({ parsedInput: { title, description } }) => {
  try {
    const { session } = await fetchSession()

    if (!session) {
      throw new Error("Not Authenticated")
    }

    const userId = session.userId
    const [data] = await db
      .insert(project)
      .values({
        title,
        description,
        userId,
      })
      .returning({
        id: project.id,
      })

    return {
      ...data,
    }
  } catch (error) {
    console.error("Error while creating project: ", error)
    throw error
  }
})
