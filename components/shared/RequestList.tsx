import { fetchRequest } from "@/lib/actions/community.actions";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

import ButtonAccept from "./ButtonAccept";

async function RequestList({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) {
  const result = await fetchRequest({ communityId });
  //   console.log("result", result);
  if (!result) {
    return <p className="no-result">No Request</p>;
  }
  return (
    <div>
      {result.map((item) => {
        return (
          <article className="activity-card mt-7">
            <Image
              src={item.user.image}
              alt="Profile Picture"
              width={20}
              height={20}
              className="rounded-full object-contain"
            />
            <p className="text-small-regular md:text-base-regular text-light-2">
              {item.user.name} has requested to join in the community{" "}
              {moment(item.createdAt, "YYYYMMDD").fromNow()}
            </p>
            <div className="flex gap-4 ml-auto">
              <ButtonAccept communityId={communityId} userId={item.user.id} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default RequestList;
