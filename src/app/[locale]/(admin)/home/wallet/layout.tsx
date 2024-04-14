import PageName from "@/components/ui/commons/PageName";
import { ReactNode } from "react";

export default function AdminWalletLayout(props: {
  children: ReactNode;
  balance: ReactNode;
  movements: ReactNode;
}) {
  return (
    <>
      <PageName
        name="Wallet"
        breadcrumbs={[
          { name: "Home", href: "/home" },
          { name: "Wallet", href: "/home/wallet" },
        ]}
      />
      <div className="flex w-full">
        <div className="w-full lg:max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-7 gap-7 my-7">
          <div className="col-span-1 lg:col-span-3 ">{props.balance}</div>
          <div className="col-span-1 lg:col-span-4 ">{props.movements}</div>
        </div>
      </div>
    </>
  );
}
