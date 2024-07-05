import { RegisterForm } from "@/components/auth/register-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import authImg from '@/public/images/auth.jpg'

const RegisterPage = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            
            {/* <div className="hidden overflow-hidden w-[50%] h-full lg:block">
                <div className="flex items-center justify-center overflow-hidden h-full">
                    <Image
                        src={authImg}
                        alt="background"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div> */}
            <div className="lg:p-8 h-full w-[50%] z-10 bg-white flex items-center flex-col justify-center">
                <div className="flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
                    <RegisterForm />
                    <p className=" text-center text-sm text-neutral-400">
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
            </div>
        </div>
    )
}

export default RegisterPage;