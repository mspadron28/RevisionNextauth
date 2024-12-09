import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    username: string;
    email: string;
    token: string;
  }

  interface JWT {
    id: number;
    username: string;
    email: string;
    accessToken: string;
  }
}
