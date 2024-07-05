import { ClerkProvider } from "@clerk/nextjs"; //This is a component from the Clerk library, which provides authentication and user management solutions.
import { Metadata } from "next"; //this is a type from Next.js, used to define metadata for the page.
import AdminNavbar from "./AdminNavbar";

//This defines metadata for the page. The title property sets the title of the admin page to "Admin".
export const metadata: Metadata = {
    title: "Admin",
};
  
//This declares a React functional component named Layout and exports it as the default export of the module. It accepts a children prop, which is a React node (any renderable React element).
// <ClerkProvider> This component wraps its children with the context needed for Clerk's authentication functionalities. It ensures that any component within the ClerkProvider has access to authentication-related data and functionalities.
// {children} This renders the content passed to the Layout component as children.

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <ClerkProvider>
        <AdminNavbar />
        {children}
      </ClerkProvider>
    );
}
  