import EditThread from "@/components/forms/EditThread";
import { getThreadInfo } from "@/lib/actions/thread.actions";
import { getMyProfile } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function ThreadEdit({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getMyProfile(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const threadId = searchParams["threadId"];

  const threadInfo = await getThreadInfo(threadId as string);
  if (!threadId) return <div className="no-result">Not Found Thread</div>;

  return (
    <>
      <h1 className="head-text">Edit Thread</h1>;
      <EditThread
        threadContent={threadInfo.data.text}
        userId={user.id.toString()}
        threadId={threadInfo.data._id}
      />
    </>
  );
}
