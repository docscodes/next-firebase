import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Login() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <ContinueWithGoogleButton />
      </CardContent>

      <CardFooter>
        Don&apos;t have an account?
        <Link
          href="/singup"
          className="underline pl-2"
        >
          Signup here.
        </Link>
      </CardFooter>
    </Card>
  );
}
