"use client"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { UserAvatar } from "@/components/user-avatar"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { Bookmark, LogOut, UserRound } from "lucide-react"
import { logout } from "@/actions/logout.action"
import { useModal } from "@/hooks/use-modal-store"

interface UserMenuProps{
    currentUser: User;
}
export const UserMenu = ({
    currentUser,
} : UserMenuProps) => {

    const router = useRouter();
    const { onOpen } = useModal();

    const handleLogout = () => {
        logout()
    }
    return (
        <>
        {currentUser && (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar user={currentUser}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">

                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            onClick={() => onOpen('profileModal')}
                        >
                            <UserRound size={20}/>
                            <p>Profile</p>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            onClick={() => router.push('/saved-jobs')}
                        >
                            <Bookmark size={20}/>
                            <p>Saved Jobs</p>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator/>

                        <DropdownMenuItem 
                            className="cursor-pointer text-red-500 flex items-center gap-2" 
                            onClick={handleLogout}
                        >
                            <LogOut size={20}/>
                            <p>Logout</p>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </>
        )}
        </>

    )
}