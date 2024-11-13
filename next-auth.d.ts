import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      token: string;
    };
  }

  interface User {
    _id: string;
    email: string;
    role: string;
    token: string;
  }
}
