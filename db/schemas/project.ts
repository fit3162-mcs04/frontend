import { newId } from "@/lib/id"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { user } from "./user"

export const project = sqliteTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => newId("project")),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull(),
  description: text("description"),
})

export const data = sqliteTable("data", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => newId("data")),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, {
      onDelete: "cascade",
    }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
})

export const results = sqliteTable("results", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => newId("result")),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, {
      onDelete: "cascade",
    }),
  dataId: text("data_id")
    .notNull()
    .references(() => data.id, { onDelete: "cascade" }),
  modelName: text("model").notNull(),
  result: text("result").notNull(),
})
