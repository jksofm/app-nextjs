import {
  fetchCommunities,
  fetchOtherCommunity,
} from "@/lib/actions/community.actions";
import { getMyProfile } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

// import UserCard from "../cards/UserCard";

// import { fetchCommunities } from "@/lib/actions/community.actions";
// import { fetchUsers } from "@/lib/actions/user.actions";

export default async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  // console.log("pathname", pathname);

  const userInfo: any = await getMyProfile(user.id);

  const suggestedCOmmunities = await fetchOtherCommunity({
    pageSize: 4,
    userId: userInfo._id,
  });
  // console.log("suggest", suggestedCOmmunities);

  return (
    <section
      className={`${
        pathname === "/communities" ? "hidden" : "custom-scrollbar rightsidebar"
      }`}
    >
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>

        {/* <div className="mt-7 flex w-[350px] flex-col gap-9">
          {suggestedCOmmunities.communities.length > 0 ? (
            <>
              {suggestedCOmmunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )}
        </div> */}
        {suggestedCOmmunities.map((item) => {
          return (
            <>
              <div className="flex mt-8 flex-wrap items-center gap-3">
                <Link
                  href={`/communities/${item.id}`}
                  className="relative h-12 w-12"
                >
                  <Image
                    src={item.image}
                    alt="community_logo"
                    fill
                    className="rounded-full object-cover"
                  />
                </Link>

                <div>
                  <Link href={`/communities/${item.id}`}>
                    <h4 className="text-base-semibold text-light-1">
                      {item.name}
                    </h4>
                  </Link>
                  <p className="text-small-medium text-gray-1">
                    @{item.username}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="flex flex-1 flex-col justify-start">
        {/* <h3 className="text-heading4-medium text-light-1">Similar Minds</h3> */}
        {/* <div className="mt-7 flex w-[350px] flex-col gap-10">
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div> */}
      </div>
    </section>
  );
}
