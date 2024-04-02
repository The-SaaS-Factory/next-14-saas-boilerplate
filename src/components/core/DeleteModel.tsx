/* eslint-disable no-unused-vars */
"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const DeleteModel = ({
  modelId,
  primaryModelId,
  deleteAction,
}: {
  modelId: number;
  primaryModelId?: number;
  deleteAction: (modelId: number, primaryModelId?: number | undefined) => void;
}) => {
  const handleDeleteModel = () => {
    toast("Sure?", {
      action: {
        label: "Delete",
        onClick: () => {
          if (primaryModelId) {
            deleteAction(primaryModelId, modelId);
            toast.success("Model deleted successfully");
          } else {
            deleteAction(modelId);
          }
        },
      },
    });

  };

  return (
    <div>
      <button className="btn-icon" onClick={handleDeleteModel}>
        <TrashIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DeleteModel;
