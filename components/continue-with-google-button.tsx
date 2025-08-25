"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await auth?.loginWithGoogle();
        router.refresh();
      }}
      className="w-full"
      variant={"outline"}
    >
      Continue with Google
    </Button>
  );
}
