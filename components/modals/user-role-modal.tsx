"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Modal } from "./modal";
import { useCallback, useState } from "react";
import { 
    FieldValues, 
    SubmitHandler, 
    useForm 
} from "react-hook-form";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import axios from "axios";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserRoleModelProps {
    currentUser: User;
}

export const UserRoleModal = () => {

    const { isOpen, onClose, type } = useModal();
    const [userRole, setUserRole] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
          role: "",
        },
    });

    const isModalOpen = isOpen && type === "roleModal";

    const handleClose = useCallback(() => {
        form.reset();
        onClose();
    }, []);

    const handleRoleSelect = (role: string) => {
        setUserRole(role);
        form.setValue("role", role);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        axios.post('/api/user-role', data)
          .then(() => {
            handleClose();
          })
          .catch((error) => {
            console.log("Something went wrong");
          })
          .finally(() => {
            setIsLoading(false);
            router.refresh();
          });
    };

    let bodyContent = (
        <div key="name" style={{ textAlign: "center" }}>
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem style={{ display: 'flex', justifyContent: 'center' }}> {/* Use flexbox to center the content */}
                            <FormControl>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button className="w-full border border-gray-300 rounded-md focus:border-black variant={'outline'}">
                                            {userRole ? (userRole === "SEEKER" ? "Job Seeker" : "Employer") : "Choose your role"}
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="center" className="w-full">
                                        <DropdownMenuItem onClick={() => handleRoleSelect("SEEKER")}>
                                            Job Seeker
                                        </DropdownMenuItem>

                                        <DropdownMenuItem onClick={() => handleRoleSelect("EMPLOYER")}>
                                            Employer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </div>
    );

    return (
        <div>
            <Modal
                title="What is your role?"
                description={'Are you an employer or job seeker?'}
                onClose={handleClose}
                onSubmit={form.handleSubmit(onSubmit)}
                actionLabel={"Save"}
                isOpen={isModalOpen}
                body={bodyContent}
                disabled={isLoading}
                // bodyClassName="text-center" // Add this line to center-align the body content
            />
        </div>
    );
};
