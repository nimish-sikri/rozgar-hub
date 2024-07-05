"use client"


import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

    const onClick = (provider: "google" | "github" | "facebook") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <div className="relative w-full">
                <div className="absolute w-full inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-neutral-400">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="flex items-center w-full gap-x-2">
                <Button
                    size={'lg'}
                    className="w-full"
                    variant={'outline'}
                    onClick={() => onClick("google")}
                >
                    <FcGoogle className="h-5 w-5"/>
                </Button>

                <Button
                    size={'lg'}
                    className="w-full"
                    variant={'outline'}
                    onClick={() => onClick("github")}
                >
                    <FaGithub className="h-5 w-5"/>
                </Button>
            </div>

        </div>

    )
}