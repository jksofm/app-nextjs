"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

import { useOrganization, clerkClient } from "@clerk/nextjs";
import { addMemberToCommunity } from "@/lib/actions/community.actions";
export default function ButtonAccept({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) {
  const router = useRouter();
  const path = usePathname();
  console.log("communit", clerkClient.users);
  const { organization } = useOrganization();

  return (
    <Button
      className="user-card_btn"
      onClick={async () => {
        // await organization.inviteMember({ emailAddress, role });
        // const organization = await (
        //   organizations as any
        // ).createOrganizationMembership({
        //   organizationId: communityId,
        //   userId,
        //   role: "basic_member",
        // });
        // addMemberToCommunity(communityId, userId, path);
      }}
    >
      Accept
    </Button>
  );
}
