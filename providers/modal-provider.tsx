"use client"

import { ProfileModal } from "@/components/modals/profile-modal";
import { TwoFactorModal } from "@/components/modals/two-factor-modal";
import { TwoFactorSettingsModal } from "@/components/modals/two-factor-settings-modal";
import { UserRoleModal } from "@/components/modals/user-role-modal"
import { useModal } from "@/hooks/use-modal-store"
import { User } from "@prisma/client"
import { useEffect } from "react";

interface ModalProviderProps {
    currentUser: User;
}
export const ModalProvider = ({
    currentUser,
} : ModalProviderProps) => {

    const { onOpen } = useModal();

    useEffect(() => {
        if(currentUser && !currentUser.role){
            onOpen('roleModal')
        }
        if(currentUser && 
            !currentUser?.image && 
            !currentUser?.isTwoFactorEnabled && 
            !currentUser?.isTwoFactorPopupShown
        ){
            onOpen('twoFactorModal')
        }
    }, [currentUser]);

    
    return (
        <div>
            <UserRoleModal/>
            <ProfileModal currentUser={currentUser}/>
            {/* <TwoFactorModal currentUser={currentUser}/> */}
            {/* <TwoFactorSettingsModal/> */}
        </div>
    )
}