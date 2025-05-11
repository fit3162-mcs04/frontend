"use server"

import { db } from "@/db"
import { project } from "@/db/schemas"
import { actionClient } from "@/lib/action"
import { z } from "zod"

const schema = z.object({
  title: z.string(),
  description: z.string().optional()
})

export const createProject = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { title, description } }) => {
    try {
      const [data] = await db
        .insert(project)
        .values({
          title,
          description
        })
        .returning({
          id: project.id
        })

      return {
        ...data
      }
    }
    catch (error) {
      console.error("Error while creating project: ", error)
      throw error
    }
  })
