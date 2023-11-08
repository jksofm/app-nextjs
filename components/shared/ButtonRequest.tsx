"use client";
import React from "react";
import { Button } from "../ui/button";
import { requestJoinCommunity } from "@/lib/actions/community.actions";
import { useOrganization, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function ButtonRequest() {
  const pathName = usePathname();
  const { user } = useUser();
  //   console.log(user);
  return (
    <div
      onClick={async () => {
        try {
          await requestJoinCommunity({
            communityId: pathName.slice(13),
            userId: (user as any).id,
            path: pathName,
          });
          toast.success("Request successfully");
        } catch (e) {
          toast.error("Fail to requesst");
        }
      }}
      className="bg-[#877EFF] max-w-[300px] text-small-regular p-4 md:text-base-regular text-light-2 cursor-pointer rounded-md text-center mt-7"
    >
      Request to join this community
    </div>
  );
}
