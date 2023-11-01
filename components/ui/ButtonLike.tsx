"use client";
import Image from "next/image";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { ObjectId } from "mongodb";
import { HandleLikeThread } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";
export default function ButtonLike({
  userId,
  likes = [],
  threadId,
}: {
  userId: string;
  likes: any[];
  threadId: string;
}) {
  //   const IsLiked = likes.includes(new ObjectId(userId));
  const isLiked = likes.includes(userId);
  const pathName = usePathname();
  //   console.log(threadId, likes);
  const handleAction = () => {
    // console.log(threadId, likes);
    console.log("test");
    HandleLikeThread({ threadId, userId, path: pathName });
  };
  return (
    <div>
      {!isLiked ? (
        <>
          <div onClick={handleAction}>
            <Image
              src="/assets/heart-gray.svg"
              alt="heart"
              width={24}
              height={24}
              className="object-contain cursor-pointer"
            />
          </div>
        </>
      ) : (
        <>
          <div onClick={handleAction}>
            <Image
              src="/assets/heart-filled.svg"
              alt="heart"
              width={24}
              height={24}
              className="object-contain cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
}
