"use client";
import { useInView } from "react-intersection-observer";

import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import {
  fetchThreads,
  fetchThreadsInfinity,
} from "@/lib/actions/thread.actions";
import ThreadCard from "../cards/ThreadCard";
import { useUser } from "@clerk/nextjs";
import ThreadCardClient from "../cards/ThreadCardClient";

export const revalidate = 60;
export default function Loadmore() {
  const [threadsList, setThreadsList] = useState([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const { ref, inView } = useInView();
  const { isSignedIn, user, isLoaded } = useUser();
  const loadMoreThreads = async () => {
    const nextPage = pagesLoaded + 1;
    // const newThreads = await fetchThreadsInfinity({
    //   pageNumber: nextPage,
    //   userId: user?.id as string,
    //   pageSize: 3,
    // });
    const host = process.env.HOST || "http://localhost:3000/";
    const data = await fetch(
      `${host}api/threads?pageSize=5&pageNumber=${nextPage}`
    );
    const newThreads = await data.json();
    // console.log("tgreas", newThreads);

    // if (newThreads && nextPage < newThreads.pagination.totalPage) {
    // if () {
    setThreadsList(
      (prev: any) => [...prev, ...newThreads.threads.posts] as any
    );
    // }
    setPagesLoaded(nextPage);
    if (!newThreads.threads.pagination.isNext) {
      setIsNext(false);
    }
    // }
  };

  useEffect(() => {
    if (inView) {
      //   console.log("Scoll to the end");
      loadMoreThreads();
    }
  }, [inView]);
  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        {threadsList.length === 0 ? (
          <p className="no-result">Loading...</p>
        ) : (
          <>
            {threadsList.map((post: any) => (
              <ThreadCardClient
                key={post._id}
                currentUserId={user?.id as string}
                thread={post}
                community={post.community}
              />
            ))}
          </>
        )}
      </section>
      {isNext && (
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-3"
          ref={ref}
        >
          <Spinner />
        </div>
      )}
    </>
  );
}
