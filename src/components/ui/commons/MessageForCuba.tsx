"use client";

import { useEffect, useState } from "react";

const MessageForCuba = () => {
  const [isCubaUser, setIsCubaUser] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("country") === "CU") {
        setIsCubaUser(true);
      }
    }
  }, []);

  return (
    <div>
      {isCubaUser && (
        <div className="py-3">
          <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-800">
            <svg
              className="h-1.5 w-1.5 fill-red-400"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            <span>Este servicio está disponible para Cuba</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageForCuba;
