import ThreadCard from "@/components/cards/ThreadCard";
import { getThreadInfo } from "@/lib/actions/thread.actions";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { getMyProfile } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ConmmentThread from "@/components/forms/ConmmentThread";
import CommentList from "@/components/shared/CommentList";

export default async function PageThread({
  params,
}: {
  params: { id: string };
}) {
  const thread: any = await getThreadInfo(params.id);
  console.log("thread", thread.data.children.length);
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getMyProfile(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  console.log(thread.data.children);
  if (thread.data) {
    return (
      <section className="relative">
        <div>
          <ThreadCard currentUserId={user?.id as string} thread={thread.data} />
        </div>
        <div className="mt-7">
          {/* <Comment thread={thread} currentUser={userInfo} /> */}
          <ConmmentThread
            // threadId={thread._id.toString()}
            threadId={thread.data._id.toString()}
            userImage={userInfo.image}
            username={userInfo.username}
            userId={userInfo._id.toString()}
          />
        </div>
        {thread.data.children.length > 0 && (
          <div className="mt-7">
            <CommentList
              userId={userInfo._id.toString()}
              userImage={userInfo.image}
              username={userInfo.username}
              threadArray={thread.data.children}
            />
          </div>
        )}
      </section>
    );
  }
  return <>No data</>;
}
