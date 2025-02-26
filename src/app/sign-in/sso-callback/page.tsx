"use client"

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";

export default function SsoCallbackPage() {
  const router = useRouter();
  const { signIn } = useSignIn();

  useEffect(() => {
    const { after_sign_in_url } = router.query;

    if (after_sign_in_url && signIn) {
      signIn.create({
        identifier: after_sign_in_url as string,
      }).then(() => {
        // Redirect to the after_sign_in_url
        router.push(after_sign_in_url as string);
      }).catch((error) => {
        console.error("Sign-in error:", error);
        // Handle error (e.g., show a message)
      });
    }
  }, [router.query, signIn]);

// Show a loading state while processing
}