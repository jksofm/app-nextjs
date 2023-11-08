import ThreadCard from "@/components/cards/ThreadCard";
import AccountProfile from "@/components/forms/AccountProfile";
import UserProfile from "@/components/forms/UserProfile";
import Pagination from "@/components/shared/Pagination";
import { fetchThreadsByUserId } from "@/lib/actions/thread.actions";
import { getUserProfile, getUsersId } from "@/lib/actions/user.actions";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import React from "react";

// export async function generateStaticParams() {
//   const IdsArray = await getUsersId();
//   return IdsArray;
// }
export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: any;
}) {
  const user = await currentUser();

  ///fetch from database
  const userInfo: User = (await getUserProfile(params.id as string)) as User;
  //   console.log(params.id);
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
    pageNumber: Number(searchParams.page as string) || 1,
    pageSize: 5,
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
                  currentUserId={userInfo?._id as string}
                  thread={post}
                  community={post.community}
                  author={post.author._id}
                />
              ))}
            </>
          )}
        </section>

        <Pagination
          pageNumber={
            Number(searchParams.page) || result.pagination.currentPage || 1
          }
          pageSize={result.pagination.pageSize}
          pageTotal={result.pagination.totalPage}
          isNext={result.pagination.currentPage < result.pagination.totalPage}
          path={``}
        />
      </section>
    </main>
  );
}
