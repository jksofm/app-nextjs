import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";
export default async function CreateThreadPage() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getMyProfile(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  return (
    <>
      <h1 className="head-text">Create Thread</h1>;
      <PostThread userId={userInfo._id.toString()} />
    </>
  );
}
