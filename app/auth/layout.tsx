import Image from "next/image";

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
          <div className="h-full w-full flex items-center justify-center">
            <div className="bg-white overflow-hidden z-10 flex items-center justify-center h-full w-full">
              {children}
            </div>
          </div> 
   );
}
 
export default AuthLayout;