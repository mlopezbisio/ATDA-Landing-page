import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getMemberByEmail, isDatabaseConfigured } from "@/lib/db/members";
import { isAdminEmail } from "@/lib/utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "member",
      name: "Socio",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!isDatabaseConfigured()) return null;
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const member = await getMemberByEmail(email);
        if (!member || member.status !== "active" || !member.passwordHash) return null;

        const ok = await bcrypt.compare(password, member.passwordHash);
        if (!ok) return null;

        return {
          id: String(member.id),
          email: member.email,
          name: member.fullName,
          role: "member" as const,
          memberId: member.id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        return isAdminEmail(user.email);
      }
      if (account?.provider === "member") {
        return Boolean(user.email && user.memberId);
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user?.email) {
        token.role = "admin";
        token.memberId = undefined;
      }
      if (account?.provider === "member" && user) {
        token.role = "member";
        token.memberId = user.memberId ?? Number(user.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "member" | undefined;
        session.user.memberId = token.memberId as number | undefined;
      }
      return session;
    },
  },
});
