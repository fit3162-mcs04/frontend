"use server"

import { db } from "@/db"
import { project } from "@/db/schemas"
import { and, eq } from "drizzle-orm"
import { fetchSession } from "./fetch-session"

export const fetchProject = async (id: string) => {
  try {
    const { session } = await fetchSession()

    if (!session) {
      throw new Error("Not Authenticated")
    }
    const userId = session.userId

    const [data] = await db
      .select()
      .from(project)
      .where(and(eq(project.id, id), eq(project.userId, userId)))
      .limit(1)

    return {
      ...data,
    }
  } catch (error) {
    console.error("Error while fetching project: ", error)
    throw error
  }
}

export const fetchProjects = async () => {
  try {
    const { session } = await fetchSession()

    if (!session) {
      throw new Error("Not Authenticated")
    }
    const userId = session.userId
    const data = await db.select().from(project).where(eq(project.userId, userId))

    return data
  } catch (error) {
    console.error("Error while fetching projects: ", error)
    throw error
  }
}
