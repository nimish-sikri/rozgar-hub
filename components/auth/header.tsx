import Image from "next/image";
import logo from "@/assets/logo.png";

interface HeaderProps{
    label: string;
}

export const Header = ({
    label,
} : HeaderProps) => {

    return (
        <div className="
            w-full flex flex-col gap-y-2
            items-center justify-center
        ">
            <div className="flex items-center gap-2">
                <span className="text-5xl font-bold tracking-tight">Rozgar Hub</span>
            </div>

            <p className="text-neutral-500 text-lg">
                {label}
            </p>
        </div>
    )
}