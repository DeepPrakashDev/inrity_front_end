"use client";
import { useAuth } from "../context/UserAuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirect immediately without rendering the page
        router.replace("/login"); // replace avoids adding history entry
      } else {
        setVerified(true); // user is authenticated
      }
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !verified) return <p>Loading...</p>;

  return <>{children}</>;
}
