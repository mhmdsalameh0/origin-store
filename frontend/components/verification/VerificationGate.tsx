"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const verificationStorageKey = "origin-peptides-researcher-verified";
const verificationCookie = "origin-peptides-researcher-verified=true; path=/; max-age=31536000; SameSite=Lax";

export function hasResearcherVerification() {
  return window.localStorage.getItem(verificationStorageKey) === "true";
}

export function saveResearcherVerification() {
  window.localStorage.setItem(verificationStorageKey, "true");
  document.cookie = verificationCookie;
}

export function VerificationGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);
  const isVerificationPage = pathname === "/verify";

  useEffect(() => {
    if (isVerificationPage) {
      setCanRender(true);
      return;
    }

    try {
      if (hasResearcherVerification()) {
        setCanRender(true);
      } else {
        router.replace("/verify");
      }
    } catch {
      router.replace("/verify");
    }
  }, [isVerificationPage, router]);

  if (!canRender) {
    return null;
  }

  return children;
}
