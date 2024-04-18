import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

async function BtnBuyService() {
  const user = await currentUser();

  return (
    <div className="flex space-x-3">
      <Link
        href="https://github.com/The-SaaS-Factory/next-14-saas-boilerplate/"
        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        View Github Repo 
      </Link>

      <Link
        href={user ? "/home" : "/home"}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-gray-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Login 
      </Link>
    </div>
  );
}

export default BtnBuyService;
