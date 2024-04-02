import { SignedOut, SignIn } from "@clerk/nextjs";

function LoginPage() {
  return (
    <div>
      <SignedOut>
        <div className="flex justify-center py-24">
          <SignIn afterSignUpUrl={"/welcome"} afterSignInUrl={"/home"} />
        </div>
      </SignedOut>
    </div>
  );
}

export default LoginPage;
