import React, { Suspense } from "react";
import UserList from "./ui/UserList";
import PageName from "@/components/ui/commons/PageName";
import Search from "@/components/ui/commons/Search";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users"
};
const SuperAdminUserModulePage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  return (
    <main>
      <PageName name={"Dashboard"} />
      <Search placeholder="Search for a user" />
      <Suspense
        key={query + Math.random}
        fallback={<TableLoaderSkeleton count={10} />}
      >
        <UserList query={query} currentPage={currentPage} />
      </Suspense>
    </main>
  );
};

export default SuperAdminUserModulePage;
