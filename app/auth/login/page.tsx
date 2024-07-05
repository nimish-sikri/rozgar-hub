import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";
import authImg from '@/public/images/auth.jpg';

const LoginPage = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center relative">
            {/* Background Image Section */}
            {/* <div className="absolute inset-0 z-0 hidden lg:block opacity-70">
                <Image
                    src={authImg}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                />
            </div> */}

            {/* Foreground Content */}
            <div className="relative z-10 flex items-center justify-center max-w-md p-6 bg-white rounded-lg ">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
