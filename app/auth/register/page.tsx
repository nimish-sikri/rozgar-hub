import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="space-y-6">
      <RegisterForm />
      <p className="text-center text-sm text-neutral-400">
        By clicking Sign up, you agree to our{" "}
        <Link
          href="/terms"
          className="hover:text-black underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="hover:text-black underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default RegisterPage;
