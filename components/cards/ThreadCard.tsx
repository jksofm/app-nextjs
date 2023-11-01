import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonLike from "../ui/ButtonLike";
import { fetchThreads } from "@/lib/actions/thread.actions";

export interface Thread {
  text: string;
  author: {
    _id: string;
    name: string;
    username: string;
    image: string;
  };
  community: any;
  createdAt: string;
  parentId: any;
  children: any[];
  likes: any[];
}
interface ThreadCardProps {
  currentUserId: string;
  thread: any;
  classCustom?: string;
}
export default function ThreadCard({
  thread,
  currentUserId,
  classCustom,
}: ThreadCardProps) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl p-7 ${
        !classCustom ? "bg-dark-2" : classCustom
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              className="relative h-11 w-11"
              href={`/profile/${thread.author.id}`}
            >
              <Image
                src={thread.author.image}
                alt="Profile Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex-w-full flex-col">
            <Link className="w-fit" href={`/profile/${thread.author.id}`}>
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {thread.author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {thread.text}
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <ButtonLike
                  userId={thread.author._id.toString()}
                  likes={thread.likes}
                  threadId={thread._id.toString()}
                />
                <Link href={`/thread/${thread._id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="object-contain cursor-pointer"
                  />
                </Link>

                {/* <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Image
                  src="/assets/share.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                /> */}
              </div>
              <div className="flex gap-4">
                {thread.children.length > 0 && (
                  <Link href={`/thread/${thread.id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {thread.children.length} replies
                    </p>
                  </Link>
                )}
                {thread.likes.length >= 0 && (
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {thread.likes.length} likes
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
