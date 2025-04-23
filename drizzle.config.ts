import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schemas/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
})
