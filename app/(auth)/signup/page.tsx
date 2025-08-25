import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./register-form";

const Signup = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link
          href="/login"
          className="pl-2 underline"
        >
          Log in here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Signup;
