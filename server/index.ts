import { auth } from "@/lib/auth"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { csrf } from "hono/csrf"
import { logger } from "hono/logger"
import { errorHandler, notFound } from "./middlewares"

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}>().basePath("api")

app.use(cors())
app.use(csrf())
app.use(logger())

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set("user", null)
    c.set("session", null)
    return next()
  }

  c.set("user", session.user)
  c.set("session", session.session)
  return next()
})

app.onError(errorHandler)
app.notFound(notFound)

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw)
})

export { app }
export type AppType = typeof app
