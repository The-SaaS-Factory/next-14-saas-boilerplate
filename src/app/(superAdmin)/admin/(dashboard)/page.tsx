import React from "react";
import DashboardClientComponent from "./DashboardClientComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard"
};

const SuperAdminDashboard = () => {
  return (
    <div>
      <DashboardClientComponent />
    </div>
  );
};

export default SuperAdminDashboard;
