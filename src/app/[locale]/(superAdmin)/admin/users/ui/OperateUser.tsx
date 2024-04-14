"use client";

import { deleteUser } from "@/actions/superAdmin/superAdminUsersModule/delete-user";
import { toast } from "sonner";

function OperateUser({ userId }: { userId: number }) {
    
  const handleDeleteUser = async () => {
    await deleteUser(userId).then(() => {
      toast.success("User deleted successfully");
    });
  };

  return (
    <div>
      <button
        className="btn-main"
        onClick={() => {
          handleDeleteUser();
        }}
      >
        Delete User
      </button>
    </div>
  );
}

export default OperateUser;
