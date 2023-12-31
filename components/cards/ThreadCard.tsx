import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonLike from "../ui/ButtonLike";
import { fetchThreads } from "@/lib/actions/thread.actions";
import moment from "moment";
import { Dropdown } from "flowbite-react";

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
export default function ThreadCard({
  thread,
  currentUserId,
  classCustom,
  accountType,
  author,
  community,
}: ThreadCardProps) {
  const chooseAuthor = accountType === "Community" ? author : thread.author;
  console.log("currentUserId", currentUserId);
  console.log("author", author);
  // console.log(currentUserId.toString() === author.toString());
  return (
    <article
      className={`flex w-full flex-col rounded-xl p-7 ${
        !classCustom ? "bg-dark-2" : classCustom
      }`}
    >
      <div className="flex items-start justify-between relative">
        <div className="absolute top-0 right-1 flex gap-3">
          <p className="text-light-3 text-small-regular">
            {moment(thread.createdAt, "YYYYMMDD").fromNow()}
          </p>

          {currentUserId.toString() === (author as any).toString() && (
            <Link href={`/thread/edit?threadId=${thread._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#877EFF"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          )}
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
