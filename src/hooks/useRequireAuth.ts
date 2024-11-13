import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); // Use replace to avoid history back to this page
    }
  }, [status, router]);

  // Return null if user is unauthenticated to prevent any content from rendering
  if (status === "unauthenticated") {
    return { session: null, status: "unauthenticated" };
  }

  return { session, status };
};
