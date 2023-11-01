"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ButtonPush({
  url,
  content,
}: {
  url: string;
  content: string;
}) {
  const router = useRouter();
  return (
    <Button
      className="user-card_btn"
      onClick={() => {
        router.push(url);
      }}
    >
      {content}
    </Button>
  );
}
