import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userLogIn } from "./userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await userLogIn(credentials.username, credentials.password);

        if (user && user.role) {
          return user; // Include role and token in the user object
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token; // Add token to the JWT payload
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        role: token.role as string,
        token: token.token as string, // Set the token on session.user
      };
      return session;
    },
  },
};
