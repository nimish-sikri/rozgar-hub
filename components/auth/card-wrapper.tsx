"use client"

import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    className?: string; // Add className prop
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    className // Use className prop
}: CardWrapperProps) => {
    return (
        <Card className={`border-none w-[400px] ${className}`}>
            
            <CardHeader>
                <Header
                    label={headerLabel}
                />
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}

            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
}
