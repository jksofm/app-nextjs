import { useSearchParams } from "next/navigation";
import React from "react";

export default function useQuery() {
  let object: any = {};
  const searchParams = useSearchParams();
  for (const [key, value] of searchParams.entries() as any) {
    object[key] = value;
  }
  return object;
}
