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

    const items = await db
      .select({
        projectId: results.projectId,
        resultId: results.id,
        dataId: results.dataId,
        dataName: data.name,
        modelName: results.modelName,
        result: results.result,
        confidence: results.confidence
      })
      .from(results)
      .where(eq(results.projectId, projectId))
      .leftJoin(data, and(eq(data.id, results.dataId), eq(data.projectId, projectId)));

    console.log("Fetched items:", items);
    return items
  } catch (error) {
    console.error("Error while fetching data for project: ", error)
    throw error
  }
}
