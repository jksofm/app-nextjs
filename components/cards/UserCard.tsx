import Image from "next/image";
import React from "react";

import ButtonPush from "../shared/ButtonPush";
export default function UserCard({
  userId,
  userImage,
  username,
  name,
}: {
  userId: string;
  userImage: string;
  username: string;
  name: string;
}) {
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={userImage}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small medium text-gray-1">@{username}</p>
        </div>
        <ButtonPush url={`/profile/${userId}`} content={"View"} />
      </div>
    </article>
  );
}
