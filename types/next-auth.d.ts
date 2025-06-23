import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "COUPLE" | "PLANNER" | "GUEST";
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: "COUPLE" | "PLANNER" | "GUEST";
    };
  }

  interface JWT {
    role: "COUPLE" | "PLANNER" | "GUEST";
  }
}
