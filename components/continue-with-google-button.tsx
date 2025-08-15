"use client";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";

export default function ContinueWithGoogleButton() {
  return (
    <Button
      onClick={async () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider);
      }}
    >
      Continue with Google
    </Button>
  );
}
