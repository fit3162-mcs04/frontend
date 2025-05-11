import { newId } from "@/lib/id";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const model = sqliteTable("models", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => newId("model")),
  name: text("name").notNull()
})

export const project = sqliteTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => newId("project")),
  title: text('title').notNull(),
  description: text('description'),
})

export const data = sqliteTable("data", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => newId("data")),
  projectId: text('project_id').notNull().references(() => project.id),
  name: text("name").notNull(),
})

export const results = sqliteTable("results", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => newId("result")),
  projectId: text('project_id').notNull().references(() => project.id),
  dataId: text('data_id').notNull().references(() => data.id),
  modelId: text('model_id').notNull().references(() => model.id),
  result: text("result")
})
