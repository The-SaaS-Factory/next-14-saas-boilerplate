import { ReactNode } from "react";
import { Protect, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import AdminLayout from "@/components/layouts/AdminLayout";
import { RedirectSuperAadminInLogin } from "@/utils/facades/frontendFacades/superAdminFrontendFacade";
import ClientLayout from "@/components/layouts/ClientLayout";

const AdminRoot = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <SignedOut>
        <div className="flex justify-center py-24">
          <SignIn afterSignUpUrl={"/welcome"} afterSignInUrl={"/home"} />
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <Protect role="org:admin">
            <AdminLayout>{children}</AdminLayout>
          </Protect>
          <Protect role="org:member">
            <ClientLayout>{children}</ClientLayout>
          </Protect>
        </div>
        <RedirectSuperAadminInLogin url="/admin" />
      </SignedIn>
    </main>
  );
};
export default AdminRoot;
