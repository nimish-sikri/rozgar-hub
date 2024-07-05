"use client";

import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register.action";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import Link from "next/link";

export const RegisterForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | undefined>("SEEKER");

    let roleLabel = 'Job Seeker'


    const form = useForm<z.infer<typeof RegisterSchema>> ({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "SEEKER",
        }
    })

    const handleRoleSelect = (role: string) => {
        setUserRole(role);
        form.setValue("role", role);
    }

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data?.error!)
                    setSuccess(data?.success!)
                    if(data?.redirect){
                        router.push('/auth/new-verification')
                    }
                })
        })
    }
    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">

                        <div className="w-full flex items-end justify-between">

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="w-[30%] flex flex-col gap-1">
                                        <FormLabel>Sign up as</FormLabel>
                                        <FormControl>
                                            <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button className="w-full" variant={'outline'}>
                                                    {userRole ? (userRole === "SEEKER" ? "Job Seeker" : "Employer") : "Select your role"}
                                                </Button>
                                                </DropdownMenuTrigger>


                                                <DropdownMenuContent align="start" className="w-full">
                                                    <DropdownMenuItem onClick={() => handleRoleSelect("SEEKER")}>
                                                        Job Seeker
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleRoleSelect("EMPLOYER")}>
                                                        Employer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormControl>
                                        
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-[68%]  focus:ring-black">
                                        <FormControl>
                                            <Input 
                                                className=" focus:ring-black"
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Full Name"
                                                type="text"
                                            />
                                        </FormControl>
                                       
                                    </FormItem>
                                )}
                            />

                        </div>






                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input 
                                        className=" focus:ring-black"
                                            disabled={isPending}
                                            {...field}
                                            placeholder="Email"
                                            type="email"
                                        />
                                    </FormControl>
                                    
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                        className=" focus:ring-black"
                                            disabled={isPending}
                                            {...field}
                                            placeholder="Password"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        disabled={isPending} 
                        className="w-full bg-green-500 text-white font-bold hover:bg-black"
                        type="submit"
                    >
                        Sign up
                    </Button>
                </form>
            </Form>

            
        </CardWrapper>
    )
}