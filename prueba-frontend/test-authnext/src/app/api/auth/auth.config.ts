import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/auth/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        if (res.ok && data?.token) {
          return { ...data.user, token: data.token };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.last_name = user.last_name;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as number,
        username: token.username as string,
        last_name: token.last_name as string,
        token: token.accessToken as string,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 5, //Tiempo en segundos para la session
  },
  jwt: {
    maxAge: 60 * 5, //Tiempo en segundos para lo del token
  },
  logger: {
    debug: console.log,
    error: console.error,
    warn: console.warn,
  },
};
