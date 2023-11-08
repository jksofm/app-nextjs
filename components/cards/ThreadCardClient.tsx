"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonLike from "../ui/ButtonLike";
import { fetchThreads } from "@/lib/actions/thread.actions";
import moment from "moment";

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
  accountType?: string;
  author?: {
    name: string;
    image: string;
    id: string;
  };
  community?: {
    name: string;
    image: string;
    id: string;
  };
}
export default function ThreadCardClient({
  thread,
  currentUserId,
  classCustom,
  accountType,
  author,
  community,
}: ThreadCardProps) {
  const chooseAuthor = accountType === "Community" ? author : thread.author;

  return (
    <article
      className={`flex w-full flex-col rounded-xl p-7 ${
        !classCustom ? "bg-dark-2" : classCustom
      }`}
    >
      <div className="flex items-start justify-between relative">
        <div className="absolute top-0 right-1">
          <p className="text-light-3 text-small-regular">
            {moment(thread.createdAt, "YYYYMMDD").fromNow()}
          </p>
        </div>
        {community && (
          <div className="absolute bottom-0 right-1">
            <div className="flex gap-1 items-center">
              <p className="text-small-regular text-light-3">
                @{community.name}@Community
              </p>
              {/* <Image
                src={community?.image as string}
                alt="Community Image"
                width={12}
                height={12}
                className="rounded-full"
              /> */}
            </div>
          </div>
        )}

        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-between">
              <Link
                className="relative h-11 w-11"
                href={`/profile/${chooseAuthor.id}`}
              >
                <Image
                  src={chooseAuthor.image}
                  alt="Profile Image"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>
            </div>

            <div className="thread-card_bar" />
          </div>
          <div className="flex-w-full flex-col">
            <Link className="w-fit" href={`/profile/${chooseAuthor.id}`}>
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {chooseAuthor.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {thread.text}
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <ButtonLike
                  userId={chooseAuthor._id.toString()}
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
