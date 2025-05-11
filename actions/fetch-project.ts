"use server"

import { db } from "@/db"
import { project } from "@/db/schemas"
import { eq } from "drizzle-orm"

export const fetchProject = async (id: string) => {
  try {
    const [data] = await db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1)

    return {
      ...data
    }
  }
  catch (error) {
    console.error("Error while fetching project: ", error)
    throw error
  }
}

export const fetchProjects = async () => {
  try {
    const data = await db.select().from(project)

    return data
  }
  catch (error) {
    console.error("Error while fetching projects: ", error)
    throw error
  }
}
