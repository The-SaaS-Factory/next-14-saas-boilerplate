"use client";
import { generateSuperAdminKpis } from "@/actions/superAdmin/superAdminDashboardModule/generate-super-admin-kpis";
import PageName from "@/components/ui/commons/PageName";
import { toast } from "sonner";

const DashboardHeader = () => {
  const handleGnerateKpis = async () => {
    await generateSuperAdminKpis()
      .then(() => {
        toast.success("Kpis generated successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <PageName
        name={"Dashboard"}
        btn1={{
          name: "Generate Kpis",
          fn: handleGnerateKpis,
        }}
      />
    </div>
  );
};

export default DashboardHeader;
