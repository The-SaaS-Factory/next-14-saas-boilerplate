import { ReactNode } from "react";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminRoot = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <SignedOut>
        <div className="flex justify-center py-24">
          <SignIn 
           afterSignUpUrl={"/welcome"}
           afterSignInUrl={"/home"}
          />
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <AdminLayout>{children}</AdminLayout>
        </div>
      </SignedIn>

      
    </main>
  );
};
export default AdminRoot;
