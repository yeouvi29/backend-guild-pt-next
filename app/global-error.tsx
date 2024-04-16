"use client";

import { useEffect } from "react";
import ErrorFallback from "@/app/components/ErrorFallback/ErrorFallback";
import { ErrorFallbackPropsType } from "@/types";

export default function GlobalError({ error, reset }: ErrorFallbackPropsType) {
  return (
    <html>
      <body>
        <ErrorFallback error={error} reset={reset} />
      </body>
    </html>
  );
}
