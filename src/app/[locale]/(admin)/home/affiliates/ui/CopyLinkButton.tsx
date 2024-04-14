"use client";

import { toast } from "sonner";

function CopyLinkButton({ userId }: { userId: string }) {
  return (
    <button
      className="ml-4 btn-main"
      onClick={() => {
        navigator.clipboard.writeText(
          `https://hostingclan.com?aff=${userId}`
        );

        toast.success("Link copied to clipboard");
      }}
    >
      Copiar
    </button>
  );
}

export default CopyLinkButton;
