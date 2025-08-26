"use client";

import CommonLoginForm from "@/components/login-form";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  return <CommonLoginForm onSuccess={() => router.refresh()} />;
};

export default LoginForm;
