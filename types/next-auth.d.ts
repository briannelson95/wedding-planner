import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: "COUPLE" | "PLANNER" | "GUEST"
      username: string
    }
  }

  interface User {
    id: string
    role: "COUPLE" | "PLANNER" | "GUEST"
    username: string
  }

  interface JWT {
    id: string
    role: "COUPLE" | "PLANNER" | "GUEST"
    username: string
  }
}
