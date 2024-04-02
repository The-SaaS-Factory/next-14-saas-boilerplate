"use client";

import ErrorPage from "@/components/layouts/errors/ErrorPage";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return (
    <html>
      <body>
        <ErrorPage reset={reset} message={error.message} />
      </body>
    </html>
  );
}
