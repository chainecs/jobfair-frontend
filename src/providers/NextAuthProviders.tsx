/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
