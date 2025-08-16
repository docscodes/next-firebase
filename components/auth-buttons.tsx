"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";

export default function AuthButtons() {
  const auth = useAuth();

  return (
    <div>
      {!!auth?.currentUser && (
        <div className="flex gap-2 items-center">
          <div>{auth.currentUser.email}</div>
          <div onClick={auth.logout}>Logout</div>
        </div>
      )}

      {!auth?.currentUser && (
        <div className="flex gap-2 items-center">
          <Link
            href="/signin"
            className="uppercase tracking-widest hover:underline"
          >
            Signin
          </Link>
          <Link
            href="/signup"
            className="uppercase tracking-widest hover:underline"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
