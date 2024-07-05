"use client";

import { useClerk } from "@clerk/nextjs"; //This hook from the @clerk/nextjs library provides access to the current user and authentication functions, such as signing out.
import Link from "next/link";
import { useRouter } from "next/navigation"; //This hook from Next.js provides navigation functions, allowing programmatic navigation.


export default function AdminNavbar() {

    const { user, signOut } = useClerk();
    //This hook returns an object containing the current user and a signOut function.
    //user: The current authenticated user's information.
    //signOut: A function to log out the user.

    const router = useRouter();
    //This hook returns a router object, allowing you to programmatically navigate to different routes.
    //router.push("/"): Redirects the user to the home page.

    return (
        <div className="px-3">
          <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
            <Link href="/admin" className="font-semibold underline">
              Admin Dashboard
            </Link>
            <div className="space-x-2">
              <span className="font-semibold">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
              <button
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                className="underline"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      );
    }      
