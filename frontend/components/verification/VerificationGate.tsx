"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { ResearcherVerification } from "./ResearcherVerification";

const verificationStorageKey = "origin-peptides-researcher-verified";

type VerificationState = "checking" | "required" | "verified";

export function hasResearcherVerification() {
  return window.sessionStorage.getItem(verificationStorageKey) === "true";
}

export function saveResearcherVerification() {
  window.sessionStorage.setItem(verificationStorageKey, "true");
}

export function VerificationGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [verificationState, setVerificationState] = useState<VerificationState>("checking");

  useEffect(() => {
    try {
      if (hasResearcherVerification()) {
        setVerificationState("verified");

        if (pathname === "/verify") {
          router.replace("/");
        }

        return;
      }
    } catch {
      // If session storage is unavailable, require verification for this page load.
    }

    setVerificationState("required");
  }, [pathname, router]);

  const handleVerified = () => {
    try {
      saveResearcherVerification();
    } catch {
      // Still allow this mounted app session; a reload will require verification again.
    }

    setVerificationState("verified");

    if (pathname === "/verify") {
      router.replace("/");
    }
  };

  if (verificationState === "checking" || (verificationState === "verified" && pathname === "/verify")) {
    return null;
  }

  if (verificationState === "required") {
    return <ResearcherVerification onVerified={handleVerified} />;
  }

  return children;
}
