import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import SuperAdminMiddleware from "@/components/layouts/SuperAdminMiddleware";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

// eslint-disable-next-line no-undef
const AdminRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <SignedOut>
        <div className="flex justify-center py-24">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <SuperAdminMiddleware>
            <SuperAdminLayout>{children}</SuperAdminLayout>
          </SuperAdminMiddleware>
        </div>
      </SignedIn>
    </main>
  );
};
export default AdminRoot;
