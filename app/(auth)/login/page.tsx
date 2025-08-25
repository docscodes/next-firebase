import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter>
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="underline pl-2"
        >
          Signup here.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Login;
