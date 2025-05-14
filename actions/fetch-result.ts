"use server"

import { db } from "@/db"
import { data, results } from "@/db/schemas"
import { and, eq } from "drizzle-orm"
import { fetchSession } from "./fetch-session"

export const fetchResult = async (projectId: string) => {
  try {
    const { session } = await fetchSession()
    if (!session) {
      throw new Error("Not Authenticated")
    }

    const [item] = await db
      .select({
        projectId: results.projectId,
        resultId: results.id,
        dataId: results.dataId,
        dataName: data.name,
        modelName: results.modelName,
        result: results.result,
      })
      .from(results)
      .where(eq(results.projectId, projectId))
      .leftJoin(data, and(eq(data.id, results.dataId), eq(data.projectId, projectId)))
      .limit(1)

    return {
      ...item,
    }
  } catch (error) {
    console.error("Error while fetching data for project: ", error)
    throw error
  }
}
