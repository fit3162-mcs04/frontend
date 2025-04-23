import { db } from "@/db"
import { account, jwks, session, user, verification } from "@/db/schemas"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { bearer as bearerPlugin, jwt as jwtPlugin } from "better-auth/plugins"

export const auth = betterAuth({
  appName: "FIT3162-MCS04",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      session,
      account,
      verification,
      jwks,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
  },
  advanced: {
    cookiePrefix: "mcs04",
    generateId: false,
  },
  plugins: [jwtPlugin(), bearerPlugin()],
})
