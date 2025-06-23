import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role: "COUPLE" | "PLANNER" | "GUEST"
    }
  }

  interface User {
    id: string
    role: "COUPLE" | "PLANNER" | "GUEST"
  }

  interface JWT {
    id: string
    role: "COUPLE" | "PLANNER" | "GUEST"
  }
}
