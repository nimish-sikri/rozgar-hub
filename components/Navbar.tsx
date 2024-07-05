// "use client"

// import logo from "@/assets/logo.png";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { User } from "@prisma/client";
// import { UserMenu } from "./user-menu";
// import { useModal } from "@/hooks/use-modal-store";
// import { useRouter } from "next/navigation";

// interface NavbarProps{
//   currentUser: User;
// }
// export default function Navbar({
//   currentUser,
// } : NavbarProps) {

//   const router = useRouter()

//   return (
//     <header className="shadow-md">
//       <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
//         <Link href="/" className="flex items-center gap-3">
//           <Image src={logo} width={40} height={40} alt="Flow Jobs logo" />
//           <span className="text-xl font-bold tracking-tight">Rozgar Hub</span>
//         </Link>
//         <div className="flex gap-2">
//           {!currentUser && (
//               <>
//                 <Button asChild className="bg-black hover:bg-gray-800" variant={'ghost'}>
//                   <Link href="/jobs/new" className="font-bold text-white">
//                     Login
//                   </Link>
//                 </Button>
//               </>
//           )}
//           {(currentUser && currentUser.role === "EMPLOYER") && (
//               <>
//                 <Button asChild className="bg-black hover:bg-gray-800">
//                   <Link href="/jobs/new" className="font-bold text-white">
//                     Post a job
//                   </Link>
//                 </Button>
//               </>
//             )}

//             {(currentUser && currentUser.role === "SEEKER") && (
//               <>
//                 <Button asChild className="bg-green-600 hover:bg-black">
//                   <Link href="https://drive.google.com/file/d/1hUUtFQMf9f5JRlzVq6b8Vc_UnkQ9o7X0/view?usp=sharing" target="_blank" className="font-bold text-white">
//                     Hire Me
//                   </Link>
//                 </Button>
//               </>
//             )}
//           <UserMenu currentUser={currentUser}/>
//         </div>
//       </nav>
//     </header>
//   );
// }


// components/Navbar.tsx
"use client";
import { useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { UserMenu } from "./user-menu";
import ResumeUploadModal from "@/components/modals/seekerResumeModal";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/image-upload"; // Import the ImageUpload component

interface NavbarProps {
  currentUser: User;
}

export default function Navbar({
  currentUser,
} : NavbarProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleOpenUploadModal = () => setUploadModalOpen(true);
  const handleCloseUploadModal = () => setUploadModalOpen(false);

  const router = useRouter();

  return (
    <header className="shadow-md">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Flow Jobs logo" />
          <span className="text-xl font-bold tracking-tight">Rozgar Hub</span>
        </Link>
        <div className="flex gap-2">
          {!currentUser && (
            <>
              <Button asChild className="bg-black hover:bg-gray-800" variant="ghost">
                <Link href="/jobs/new" className="font-bold text-white">
                  Login
                </Link>
              </Button>
            </>
          )}
          {(currentUser && currentUser.role === "EMPLOYER") && (
            <>
              <Button asChild className="bg-black hover:bg-gray-800">
                <Link href="/jobs/new" className="font-bold text-white">
                  Post a job
                </Link>
              </Button>
            </>
          )}
          {(currentUser && currentUser.role === "SEEKER") && (
            <>
              {/* <ImageUpload /> Add the ImageUpload component here */}
              <Button onClick={handleOpenModal} className="bg-green-600 hover:bg-black font-bold text-white">
                Hire Me
              </Button>
            </>
          )}
          {(currentUser && currentUser.role === "ADMIN") && (
            <>
              {/* <ImageUpload /> Add the ImageUpload component here */}
              <Button onClick={() => router.push('/dashboard')} className="bg-green-600 hover:bg-black font-bold text-white">
                Dashboard
              </Button>
            </>
          )}
          <UserMenu currentUser={currentUser} />
        </div>
      </nav>
      <ResumeUploadModal isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} />
      <ResumeUploadModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
}


// import { useState } from "react";
// import logo from "@/assets/logo.png";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { User } from "@prisma/client";
// import { UserMenu } from "./user-menu";
// import ResumeUploadModal from "@/components/modals/seekerResumeModal";
// import { useRouter } from "next/navigation";

// interface NavbarProps {
//   currentUser: User;
// }

// export default function Navbar({
//   currentUser,
// } : NavbarProps) {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const handleOpenModal = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);

//   const router = useRouter();

//   return (
//     <header className="shadow-md">
//       <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
//         <Link href="/" className="flex items-center gap-3">
//           <Image src={logo} width={40} height={40} alt="Flow Jobs logo" />
//           <span className="text-xl font-bold tracking-tight">Rozgar Hub</span>
//         </Link>
//         <div className="flex gap-2">
//           {!currentUser && (
//             <>
//               <Button asChild className="bg-black hover:bg-gray-800" variant="ghost">
//                 <Link href="/jobs/new" className="font-bold text-white">
//                   Login
//                 </Link>
//               </Button>
//             </>
//           )}
//           {(currentUser && currentUser.role === "EMPLOYER") && (
//             <>
//               <Button asChild className="bg-black hover:bg-gray-800">
//                 <Link href="/jobs/new" className="font-bold text-white">
//                   Post a job
//                 </Link>
//               </Button>
//             </>
//           )}
//           {(currentUser && currentUser.role === "SEEKER") && (
//             <>
//               <Button onClick={handleOpenModal} className="bg-green-600 hover:bg-black font-bold text-white">
//                 Hire Me
//               </Button>
//             </>
//           )}
//           <UserMenu currentUser={currentUser} />
//         </div>
//       </nav>
//       <ResumeUploadModal isOpen={isModalOpen} onClose={handleCloseModal} />
//     </header>
//   );
// }

