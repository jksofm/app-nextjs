import React from "react";
import ConmmentThread from "../forms/ConmmentThread";
import ThreadCard from "../cards/ThreadCard";

export default function CommentList({
  threadArray,
  userId,
  userImage,
  username,
}: {
  threadArray: any[];
  userId: string;
  username: string;
  userImage: string;
}) {
  console.log(threadArray);
  return (
    <div>
      {threadArray.map((thread) => {
        return (
          <div className="mt-4">
            <ThreadCard
              // threadId={thread._id.toString()}
              classCustom="bg-dark-0"
              thread={thread}
              currentUserId={userId}
            />
          </div>
        );
      })}
    </div>
  );
}
