import UserCard from "@/components/cards/UserCard";
import SearchProfile from "@/components/forms/SearchProfile";
import { fetchThreadsByUserId } from "@/lib/actions/thread.actions";
import {
  fetchUsers,
  getActivity,
  getMyProfile,
} from "@/lib/actions/user.actions";
import { searchValidation } from "@/lib/vaidation/thread";
import { User } from "@/models/User";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

export default async function ActivityPage() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await getMyProfile(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const activity: any = await getActivity(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity && activity.data.length > 0 ? (
          <>
            {activity.data.map((item: any) => {
              return (
                <Link
                  key={item._id}
                  href={`/thread/${item.parentId}`}
                  className="head-text"
                >
                  <article className="activity-card">
                    <Image
                      src={item.author.image}
                      alt="Profile Picture"
                      width={20}
                      height={20}
                      className="rounded-full object-contain"
                    />
                    <p className="text-base-regular text-light-2">
                      {item.author.name} replied you{" "}
                      {moment(item.createdAt, "YYYYMMDD").fromNow()}
                    </p>
                  </article>
                </Link>
              );
            })}
          </>
        ) : (
          <p className="no-result">No activity</p>
        )}
      </section>
    </section>
  );
}
