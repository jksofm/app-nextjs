"use client";
import React, { useEffect, useState } from "react";
import ThreadCard from "../cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function InfinityHomeScroll() {
  const [postArray, setPostArray] = useState([]);
  const { isSignedIn, user, isLoaded } = useUser();
  const searchParams = useSearchParams();

  async function fetchArray() {
    console.log("test");

    const page = searchParams.get("page");

    const result = await fetchThreads({
      pageNumber: Number(page as string) || 1,
      pageSize: 3,
      userId: "user_2WvBB3wSQiGuxo4rVAWSckGWHHm",
    });

    // setPostArray(result.posts);
  }
  useEffect(() => {
    fetchArray();
  }, []);
  return (
    <section className="mt-9 flex flex-col gap-10">
      {/* {postArray.length === 0 ? (
        <p className="no-result"> No threads found</p>
      ) : (
        <>
          {postArray.map((post: any) => (
            <ThreadCard
              key={post._id}
              currentUserId={user.id}
              thread={post}
              community={post.community}
            />
          ))}
        </>
      )} */}
    </section>
  );
}

export default InfinityHomeScroll;
