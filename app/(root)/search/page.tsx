import UserCard from "@/components/cards/UserCard";
import SearchProfile from "@/components/forms/SearchProfile";
import { fetchThreadsByUserId } from "@/lib/actions/thread.actions";
import { fetchUsers, getMyProfile } from "@/lib/actions/user.actions";
import { searchValidation } from "@/lib/vaidation/thread";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

type Response = {
  pagination: {
    pageSize: number;
    pageNumber: number;
    pageTotal: number;
  };
  data: User[] | [];
};
export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { searchString: string };
}) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getMyProfile(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const result: Response = (await fetchUsers({
    userId: user.id,
    searchString: (searchParams.searchString as string) || "",
  })) as Response;

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <SearchProfile />
      <div className="mt-14 flex flex-col gap-9">
        {result.data.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.data.map((user) => {
              return (
                <UserCard
                  userImage={user.image}
                  username={user.username}
                  userId={user.id as string}
                  key={user.id}
                  name={user.name}
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
