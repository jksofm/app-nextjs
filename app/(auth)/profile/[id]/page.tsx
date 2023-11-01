import ThreadCard from "@/components/cards/ThreadCard";
import AccountProfile from "@/components/forms/AccountProfile";
import UserProfile from "@/components/forms/UserProfile";
import { fetchThreadsByUserId } from "@/lib/actions/thread.actions";
import { getUserProfile } from "@/lib/actions/user.actions";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import React from "react";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();

  ///fetch from database
  const userInfo: User = (await getUserProfile(params.id as string)) as User;
  console.log(params.id);
  const userData = {
    id: user?.id || "",
    objectId: userInfo?._id,
    username: userInfo?.username || "",
    name: userInfo?.name || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || "",
  };
  const result = await fetchThreadsByUserId({
    userId: userInfo._id,
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10">
      <div className="flex justify-between items-center">
        <h1 className="head-text">Profile</h1>
        <Link className="text-base-regular text-light-2" href="/">
          Back
        </Link>
      </div>

      <section className="mt-9 bg-dark-2 p-10">
        <UserProfile user={userData} btnTitle="Continue" id={params.id} />
      </section>

      <section className="mt-9 p-10">
        <h1 className="head-text text-left">Posts</h1>

        <section className="mt-9 flex flex-col gap-10">
          {result.posts.length === 0 ? (
            <p className="no-result"> No threads found</p>
          ) : (
            <>
              {result.posts.map((post: any) => (
                <ThreadCard
                  key={post._id}
                  currentUserId={user?.id as string}
                  thread={post}
                />
              ))}
            </>
          )}
        </section>
      </section>
    </main>
  );
}
